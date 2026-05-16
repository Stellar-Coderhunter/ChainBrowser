import type { Network, NetworkType } from '@/types';

export const DEFAULT_NETWORKS: Network[] = [
  {
    id: 'stellar-mainnet',
    name: 'Stellar Mainnet',
    type: 'mainnet',
    horizonUrl: 'https://horizon.stellar.org',
    sorobanUrl: 'https://soroban-mainnet.stellar.org',
    networkPassphrase: 'Public Global Stellar Network ; September 2015'
  },
  {
    id: 'stellar-testnet',
    name: 'Stellar Testnet',
    type: 'testnet',
    horizonUrl: 'https://horizon-testnet.stellar.org',
    sorobanUrl: 'https://soroban-testnet.stellar.org',
    networkPassphrase: 'Test SDF Network ; September 2015'
  },
  {
    id: 'stellar-futurenet',
    name: 'Stellar Futurenet',
    type: 'futurenet',
    horizonUrl: 'https://horizon-futurenet.stellar.org',
    sorobanUrl: 'https://rpc-futurenet.stellar.org',
    networkPassphrase: 'Test SDF Future Network ; October 2022'
  }
];

export const getNetworkById = (id: string): Network | undefined => {
  return DEFAULT_NETWORKS.find(network => network.id === id);
};

export const getNetworkByType = (type: NetworkType): Network | undefined => {
  return DEFAULT_NETWORKS.find(network => network.type === type);
};

export const formatStroops = (stroops: string | number): string => {
  const lumens = Number(stroops) / 10000000;
  return lumens.toFixed(7);
};

export const formatLumens = (lumens: string | number, decimals: number = 7): string => {
  return Number(lumens).toFixed(decimals);
};

export const isValidStellarAddress = (address: string): boolean => {
  return /^G[A-Z2-7]{55}$/.test(address);
};

export const isValidTransactionHash = (hash: string): boolean => {
  return /^[a-fA-F0-9]{64}$/.test(hash);
};
