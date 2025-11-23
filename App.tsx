import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Prompts from './pages/Prompts';
import Workflows from './pages/Workflows';
import Setup from './pages/Setup';
import Simulator from './pages/Simulator';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.PROMPTS:
        return <Prompts />;
      case ViewState.WORKFLOWS:
        return <Workflows />;
      case ViewState.SETUP:
        return <Setup />;
      case ViewState.SIMULATION:
        return <Simulator />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto h-full">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
