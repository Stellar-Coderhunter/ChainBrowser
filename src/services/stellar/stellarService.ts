import * as StellarSdk from '@stellar/stellar-sdk';
import { Network, Wallet, Transaction, Account, Asset } from '@/types';

export class StellarService {
  private server: StellarSdk.Horizon.Server;
  private network: Network;

  constructor(network: Network) {
    this.network = network;
    this.server = new StellarSdk.Horizon.Server(network.horizonUrl);
  }

  /**
   * Update the network
   */
  setNetwork(network: Network): void {
    this.network = network;
    this.server = new StellarSdk.Horizon.Server(network.horizonUrl);
  }

  /**
   * Get account details
   */
  async getAccount(publicKey: string): Promise<Account> {
    try {
      const account = await this.server.accounts().accountId(publicKey).call();
      
      return {
        id: account.id,
        publicKey: account.account_id,
        balance: account.balances.find(b => b.asset_type === 'native')?.balance || '0',
        subentryCount: account.subentry_count,
        thresholds: account.thresholds,
        flags: account.flags,
        signers: account.signers
      };
    } catch (error) {
      throw new Error(`Failed to fetch account: ${error}`);
    }
  }

  /**
   * Get account balances
   */
  async getBalances(publicKey: string): Promise<Asset[]> {
    try {
      const account = await this.server.accounts().accountId(publicKey).call();
      
      return account.balances.map(balance => ({
        code: balance.asset_code || 'XLM',
        issuer: balance.asset_issuer,
        type: balance.asset_type as Asset['type'],
        balance: balance.balance,
        limit: balance.limit
      }));
    } catch (error) {
      throw new Error(`Failed to fetch balances: ${error}`);
    }
  }

  /**
   * Get transaction history
   */
  async getTransactions(publicKey: string, limit: number = 10): Promise<Transaction[]> {
    try {
      const transactions = await this.server
        .transactions()
        .forAccount(publicKey)
        .order('desc')
        .limit(limit)
        .call();

      return transactions.records.map(tx => ({
        id: tx.id,
        hash: tx.hash,
        source: tx.source_account,
        fee: tx.fee_charged,
        status: tx.successful ? 'success' : 'failed',
        timestamp: new Date(tx.created_at).getTime(),
        memo: tx.memo
      }));
    } catch (error) {
      throw new Error(`Failed to fetch transactions: ${error}`);
    }
  }

  /**
   * Send a payment transaction
   */
  async sendPayment(
    wallet: Wallet,
    destination: string,
    amount: string,
    secretKey: string,
    assetCode?: string,
    assetIssuer?: string
  ): Promise<Transaction> {
    try {
      // Load source account
      const sourceAccount = await this.server.loadAccount(wallet.publicKey);

      // Create transaction builder
      let builder = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: this.network.networkPassphrase
      });

      // Add payment operation
      if (assetCode && assetIssuer) {
        // Custom asset
        const asset = new StellarSdk.Asset(assetCode, assetIssuer);
        builder = builder.addOperation(
          StellarSdk.Operation.payment({
            destination,
            asset,
            amount
          })
        );
      } else {
        // Native XLM
        builder = builder.addOperation(
          StellarSdk.Operation.payment({
            destination,
            asset: StellarSdk.Asset.native(),
            amount
          })
        );
      }

      // Build and sign transaction
      const transaction = builder
        .setTimeout(30)
        .build();

      transaction.sign(StellarSdk.Keypair.fromSecret(secretKey));

      // Submit transaction
      const result = await this.server.submitTransaction(transaction);

      return {
        id: result.id,
        hash: result.hash,
        source: wallet.publicKey,
        destination,
        amount,
        asset: assetCode || 'XLM',
        fee: result.fee_charged,
        status: 'success',
        timestamp: Date.now()
      };
    } catch (error) {
      throw new Error(`Failed to send payment: ${error}`);
    }
  }

  /**
   * Get current fee stats
   */
  async getFeeStats(): Promise<any> {
    try {
      return await this.server.fees().call();
    } catch (error) {
      throw new Error(`Failed to fetch fee stats: ${error}`);
    }
  }

  /**
   * Get latest ledger
   */
  async getLatestLedger(): Promise<number> {
    try {
      const ledgers = await this.server.ledgers().order('desc').limit(1).call();
      return ledgers.records[0].sequence;
    } catch (error) {
      throw new Error(`Failed to fetch latest ledger: ${error}`);
    }
  }
}
