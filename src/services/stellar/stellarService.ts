import * as StellarSdk from '@stellar/stellar-sdk';
import type { Network, Wallet, Transaction, Account, Asset } from '@/types';

type FeeStats = StellarSdk.Horizon.HorizonApi.FeeStatsResponse;

interface AccountThresholdShape {
  low_threshold: number;
  med_threshold: number;
  high_threshold: number;
}

interface AccountFlagsShape {
  auth_required: boolean;
  auth_revocable: boolean;
  auth_immutable: boolean;
}

interface AccountSignerShape {
  key: string;
  weight: number;
  type: string;
}

interface HorizonAccountShape {
  id: string;
  account_id: string;
  balances: StellarSdk.Horizon.HorizonApi.BalanceLine[];
  subentry_count: number;
  thresholds: AccountThresholdShape;
  flags: AccountFlagsShape;
  signers: AccountSignerShape[];
}

interface HorizonTransactionShape {
  id: string;
  hash: string;
  source_account: string;
  fee_charged: string | number;
  successful: boolean;
  created_at: string;
  memo?: string;
}

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

  private static mapThresholds(account: HorizonAccountShape): Account['thresholds'] {
    return {
      low: account.thresholds.low_threshold,
      medium: account.thresholds.med_threshold,
      high: account.thresholds.high_threshold
    };
  }

  private static mapFlags(account: HorizonAccountShape): Account['flags'] {
    return {
      authRequired: account.flags.auth_required,
      authRevocable: account.flags.auth_revocable,
      authImmutable: account.flags.auth_immutable
    };
  }

  private static mapBalance(balance: StellarSdk.Horizon.HorizonApi.BalanceLine): Asset | null {
    if (balance.asset_type === 'native') {
      return {
        code: 'XLM',
        type: 'native',
        balance: balance.balance
      };
    }

    if (
      balance.asset_type === 'credit_alphanum4' ||
      balance.asset_type === 'credit_alphanum12'
    ) {
      return {
        code: balance.asset_code,
        issuer: balance.asset_issuer,
        type: balance.asset_type,
        balance: balance.balance,
        limit: balance.limit
      };
    }

    return null;
  }

  private static mapTransaction(tx: HorizonTransactionShape): Transaction {
    return {
      id: tx.id,
      hash: tx.hash,
      source: tx.source_account,
      fee: String(tx.fee_charged),
      status: tx.successful ? 'success' : 'failed',
      timestamp: new Date(tx.created_at).getTime(),
      memo: tx.memo
    };
  }

  private static normalizeError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Unknown error';
  }

  private static assertValidPublicKey(publicKey: string, label: string): void {
    if (!StellarSdk.StrKey.isValidEd25519PublicKey(publicKey)) {
      throw new Error(`Invalid ${label}`);
    }
  }

  /**
   * Get account details
   */
  async getAccount(publicKey: string): Promise<Account> {
    try {
      StellarService.assertValidPublicKey(publicKey, 'public key');
      const account = await this.server.accounts().accountId(publicKey).call();
      
      return {
        id: account.id,
        publicKey: account.account_id,
        balance: account.balances.find(b => b.asset_type === 'native')?.balance || '0',
        subentryCount: account.subentry_count,
        thresholds: StellarService.mapThresholds(account),
        flags: StellarService.mapFlags(account),
        signers: account.signers
      };
    } catch (error) {
      throw new Error(`Failed to fetch account: ${StellarService.normalizeError(error)}`);
    }
  }

  /**
   * Get account balances
   */
  async getBalances(publicKey: string): Promise<Asset[]> {
    try {
      StellarService.assertValidPublicKey(publicKey, 'public key');
      const account = await this.server.accounts().accountId(publicKey).call();
      
      return account.balances
        .map((balance) => StellarService.mapBalance(balance))
        .filter((balance): balance is Asset => balance !== null);
    } catch (error) {
      throw new Error(`Failed to fetch balances: ${StellarService.normalizeError(error)}`);
    }
  }

  /**
   * Get transaction history
   */
  async getTransactions(publicKey: string, limit: number = 10): Promise<Transaction[]> {
    try {
      StellarService.assertValidPublicKey(publicKey, 'public key');
      const transactions = await this.server
        .transactions()
        .forAccount(publicKey)
        .order('desc')
        .limit(Math.min(Math.max(limit, 1), 50))
        .call();

      return transactions.records.map((tx) => StellarService.mapTransaction(tx));
    } catch (error) {
      throw new Error(`Failed to fetch transactions: ${StellarService.normalizeError(error)}`);
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
      StellarService.assertValidPublicKey(wallet.publicKey, 'source wallet address');
      StellarService.assertValidPublicKey(destination, 'destination address');

      if (!secretKey.trim()) {
        throw new Error('Secret key is required');
      }

      if (Number(amount) <= 0 || Number.isNaN(Number(amount))) {
        throw new Error('Amount must be greater than zero');
      }

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
        id: result.hash,
        hash: result.hash,
        source: wallet.publicKey,
        destination,
        amount,
        asset: assetCode || 'XLM',
        fee: String(StellarSdk.BASE_FEE),
        status: 'success',
        timestamp: Date.now()
      };
    } catch (error) {
      throw new Error(`Failed to send payment: ${StellarService.normalizeError(error)}`);
    }
  }

  /**
   * Get current fee stats
   */
  async getFeeStats(): Promise<FeeStats> {
    try {
      return await this.server.feeStats();
    } catch (error) {
      throw new Error(`Failed to fetch fee stats: ${StellarService.normalizeError(error)}`);
    }
  }

  /**
   * Get latest ledger
   */
  async getLatestLedger(): Promise<number> {
    try {
      const ledgers = await this.server.ledgers().order('desc').limit(1).call();
      if (ledgers.records.length === 0) {
        throw new Error('No ledgers returned by Horizon');
      }
      return ledgers.records[0].sequence;
    } catch (error) {
      throw new Error(`Failed to fetch latest ledger: ${StellarService.normalizeError(error)}`);
    }
  }
}
