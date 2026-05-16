import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Compass, Terminal, Settings } from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Wallet, label: 'Wallet' },
    { path: '/explorer', icon: Compass, label: 'Explorer' },
    { path: '/devtools', icon: Terminal, label: 'DevTools' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];
  
  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 px-4">
      <div className="mx-auto flex max-w-lg items-center justify-between rounded-full border border-white/10 bg-slate-950/75 px-3 py-2 shadow-[0_20px_60px_rgba(2,6,23,0.55)] backdrop-blur">
        <Link to="/" className="flex items-center gap-3 rounded-full px-2 py-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,_rgba(125,211,252,0.95),_rgba(45,212,191,0.75))]">
            <span className="text-sm font-black tracking-wide text-slate-950">CB</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">ChainBrowser</p>
            <p className="text-sm font-medium text-white">Companion</p>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-white text-slate-950'
                    : 'text-slate-300 hover:bg-white/8 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
