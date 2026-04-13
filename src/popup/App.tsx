import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Wallet } from './components/wallet/Wallet';
import { Explorer } from './components/explorer/Explorer';
import { DevTools } from './components/devtools/DevTools';
import { Settings } from './components/ui/Settings';
import { Navigation } from './components/ui/Navigation';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Wallet />} />
            <Route path="/explorer" element={<Explorer />} />
            <Route path="/devtools" element={<DevTools />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
