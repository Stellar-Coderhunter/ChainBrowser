import React from 'react';
import { useAppStore } from '@/stores/appStore';
import type { Network } from '@/types';

export const Settings: React.FC = () => {
  const { currentNetwork, availableNetworks, setNetwork } = useAppStore();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Settings
      </h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Network
        </h3>
        <div className="space-y-3">
          {availableNetworks.map((network: Network) => (
            <button
              key={network.id}
              onClick={() => setNetwork(network)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                currentNetwork.id === network.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="font-medium text-gray-900 dark:text-white">
                {network.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {network.horizonUrl}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
