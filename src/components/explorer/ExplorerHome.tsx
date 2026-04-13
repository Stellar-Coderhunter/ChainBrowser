import React, { useState } from 'react';
import { Search, History, List } from 'lucide-react';

export const ExplorerHome: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold text-white">Stellar Explorer</h1>
        <p className="text-gray-400 text-sm mt-1">Search the ledger for accounts and transactions</p>
      </header>

      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Address, transaction hash, or ledger..."
          className="w-full bg-gray-900 border border-gray-800 focus:border-blue-500 rounded-xl py-3 px-4 pl-11 text-white placeholder-gray-600 transition-all outline-none"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex flex-col items-center justify-center p-6 bg-gray-900 border border-gray-800 hover:border-blue-500/50 rounded-2xl transition-all group">
          <History className="text-blue-500 mb-2 group-hover:scale-110 transition-transform" size={24} />
          <span className="text-sm font-medium text-gray-300">Recent Tx</span>
        </button>
        <button className="flex flex-col items-center justify-center p-6 bg-gray-900 border border-gray-800 hover:border-blue-500/50 rounded-2xl transition-all group">
          <List className="text-blue-500 mb-2 group-hover:scale-110 transition-transform" size={24} />
          <span className="text-sm font-medium text-gray-300">Asset List</span>
        </button>
      </div>

      <section>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 px-1">Network Activity</h3>
        <div className="space-y-2 opacity-30 select-none pointer-events-none">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-900 border border-gray-800 rounded-xl" />
          ))}
          <p className="text-center text-[10px] text-gray-600 mt-4 uppercase tracking-tighter italic">Live network feed coming soon</p>
        </div>
      </section>
    </div>
  );
};
