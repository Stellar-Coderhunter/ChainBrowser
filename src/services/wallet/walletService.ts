import * as StellarSdk from '@stellar/stellar-sdk';
import { Wallet, NetworkType } from '@/types';
import { DEFAULT_NETWORKS } from '@/utils/network';

export class WalletService {
  /**
   * Generate a new wallet
   */
  static generateWallet(name: string, network: NetworkType): Wallet {
    const keypair = StellarSdk.Keypair.random();
    
    return {
      id: crypto.randomUUID(),
      name,
      publicKey: keypair.publicKey(),
      network,
      createdAt: Date.now()
    };
  }

  /**
   * Import wallet from secret key
   */
  static importWallet(name: string, secretKey: string, network: NetworkType): Wallet {
    try {
      const keypair = StellarSdk.Keypair.fromSecret(secretKey);
      
      return {
        id: crypto.randomUUID(),
        name,
        publicKey: keypair.publicKey(),
        network,
        createdAt: Date.now()
      };
    } catch (error) {
      throw new Error('Invalid secret key');
    }
  }

  /**
   * Validate a secret key
   */
  static isValidSecretKey(secretKey: string): boolean {
    try {
      StellarSdk.Keypair.fromSecret(secretKey);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate a public key
   */
  static isValidPublicKey(publicKey: string): boolean {
    try {
      StellarSdk.Keypair.fromPublicKey(publicKey);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Sign a message with the wallet's secret key
   */
  static signMessage(message: string, secretKey: string): string {
    const keypair = StellarSdk.Keypair.fromSecret(secretKey);
    const messageBytes = Buffer.from(message);
    const signature = keypair.sign(messageBytes);
    return signature.toString('base64');
  }

  /**
   * Verify a signed message
   */
  static verifyMessage(
    message: string,
    signature: string,
    publicKey: string
  ): boolean {
    try {
      const keypair = StellarSdk.Keypair.fromPublicKey(publicKey);
      const messageBytes = Buffer.from(message);
      const signatureBytes = Buffer.from(signature, 'base64');
      keypair.verify(messageBytes, signatureBytes);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Export wallet as JSON (for backup)
   */
  static exportWallet(wallet: Wallet): string {
    return JSON.stringify(wallet, null, 2);
  }

  /**
   * Import wallet from JSON
   */
  static importWalletFromJson(json: string): Wallet {
    try {
      const wallet = JSON.parse(json);
      if (!wallet.id || !wallet.publicKey || !wallet.network) {
        throw new Error('Invalid wallet format');
      }
      return wallet as Wallet;
    } catch (error) {
      throw new Error('Failed to import wallet from JSON');
    }
  }
}
