import React from 'react';
import { useAppStore } from '@/stores/appStore';
import { Globe, Shield, Moon, Info, ChevronRight } from 'lucide-react';

export const SettingsHome: React.FC = () => {
  const { currentNetwork } = useAppStore();

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
        <h1 className="text-2xl font-bold text-white">Settings</h1>
      </header>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 px-1">{section.title}</h3>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              {section.items.map((item, idx) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors ${
                    idx !== section.items.length - 1 ? 'border-b border-gray-800' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className="text-gray-400" />
                    <span className="text-gray-200 font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-blue-500">{item.value}</span>
                    <ChevronRight size={16} className="text-gray-600" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-8 text-center text-[10px] text-gray-600 uppercase tracking-widest font-bold">
        ⛓️ ChainBrowser Project
      </footer>
    </div>
  );
};
