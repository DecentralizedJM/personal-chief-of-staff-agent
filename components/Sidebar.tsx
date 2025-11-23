import React from 'react';
import { LayoutDashboard, FileText, Workflow, Settings, PlayCircle } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewState.SIMULATION, label: 'Agent Simulator', icon: PlayCircle },
    { id: ViewState.PROMPTS, label: 'Prompts', icon: FileText },
    { id: ViewState.WORKFLOWS, label: 'Workflows (n8n)', icon: Workflow },
    { id: ViewState.SETUP, label: 'Setup Guide', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-700 h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-white tracking-tight">Chief of Staff <span className="text-blue-400">Agent</span></h1>
        <p className="text-xs text-slate-400 mt-1">System Control Center</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">Status</p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm text-green-400 font-medium">System Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
