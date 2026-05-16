import React, { useState } from 'react';
import { Search, History, List, Network, SearchCode } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { isValidStellarAddress, isValidTransactionHash } from '@/utils/network';

export const ExplorerHome: React.FC = () => {
  const { currentNetwork } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');

  const trimmedQuery = searchQuery.trim();
  const queryType = !trimmedQuery
    ? 'Enter a Stellar address, transaction hash, or ledger sequence.'
    : isValidStellarAddress(trimmedQuery)
      ? 'Looks like an account address. This would route to account state and balances.'
      : isValidTransactionHash(trimmedQuery)
        ? 'Looks like a transaction hash. This would route to transaction details.'
        : /^\d+$/.test(trimmedQuery)
          ? 'Looks like a ledger sequence. This would route to ledger metadata.'
          : 'This input does not match a supported explorer target yet.';

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-[11px] uppercase tracking-[0.35em] text-emerald-300/70">Explorer</p>
        <h1 className="text-3xl font-semibold text-white">Read the network with intent</h1>
        <p className="mt-2 text-sm text-slate-300">
          Search accounts, transactions, and ledgers with context for the network you are currently browsing.
        </p>
      </header>

      <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Current network</p>
            <h2 className="mt-1 text-lg font-semibold text-white">{currentNetwork.name}</h2>
          </div>
          <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-100">
            {currentNetwork.type}
          </div>
        </div>

        <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Address, transaction hash, or ledger..."
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/40"
        />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        </div>

        <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
          {queryType}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="group flex flex-col items-center justify-center rounded-[24px] border border-white/10 bg-white/5 p-6 transition-all hover:border-emerald-300/35 hover:bg-white/8">
          <History className="mb-2 text-emerald-300 transition-transform group-hover:scale-110" size={24} />
          <span className="text-sm font-medium text-slate-200">Recent Tx</span>
          <span className="mt-1 text-center text-xs text-slate-400">Review the latest payment and contract flow.</span>
        </button>
        <button className="group flex flex-col items-center justify-center rounded-[24px] border border-white/10 bg-white/5 p-6 transition-all hover:border-sky-300/35 hover:bg-white/8">
          <List className="mb-2 text-sky-300 transition-transform group-hover:scale-110" size={24} />
          <span className="text-sm font-medium text-slate-200">Asset List</span>
          <span className="mt-1 text-center text-xs text-slate-400">Track issuers, trustlines, and token balances.</span>
        </button>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
          <Network className="text-emerald-200" size={20} />
          <h3 className="mt-4 text-sm font-semibold text-white">Network profile</h3>
          <p className="mt-2 text-xs leading-6 text-slate-300">
            Horizon: {currentNetwork.horizonUrl}
          </p>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
          <SearchCode className="text-cyan-200" size={20} />
          <h3 className="mt-4 text-sm font-semibold text-white">Suggested targets</h3>
          <p className="mt-2 text-xs leading-6 text-slate-300">
            Accounts, transaction hashes, and ledger numbers are the cleanest search primitives to support first.
          </p>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
          <History className="text-amber-200" size={20} />
          <h3 className="mt-4 text-sm font-semibold text-white">Next backend step</h3>
          <p className="mt-2 text-xs leading-6 text-slate-300">
            Wire this search box to Horizon lookups and cache the last successful result in state.
          </p>
        </div>
      </section>
    </div>
  );
};
