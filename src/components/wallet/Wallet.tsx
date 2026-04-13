import React, { useState } from 'react';
import { useAppStore } from '@/stores/appStore';
import { WalletService } from '@/services/wallet/walletService';
import { Copy, Eye, EyeOff, Plus } from 'lucide-react';

export const Wallet: React.FC = () => {
  const { wallets, activeWallet, addWallet } = useAppStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [walletName, setWalletName] = useState('');
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  
  const handleCreateWallet = () => {
    if (!walletName.trim()) return;
    
    const newWallet = WalletService.generateWallet(
      walletName,
      activeWallet?.network || 'testnet'
    );
    
    addWallet(newWallet);
    setWalletName('');
    setShowCreateModal(false);
  };
  
  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };
  
  if (wallets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No Wallet Yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create your first Stellar wallet to get started
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Wallet
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Wallets
        </h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Wallet</span>
        </button>
      </div>
      
      <div className="grid gap-4">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {wallet.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <code className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                    {wallet.publicKey.slice(0, 20)}...{wallet.publicKey.slice(-10)}
                  </code>
                  <button
                    onClick={() => handleCopyAddress(wallet.publicKey)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    title="Copy address"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {wallet.balance || '0.0000000'} XLM
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {wallet.network}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Create New Wallet
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Wallet Name
                </label>
                <input
                  type="text"
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                  placeholder="My Wallet"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleCreateWallet}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
