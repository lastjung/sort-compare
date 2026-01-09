import React from 'react';
import { X, Trophy, Clock, Activity, ArrowLeftRight } from 'lucide-react';
import { cn } from '../utils/cn';

export const Scoreboard = ({ results, onClose }) => {
  if (!results || results.length === 0) return null;

  // Sort by time for ranking
  const sortedByTime = [...results].sort((a, b) => a.time - b.time);
  const maxTime = Math.max(...results.map(r => r.time), 1);
  // const maxComparisons = Math.max(...results.map(r => r.comparisons), 1);
  // const maxSwaps = Math.max(...results.map(r => r.swaps), 1);
  // const getRank = (title) => sortedByTime.findIndex(r => r.title === title) + 1;
  
  const getMedalColor = (rank) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-slate-300';
    if (rank === 3) return 'text-amber-600';
    return 'text-slate-500';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <Trophy className="text-yellow-400" size={24} />
            <h2 className="text-xl font-bold text-white">Scoreboard</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Time Chart */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-sky-400" />
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Time (seconds)</span>
          </div>
          <div className="space-y-2">
            {sortedByTime.map((result, idx) => (
              <div key={result.title} className="flex items-center gap-3">
                <span className={cn("w-5 text-center font-bold", getMedalColor(idx + 1))}>
                  {idx + 1}
                </span>
                <span className="w-24 text-sm text-slate-300 truncate">{result.title}</span>
                <div className="flex-1 h-6 bg-slate-700/50 rounded-lg overflow-hidden relative">
                  <div 
                    className={cn(
                      "h-full rounded-lg transition-all duration-500",
                      idx === 0 ? "bg-gradient-to-r from-yellow-500 to-amber-400" :
                      idx === 1 ? "bg-gradient-to-r from-slate-400 to-slate-300" :
                      idx === 2 ? "bg-gradient-to-r from-amber-700 to-amber-600" :
                      "bg-gradient-to-r from-indigo-600 to-indigo-500"
                    )}
                    style={{ width: `${(result.time / maxTime) * 100}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-white/80">
                    {(result.time / 1000).toFixed(2)}s
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Table */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={16} className="text-rose-400" />
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Statistics</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-700">
                  <th className="text-left py-2 font-medium">Algorithm</th>
                  <th className="text-center py-2 font-medium">Comparisons</th>
                  <th className="text-center py-2 font-medium">Swaps</th>
                  <th className="text-center py-2 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {sortedByTime.map((result, idx) => (
                  <tr key={result.title} className="border-b border-slate-700/50 text-slate-300">
                    <td className="py-2 flex items-center gap-2">
                      <span className={cn("font-bold", getMedalColor(idx + 1))}>{idx + 1}.</span>
                      {result.title}
                    </td>
                    <td className="py-2 text-center font-mono">{result.comparisons.toLocaleString()}</td>
                    <td className="py-2 text-center font-mono">{result.swaps.toLocaleString()}</td>
                    <td className="py-2 text-center font-mono text-sky-400">{(result.time / 1000).toFixed(2)}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
