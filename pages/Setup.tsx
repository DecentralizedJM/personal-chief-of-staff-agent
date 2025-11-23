import React from 'react';
import { NOTION_SCHEMA, REPO_STRUCTURE, README_CONTENT } from '../constants';

const Setup: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <header>
        <h2 className="text-3xl font-bold text-white">System Configuration</h2>
        <p className="text-slate-400">Follow these guides to deploy your Agent.</p>
      </header>

      {/* REPO STRUCTURE */}
      <section className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Repository Structure</h3>
        <p className="text-slate-400 mb-4 text-sm">Create this folder structure in your project.</p>
        <div className="bg-slate-950 p-4 rounded-lg font-mono text-sm text-green-400 border border-slate-800">
          <pre>{JSON.stringify(REPO_STRUCTURE, null, 2)}</pre>
        </div>
      </section>

      {/* NOTION SCHEMA */}
      <section className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Notion Database Schema</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-900 text-slate-200 uppercase font-medium">
              <tr>
                <th className="px-4 py-3">Property Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {NOTION_SCHEMA.map((field, idx) => (
                <tr key={idx} className="hover:bg-slate-700/30">
                  <td className="px-4 py-3 font-medium text-white">{field.name}</td>
                  <td className="px-4 py-3 text-blue-400">{field.type}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {field.options?.join(', ') || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* README */}
      <section className="bg-slate-800 rounded-xl border border-slate-700 p-6">
         <h3 className="text-xl font-bold text-white mb-4">README.md</h3>
         <div className="prose prose-invert max-w-none">
           <pre className="whitespace-pre-wrap font-sans text-slate-300">
             {README_CONTENT}
           </pre>
         </div>
      </section>
    </div>
  );
};

export default Setup;
