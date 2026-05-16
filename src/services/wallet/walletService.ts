import * as StellarSdk from '@stellar/stellar-sdk';
import type { Wallet, NetworkType } from '@/types';

export class WalletService {
  private static textEncoder = new TextEncoder();

  private static encodeMessage(message: string): Buffer {
    return this.textEncoder.encode(message) as unknown as Buffer;
  }

  private static decodeSignature(signature: string): Buffer {
    return Uint8Array.from(atob(signature), (char) => char.charCodeAt(0)) as unknown as Buffer;
  }

  /**
   * Generate a new wallet
   */
  static generateWallet(name: string, network: NetworkType): Wallet {
    const keypair = StellarSdk.Keypair.random();
    
    return {
      id: crypto.randomUUID(),
      name: name.trim(),
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
      const keypair = StellarSdk.Keypair.fromSecret(secretKey.trim());
      
      return {
        id: crypto.randomUUID(),
        name: name.trim(),
        publicKey: keypair.publicKey(),
        network,
        createdAt: Date.now()
      };
    } catch {
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
    const messageBytes = this.encodeMessage(message);
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
      const messageBytes = this.encodeMessage(message);
      const signatureBytes = this.decodeSignature(signature);
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
      const wallet = JSON.parse(json) as Partial<Wallet>;
      if (
        !wallet.id ||
        !wallet.name ||
        !wallet.publicKey ||
        !wallet.network ||
        typeof wallet.createdAt !== 'number'
      ) {
        throw new Error('Invalid wallet format');
      }
      return wallet as Wallet;
    } catch {
      throw new Error('Failed to import wallet from JSON');
    }
  }
}
