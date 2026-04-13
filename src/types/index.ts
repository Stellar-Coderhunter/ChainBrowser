export interface Wallet {
  id: string;
  name: string;
  publicKey: string;
  network: NetworkType;
  balance?: string;
  createdAt: number;
}

export type NetworkType = 'mainnet' | 'testnet' | 'futurenet' | 'custom';

export interface Network {
  id: string;
  name: string;
  type: NetworkType;
  horizonUrl: string;
  sorobanUrl?: string;
  networkPassphrase: string;
  isCustom?: boolean;
}

export interface Transaction {
  id: string;
  hash: string;
  source: string;
  destination?: string;
  amount?: string;
  asset?: string;
  fee: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: number;
  memo?: string;
}

export interface Account {
  id: string;
  publicKey: string;
  balance: string;
  subentryCount: number;
  thresholds: {
    low: number;
    medium: number;
    high: number;
  };
  flags: {
    authRequired: boolean;
    authRevocable: boolean;
    authImmutable: boolean;
  };
  signers: Array<{
    key: string;
    weight: number;
    type: string;
  }>;
  data?: Record<string, string>;
}

export interface Asset {
  code: string;
  issuer?: string;
  type: 'native' | 'credit_alphanum4' | 'credit_alphanum12';
  balance?: string;
  limit?: string;
}

export interface SmartContract {
  id: string;
  contractId: string;
  network: NetworkType;
  source?: string;
  deployedAt: number;
}
