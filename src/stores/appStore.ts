import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Network, Wallet } from '@/types';
import { DEFAULT_NETWORKS } from '@/utils/network';

interface AppState {
  // Network state
  currentNetwork: Network;
  availableNetworks: Network[];
  
  // Wallet state
  wallets: Wallet[];
  activeWallet: Wallet | null;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setNetwork: (network: Network) => void;
  addWallet: (wallet: Wallet) => void;
  removeWallet: (walletId: string) => void;
  setActiveWallet: (wallet: Wallet | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      currentNetwork: DEFAULT_NETWORKS[1], // Default to testnet
      availableNetworks: DEFAULT_NETWORKS,
      wallets: [],
      activeWallet: null,
      isLoading: false,
      error: null,
      
      // Actions
      setNetwork: (network) => set({ currentNetwork: network, error: null }),
      
      addWallet: (wallet) => set((state) => {
        const duplicateWallet = state.wallets.some(
          (existingWallet) =>
            existingWallet.id === wallet.id ||
            existingWallet.publicKey === wallet.publicKey
        );

        if (duplicateWallet) {
          return { error: 'This wallet already exists in ChainBrowser.' };
        }

        return {
          wallets: [...state.wallets, wallet],
          activeWallet: state.activeWallet || wallet,
          error: null
        };
      }),
      
      removeWallet: (walletId) => set((state) => {
        const newWallets = state.wallets.filter(w => w.id !== walletId);
        const newActiveWallet = state.activeWallet?.id === walletId 
          ? (newWallets[0] || null) 
          : state.activeWallet;
        return {
          wallets: newWallets,
          activeWallet: newActiveWallet,
          error: null
        };
      }),
      
      setActiveWallet: (wallet) => set({ activeWallet: wallet, error: null }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error })
    }),
    {
      name: 'chainbrowser-storage',
      storage: createJSONStorage(() => localStorage),
      merge: (persistedState, currentState) => {
        const typedState = persistedState as Partial<AppState> | undefined;
        const persistedNetwork = typedState?.currentNetwork;
        const matchingNetwork = persistedNetwork
          ? DEFAULT_NETWORKS.find((network) => network.id === persistedNetwork.id)
          : undefined;

        return {
          ...currentState,
          ...typedState,
          currentNetwork: matchingNetwork || currentState.currentNetwork,
          wallets: typedState?.wallets || currentState.wallets,
          activeWallet: typedState?.activeWallet || currentState.activeWallet
        };
      },
      partialize: (state) => ({
        currentNetwork: state.currentNetwork,
        wallets: state.wallets,
        activeWallet: state.activeWallet
      })
    }
  )
);
