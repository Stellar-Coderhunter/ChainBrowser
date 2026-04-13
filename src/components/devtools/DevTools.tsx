import React from 'react';

export const DevTools: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Developer Tools
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400">
          Developer tools for Soroban smart contract testing coming soon...
        </p>
      </div>
    </div>
  );
};
