import React from 'react';
import { NavLink } from 'react-router-dom';
import { Wallet, Search, Code, Settings } from 'lucide-react';

export const Navigation: React.FC = () => {
  const navItems = [
    { to: '/', icon: Wallet, label: 'Wallet' },
    { to: '/explorer', icon: Search, label: 'Explorer' },
    { to: '/devtools', icon: Code, label: 'DevTools' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-2 flex justify-around items-center z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-blue-500' : 'text-gray-400 hover:text-gray-200'
            }`
          }
        >
          <item.icon size={20} />
          <span className="text-[10px] font-medium uppercase tracking-wider">
            {item.label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
};
