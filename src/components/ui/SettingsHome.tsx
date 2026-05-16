import React from 'react';
import { useAppStore } from '@/stores/appStore';
import { Globe, Shield, Moon, Info, CheckCircle2 } from 'lucide-react';
import { DEFAULT_NETWORKS } from '@/utils/network';

export const SettingsHome: React.FC = () => {
  const { currentNetwork, setNetwork } = useAppStore();

  const sections = [
    {
      title: 'Network',
      items: [
        { icon: Globe, label: 'Current Network', value: currentNetwork.name },
        { icon: Shield, label: 'Security & Privacy', value: 'Manage' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Moon, label: 'Theme', value: 'Dark' },
        { icon: Info, label: 'Version', value: '0.1.0 (Alpha)' },
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-[11px] uppercase tracking-[0.35em] text-fuchsia-300/70">Settings</p>
        <h1 className="text-3xl font-semibold text-white">Tune the environment</h1>
        <p className="mt-2 text-sm text-slate-300">
          Keep the extension pointed at the right chain and make the current context obvious.
        </p>
      </header>

      <section className="grid gap-3">
        {DEFAULT_NETWORKS.map((network) => {
          const isActive = network.id === currentNetwork.id;

          return (
            <button
              key={network.id}
              onClick={() => setNetwork(network)}
              className={`flex items-center justify-between rounded-[24px] border px-5 py-4 text-left transition ${
                isActive
                  ? 'border-fuchsia-300/40 bg-fuchsia-300/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
              }`}
            >
              <div>
                <p className="text-sm font-semibold text-white">{network.name}</p>
                <p className="mt-1 text-xs text-slate-400">{network.horizonUrl}</p>
              </div>
              {isActive && <CheckCircle2 className="text-fuchsia-200" size={20} />}
            </button>
          );
        })}
      </section>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-4 px-1 text-xs font-bold uppercase tracking-[0.3em] text-slate-500">{section.title}</h3>
            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/5">
              {section.items.map((item, idx) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between p-4 ${
                    idx !== section.items.length - 1 ? 'border-b border-white/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className="text-slate-400" />
                    <span className="font-medium text-slate-100">{item.label}</span>
                  </div>
                  <span className="text-sm text-fuchsia-200">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-8 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-slate-600">
        ChainBrowser Project
      </footer>
    </div>
  );
};
