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
      <div className="flex flex-col min-h-screen bg-black text-gray-100 font-sans selection:bg-blue-500/30">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-6 pt-8 pb-24 max-w-lg mx-auto w-full">
          <Routes>
            <Route path="/" element={<WalletHome />} />
            <Route path="/explorer" element={<ExplorerHome />} />
            <Route path="/devtools" element={<DevToolsHome />} />
            <Route path="/settings" element={<SettingsHome />} />
          </Routes>
        </main>

        {/* Persistent Navigation */}
        <Navigation />

        {/* Global UI Decorations (Optional Aesthetic) */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[100px] rounded-full"></div>
        </div>
      </div>
    </Router>
  );
}

export default App;
