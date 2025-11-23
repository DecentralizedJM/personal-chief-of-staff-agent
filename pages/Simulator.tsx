import React, { useState } from 'react';
import { testTaskExtraction, generateBriefingPreview } from '../services/geminiService';
import { Loader2, ArrowRight } from 'lucide-react';

const Simulator: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [inputText, setInputText] = useState("Meeting notes: John needs the Q3 report by Friday. It's high priority. Also, remind me to call Mom tomorrow.");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'extraction' | 'briefing'>('extraction');

  const handleRun = async () => {
    if (!apiKey) {
      alert("Please enter a valid Gemini API Key");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      let output;
      if (mode === 'extraction') {
        output = await testTaskExtraction(apiKey, inputText);
      } else {
        // Mock task data for briefing simulation
        const mockTasks = [
          { title: "Review Q3 Report", priority: "High", status: "To Do" },
          { title: "Call Mom", priority: "Medium", status: "To Do" }
        ];
        output = await generateBriefingPreview(apiKey, mockTasks);
      }
      setResult(output || "No output generated");
    } catch (err) {
      setResult("Error: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
       <header>
        <h2 className="text-3xl font-bold text-white">Agent Simulator</h2>
        <p className="text-slate-400">Test the prompts with live Gemini 2.5 Flash models.</p>
      </header>

      {/* API Key Input */}
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <label className="block text-sm font-medium text-slate-300 mb-2">Gemini API Key (Required for Simulation)</label>
        <input 
          type="password" 
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="AIzaSy..."
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <p className="text-xs text-slate-500 mt-2">
          Your key is never stored. It is only used for this session request.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* Input Column */}
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2 bg-slate-800 p-1 rounded-lg w-fit">
            <button 
              onClick={() => setMode('extraction')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'extraction' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Task Extraction
            </button>
            <button 
              onClick={() => setMode('briefing')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'briefing' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Daily Briefing
            </button>
          </div>

          <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 p-4 flex flex-col">
            <label className="text-sm font-medium text-slate-300 mb-2">
              {mode === 'extraction' ? 'Input Text (Email/Chat)' : 'Context (Simulated Tasks used automatically)'}
            </label>
            {mode === 'extraction' ? (
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-200 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              />
            ) : (
              <div className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-slate-500 text-sm italic">
                Simulating with mock data:
                <br/>- Review Q3 Report (High)
                <br/>- Call Mom (Medium)
                <br/>- 9:00 AM Team Sync
              </div>
            )}
            
            <div className="mt-4 flex justify-end">
              <button 
                onClick={handleRun}
                disabled={loading || !apiKey}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/20"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <ArrowRight size={20} />}
                <span>Run Simulation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Output Column */}
        <div className="flex flex-col h-full">
           <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 p-4 flex flex-col">
             <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-300">Agent Output</label>
                {result && <span className="text-xs text-green-400">Completed</span>}
             </div>
             <div className="flex-1 bg-slate-950 rounded-lg border border-slate-800 p-4 overflow-auto">
               {result ? (
                 <pre className="text-green-300 font-mono text-sm whitespace-pre-wrap">{result}</pre>
               ) : (
                 <div className="h-full flex items-center justify-center text-slate-600 text-sm">
                   Waiting for input...
                 </div>
               )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
