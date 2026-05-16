import React, { useState } from 'react';
import { useAppStore } from '@/stores/appStore';
import { WalletService } from '@/services/wallet/walletService';
import type { Wallet } from '@/types';
import { Copy, Plus, Sparkles, Wallet as WalletIcon } from 'lucide-react';

export const WalletHome: React.FC = () => {
  const { wallets, activeWallet, addWallet, setActiveWallet, error, setError } = useAppStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [walletName, setWalletName] = useState('');

  const handleCreateWallet = () => {
    const trimmedName = walletName.trim();

    if (!trimmedName) {
      setError('Add a wallet name before creating one.');
      return;
    }

    const newWallet = WalletService.generateWallet(
      trimmedName,
      activeWallet?.network || 'testnet'
    );

    addWallet(newWallet);
    setWalletName('');
    setIsCreateOpen(false);
  };

  const handleCopyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address);
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-300/70">Wallet Hub</p>
          <h1 className="text-3xl font-semibold text-white">Manage your Stellar identities</h1>
          <p className="mt-2 max-w-sm text-sm text-slate-300">
            Create wallets, keep a clean view of active accounts, and switch contexts quickly.
          </p>
        </div>
        <button
          onClick={() => {
            setError(null);
            setIsCreateOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-300/15"
        >
          <Plus size={20} />
          <span>New Wallet</span>
        </button>
      </header>

      {wallets.length === 0 ? (
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
            <WalletIcon size={32} />
          </div>
          <h2 className="mt-5 text-xl font-semibold text-white">No wallets yet</h2>
          <p className="mt-2 text-sm text-slate-300">
            Spin up your first testnet wallet and start exploring balances, transactions, and contracts.
          </p>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            <Sparkles size={16} />
            <span>Create a wallet</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {activeWallet && (
            <div className="overflow-hidden rounded-[30px] border border-cyan-300/20 bg-[radial-gradient(circle_at_top_left,_rgba(103,232,249,0.35),_rgba(15,23,42,0.95)_60%)] p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.45)]">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-100/75">Active Wallet</p>
              <h2 className="text-lg font-semibold">{activeWallet.name}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <p className="text-3xl font-bold">{activeWallet.balance || '0.0000000'} XLM</p>
                  <p className="mt-1 text-xs text-cyan-50/70">{activeWallet.network.toUpperCase()}</p>
                  <p className="mt-4 break-all rounded-2xl border border-white/10 bg-black/20 px-4 py-3 font-mono text-xs text-cyan-50/80">
                    {activeWallet.publicKey}
                  </p>
                </div>
                <button
                  onClick={() => handleCopyAddress(activeWallet.publicKey)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
                >
                  <Copy size={16} />
                  <span>Copy address</span>
                </button>
              </div>
            </div>
          )}

          <section className="grid gap-3">
            {wallets.map((wallet: Wallet) => {
              const isActive = wallet.id === activeWallet?.id;

              return (
                <button
                  key={wallet.id}
                  onClick={() => setActiveWallet(wallet)}
                  className={`flex items-center justify-between rounded-3xl border px-5 py-4 text-left transition ${
                    isActive
                      ? 'border-cyan-300/40 bg-cyan-400/10 shadow-[0_16px_40px_rgba(34,211,238,0.12)]'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                  }`}
                >
                  <div>
                    <h3 className="font-medium text-white">{wallet.name}</h3>
                    <p className="mt-1 font-mono text-xs text-slate-300">
                      {wallet.publicKey.slice(0, 18)}...{wallet.publicKey.slice(-10)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{wallet.balance || '0.0000000'} XLM</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                      {wallet.network}
                    </p>
                  </div>
                </button>
              );
            })}
          </section>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
          {error}
        </div>
      )}

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-slate-950/95 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-300/70">Create</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Add a fresh wallet</h3>
            <p className="mt-2 text-sm text-slate-300">
              A new Stellar keypair will be generated locally for your current network context.
            </p>

            <label className="mt-6 block text-sm font-medium text-slate-200">
              Wallet name
              <input
                type="text"
                value={walletName}
                onChange={(event) => setWalletName(event.target.value)}
                placeholder="Treasury Sandbox"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              />
            </label>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleCreateWallet}
                className="flex-1 rounded-full bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Create wallet
              </button>
              <button
                onClick={() => {
                  setIsCreateOpen(false);
                  setWalletName('');
                  setError(null);
                }}
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
