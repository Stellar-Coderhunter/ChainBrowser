import React from 'react';
import { useAppStore } from '@/stores/appStore';
import { Plus, Wallet as WalletIcon } from 'lucide-react';

export const WalletHome: React.FC = () => {
  const { wallets, activeWallet } = useAppStore();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">My Wallets</h1>
        <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors text-white">
          <Plus size={20} />
        </button>
      </header>

      {wallets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 border-2 border-dashed border-gray-800 rounded-2xl">
          <WalletIcon size={48} className="mb-4 opacity-20" />
          <p>No wallets found</p>
          <button className="mt-4 text-blue-500 hover:underline text-sm font-medium">
            Create or import a wallet
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {activeWallet && (
            <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl text-white shadow-lg">
              <p className="text-xs opacity-70 uppercase tracking-widest font-bold mb-1">Active Wallet</p>
              <h2 className="text-lg font-semibold">{activeWallet.name}</h2>
              <div className="mt-4">
                <p className="text-3xl font-bold">{activeWallet.balance || '0.00'} XLM</p>
                <p className="text-xs opacity-50 font-mono mt-1 break-all">{activeWallet.publicKey}</p>
              </div>
            </div>
          )}
          {/* Other wallets list would go here */}
        </div>
      )}
    </div>
  );
};
