import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from '@/components/ui/Navigation';
import { WalletHome } from '@/components/wallet/WalletHome';
import { ExplorerHome } from '@/components/explorer/ExplorerHome';
import { DevToolsHome } from '@/components/devtools/DevToolsHome';
import { SettingsHome } from '@/components/ui/SettingsHome';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_55%,_#111827_100%)] text-gray-100 selection:bg-cyan-300/30">
        <main className="mx-auto flex min-h-screen w-full max-w-lg flex-1 overflow-y-auto px-6 pb-28 pt-8">
          <Routes>
            <Route path="/" element={<WalletHome />} />
            <Route path="/explorer" element={<ExplorerHome />} />
            <Route path="/devtools" element={<DevToolsHome />} />
            <Route path="/settings" element={<SettingsHome />} />
          </Routes>
        </main>

        <Navigation />
      </div>
    </Router>
  );
}

export default App;
