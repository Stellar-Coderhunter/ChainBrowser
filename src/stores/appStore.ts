import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Network, NetworkType, Wallet } from '@/types';
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
      setNetwork: (network) => set({ currentNetwork: network }),
      
      addWallet: (wallet) => set((state) => ({
        wallets: [...state.wallets, wallet],
        activeWallet: state.activeWallet || wallet
      })),
      
      removeWallet: (walletId) => set((state) => {
        const newWallets = state.wallets.filter(w => w.id !== walletId);
        const newActiveWallet = state.activeWallet?.id === walletId 
          ? (newWallets[0] || null) 
          : state.activeWallet;
        return {
          wallets: newWallets,
          activeWallet: newActiveWallet
        };
      }),
      
      setActiveWallet: (wallet) => set({ activeWallet: wallet }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error })
    }),
    {
      name: 'chainbrowser-storage',
      partialize: (state) => ({
        currentNetwork: state.currentNetwork,
        wallets: state.wallets,
        activeWallet: state.activeWallet
      })
    }
  )
);
