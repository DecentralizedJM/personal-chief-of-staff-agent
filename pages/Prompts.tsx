import React, { useState } from 'react';
import { SYSTEM_PROMPTS } from '../constants';
import { Copy, Check } from 'lucide-react';

const Prompts: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-white">System Prompts</h2>
        <p className="text-slate-400">The core intelligence instructions for your Agent.</p>
      </header>

      <div className="grid gap-6">
        {SYSTEM_PROMPTS.map((prompt, idx) => (
          <div key={idx} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
              <div>
                <h3 className="font-bold text-white text-lg">{prompt.name}</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">{prompt.filename}</p>
              </div>
              <button
                onClick={() => handleCopy(prompt.content, idx)}
                className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-md text-sm transition-colors"
              >
                {copiedIndex === idx ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                <span>{copiedIndex === idx ? 'Copied' : 'Copy Prompt'}</span>
              </button>
            </div>
            <div className="p-4 bg-slate-900/50">
              <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto p-2">
                {prompt.content}
              </pre>
            </div>
            <div className="p-3 bg-slate-800 border-t border-slate-700 text-xs text-slate-500 italic">
              {prompt.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prompts;
