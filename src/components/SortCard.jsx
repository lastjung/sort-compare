import React from 'react';
import { useSorting } from '../hooks/useSorting';
import { SortBar } from './SortBar';
import { cn } from '../utils/cn';
import { Play, Activity, ArrowLeftRight, Clock } from 'lucide-react';

export const SortCard = ({ title, algorithm, complexity, desc, initialData, speed, triggerRun, triggerStop, isSelected, onToggleSelect, onEnd }) => {
  const { array, comparing, swapping, finalized, sorted, isRunning, stats, runSort, stop } = 
    useSorting(initialData, algorithm, speed, triggerRun, triggerStop, onEnd);

  // initialData changes are handled by useSorting's initialArray prop

  const max = Math.max(...array, 1);

  return (
    <div className={cn(
      "bg-slate-800/40 backdrop-blur-md border rounded-xl p-4 flex flex-col h-[320px] shadow-xl transition-all group relative overflow-hidden",
      isSelected ? "border-indigo-500/50 bg-indigo-500/5" : "border-slate-700 hover:border-slate-600"
    )}>
      <div className="flex justify-between items-center mb-4 min-h-[32px]">
        <div className="flex items-center gap-2">
          <div 
            onClick={onToggleSelect}
            className="cursor-pointer group/check"
          >
            <div className={cn(
              "w-4 h-4 rounded border transition-all flex items-center justify-center",
              isSelected ? "bg-indigo-500 border-indigo-500 shadow-lg shadow-indigo-500/30" : "border-slate-500 group-hover/check:border-slate-400 bg-slate-900/50"
            )}>
              {isSelected && <div className="w-2 h-2 bg-white rounded-sm" />}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-black text-cyan-100 group-hover:text-white transition-colors uppercase tracking-widest leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{title}</h3>
            {complexity && (
              <div className="group/badge relative w-fit">
                <span className="text-[10px] bg-slate-700/50 text-indigo-300 px-1.5 py-0.5 rounded cursor-help font-mono border border-slate-600/50 transition-colors hover:bg-indigo-500/20 hover:border-indigo-500/30 hover:text-indigo-200">
                  {complexity}
                </span>
                {desc && (
                  <div className="absolute left-0 top-full mt-2 w-48 p-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-lg shadow-xl text-xs text-slate-300 z-50 opacity-0 invisible group-hover/badge:opacity-100 group-hover/badge:visible transition-all duration-200 translate-y-2 group-hover/badge:translate-y-0 pointer-events-none">
                    {desc}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-1.5">
          {isRunning ? (
            <button 
              onClick={stop}
              className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-all active:scale-90 border border-rose-500/20"
              title="Stop"
            >
              <div className="w-3 h-3 bg-current rounded-sm" />
            </button>
          ) : (
            <button 
              onClick={runSort}
              className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 disabled:opacity-20 transition-all active:scale-95 border border-emerald-500/20"
            >
              <Play size={14} fill="currentColor" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex items-end justify-center mb-4 min-h-0">
        {array.map((value, idx) => (
          <SortBar 
            key={idx}
            value={value}
            max={max}
            isComparing={comparing.includes(idx)}
            isSwapping={swapping.includes(idx)}
            isFinalized={finalized.includes(idx)}
            isSorted={sorted}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 py-2 border-t border-slate-700/50">
        <div className="flex flex-col items-center">
          <Activity size={14} className="text-rose-400 mb-1" />
          <span className="text-[10px] text-slate-400 uppercase">Comps</span>
          <span className="text-sm font-mono text-slate-200">{stats.comparisons}</span>
        </div>
        <div className="flex flex-col items-center">
          <ArrowLeftRight size={14} className="text-amber-400 mb-1" />
          <span className="text-[10px] text-slate-400 uppercase">Swaps</span>
          <span className="text-sm font-mono text-slate-200">{stats.swaps}</span>
        </div>
        <div className="flex flex-col items-center">
          <Clock size={14} className="text-sky-400 mb-1" />
          <span className="text-[10px] text-slate-400 uppercase">Time</span>
          <span className="text-sm font-mono text-slate-200">{(stats.time / 1000).toFixed(2)}s</span>
        </div>
      </div>
    </div>
  );
};
