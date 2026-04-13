import React from 'react';
import { Terminal, Cpu, Database, Play } from 'lucide-react';

export const DevToolsHome: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold text-white">Developer Suite</h1>
        <p className="text-gray-400 text-sm mt-1">Tools for Soroban and Stellar development</p>
      </header>

      <div className="grid grid-cols-1 gap-3">
        <button className="flex items-center gap-4 p-4 bg-gray-900 border border-gray-800 hover:border-blue-500/50 rounded-2xl transition-all text-left">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Cpu className="text-blue-500" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-white">Soroban Lab</h3>
            <p className="text-xs text-gray-500">Test and deploy smart contracts</p>
          </div>
        </button>

        <button className="flex items-center gap-4 p-4 bg-gray-900 border border-gray-800 hover:border-blue-500/50 rounded-2xl transition-all text-left">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Terminal className="text-purple-500" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-white">Transaction Builder</h3>
            <p className="text-xs text-gray-500">Construct complex Stellar transactions</p>
          </div>
        </button>

        <button className="flex items-center gap-4 p-4 bg-gray-900 border border-gray-800 hover:border-blue-500/50 rounded-2xl transition-all text-left">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <Database className="text-green-500" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-white">RPC Inspector</h3>
            <p className="text-xs text-gray-500">Monitor Soroban RPC calls and events</p>
          </div>
        </button>
      </div>

      <section className="bg-gray-900/50 border border-blue-500/20 rounded-2xl p-6 mt-4">
        <h4 className="text-sm font-bold text-blue-400 mb-2 flex items-center gap-2">
          <Play size={14} />
          Quick Start: Soroban
        </h4>
        <p className="text-xs text-gray-400 leading-relaxed">
          Switch to <strong>Futurenet</strong> to start testing smart contracts. 
          Use the Lab to call functions and inspect diagnostic events in real-time.
        </p>
      </section>
    </div>
  );
};
