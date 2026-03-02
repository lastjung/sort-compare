import React from 'react';
import { Play, Square, Zap, RotateCcw } from 'lucide-react';
import { cn } from '../utils/cn';

export const ControlCard = ({ 
  selectedIds,
  onToggleSelect,
  onRunSelected, 
  onStopAll,
  onReset,
  onRestore,
  onSelectAll, 
  onDeselectAll,
  isRunningAny
}) => {

  const ALGO_LABELS = [
    { id: 'bubble', label: 'Bubble' },
    { id: 'optimized-bubble', label: 'Opt. Bubble' },
    { id: 'selection', label: 'Selection' },
    { id: 'insertion', label: 'Insertion' },
    { id: 'quick', label: 'Quick' },
    { id: 'merge', label: 'Merge' },
    { id: 'heap', label: 'Heap' },
    { id: 'shell', label: 'Shell' },
    { id: 'cocktail', label: 'Cocktail' },
    { id: 'comb', label: 'Comb' },
  ];

  return (
    <div className="hidden lg:flex bg-slate-800/60 backdrop-blur-xl border border-indigo-500/30 rounded-xl p-4 flex-col gap-2 shadow-2xl relative overflow-hidden group h-[400px] md:h-[320px]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center gap-2">
        <Zap size={14} className="text-indigo-400 fill-indigo-400/20" />
        <h3 className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">Control</h3>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button 
          onClick={onReset}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 hover:text-white text-slate-300 rounded-lg font-bold text-[10px] border border-slate-600/50 transition-all active:scale-95"
        >
          <RotateCcw size={11} /> RESET
        </button>
        <button
          onClick={onRestore}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 hover:text-white text-slate-300 rounded-lg font-bold text-[10px] border border-slate-600/50 transition-all active:scale-95"
        >
          RESTORE
        </button>
        {isRunningAny ? (
          <button 
            onClick={onStopAll}
            className="flex-1 flex items-center justify-center gap-2 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg font-bold text-[10px] border border-rose-500/30 transition-all active:scale-95"
          >
            <Square size={11} fill="currentColor" /> STOP ALL
          </button>
        ) : (
          <button 
            onClick={onRunSelected}
            disabled={selectedIds.size === 0}
            className="flex-1 flex items-center justify-center gap-2 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white rounded-lg font-bold text-[10px] shadow-xl shadow-indigo-500/30 transition-all active:scale-95"
          >
            <Play size={11} fill="currentColor" /> RUN SELECTED
          </button>
        )}
      </div>

      {/* Algorithm Selection Grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {ALGO_LABELS.map(algo => (
          <label 
            key={algo.id}
            className={cn(
              "flex items-center gap-2 cursor-pointer p-1.5 rounded-lg border transition-all active:scale-95",
              selectedIds.has(algo.id) 
                ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300" 
                : "bg-slate-900/30 border-transparent text-slate-500 hover:text-slate-400"
            )}
          >
            <input 
              type="checkbox"
              className="hidden"
              checked={selectedIds.has(algo.id)}
              onChange={() => onToggleSelect(algo.id)}
            />
            <div className={cn(
              "w-3 h-3 rounded border flex items-center justify-center transition-all flex-shrink-0",
              selectedIds.has(algo.id) ? "bg-indigo-500 border-indigo-500" : "border-slate-600"
            )}>
              {selectedIds.has(algo.id) && <div className="w-1.5 h-1.5 bg-white rounded-sm" />}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tight">{algo.label}</span>
          </label>
        ))}
      </div>

      {/* Select All Button */}
      <button
        onClick={() => selectedIds.size === 10 ? onDeselectAll() : onSelectAll()}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-2 rounded-lg border transition-all active:scale-95 text-[10px]",
          selectedIds.size === 10 
            ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-200" 
            : "bg-slate-900/40 border-slate-700/50 text-slate-400 hover:text-slate-300"
        )}
      >
        <div className={cn(
          "w-3.5 h-3.5 rounded border flex items-center justify-center",
          selectedIds.size === 10 ? "bg-indigo-500 border-indigo-500" : selectedIds.size > 0 ? "bg-indigo-500/50 border-indigo-500" : "border-slate-600"
        )}>
          {selectedIds.size === 10 && <div className="w-1.5 h-1.5 bg-white rounded-sm" />}
          {selectedIds.size > 0 && selectedIds.size < 10 && <div className="w-2 h-[2px] bg-white" />}
          </div>
        <span className="font-bold uppercase leading-none">
          {selectedIds.size === 10 ? 'Deselect All' : `Select All (${selectedIds.size}/10)`}
        </span>
      </button>

    </div>
  );
};
