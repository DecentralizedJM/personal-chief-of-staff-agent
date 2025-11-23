import React from 'react';
import { N8N_WORKFLOWS } from '../constants';
import { Download } from 'lucide-react';

const Workflows: React.FC = () => {
  const downloadWorkflow = (json: object, filename: string) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-white">n8n Workflows</h2>
        <p className="text-slate-400">Download these JSON files and import them directly into your n8n instance.</p>
      </header>

      <div className="grid gap-6">
        {N8N_WORKFLOWS.map((wf, idx) => (
          <div key={idx} className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{wf.name}</h3>
                <p className="text-slate-400 text-sm mt-1">{wf.description}</p>
              </div>
              <button
                onClick={() => downloadWorkflow(wf.json, wf.filename)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Download size={18} />
                <span>Download JSON</span>
              </button>
            </div>
            
            <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
               <div className="flex items-center space-x-2 mb-2 text-xs text-slate-500 uppercase tracking-wider font-bold">
                 <span>Nodes included:</span>
               </div>
               <div className="flex flex-wrap gap-2">
                 {/* @ts-ignore - Dynamic access to json structure */}
                 {wf.json.nodes.map((node: any, nIdx: number) => (
                   <span key={nIdx} className="bg-slate-800 text-blue-300 px-3 py-1 rounded-full text-xs border border-slate-700">
                     {node.name} <span className="text-slate-600 ml-1">({node.type.split('.').pop()})</span>
                   </span>
                 ))}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workflows;
