import React from 'react';
import { Activity, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-white">System Overview</h2>
        <p className="text-slate-400">Real-time metrics of your Personal Agent.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Tasks Processed', value: '128', icon: CheckCircle, color: 'text-green-400' },
          { label: 'Pending Inbox', value: '5', icon: Clock, color: 'text-yellow-400' },
          { label: 'High Priority', value: '3', icon: AlertTriangle, color: 'text-red-400' },
          { label: 'Uptime', value: '99.9%', icon: Activity, color: 'text-blue-400' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                <h3 className="text-3xl font-bold text-white mt-2">{stat.value}</h3>
              </div>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recent Agent Actions</h3>
          <div className="space-y-4">
            {[
              { time: '08:00 AM', action: 'Sent Daily Briefing via Telegram', type: 'Output' },
              { time: '07:45 AM', action: 'Parsed email from "John Doe"', type: 'Intake' },
              { time: '07:42 AM', action: 'Created Task: "Review Q3 Report"', type: 'Task' },
              { time: 'Yesterday', action: 'Weekly Review Generated', type: 'Briefing' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                <div>
                  <p className="text-white font-medium">{item.action}</p>
                  <p className="text-xs text-slate-500">{item.type}</p>
                </div>
                <span className="text-xs text-slate-400 font-mono">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Integration Health</h3>
          <div className="space-y-4">
            {[
              { name: 'Gemini API', status: 'Connected', ping: '120ms' },
              { name: 'Notion API', status: 'Connected', ping: '240ms' },
              { name: 'Telegram Bot', status: 'Active', ping: '80ms' },
              { name: 'n8n Webhook', status: 'Listening', ping: '-' },
            ].map((service, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-slate-300">{service.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-slate-500 font-mono">{service.ping}</span>
                  <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded-full">{service.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
