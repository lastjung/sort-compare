import React from 'react';
import { Play, Square, CheckSquare, Zap, RotateCcw } from 'lucide-react';
import { cn } from '../utils/cn';

export const ControlCard = ({ 
  selectedIds,
  onToggleSelect,
  onRunSelected, 
  onStopAll,
  onReset,
  onSelectAll, 
  onDeselectAll,
  isRunningAny,
  onRiggedRandomize,
  shuffleRange,
  setShuffleRange,
  isTournamentActive,
  setIsTournamentActive
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
    <div className="hidden lg:flex bg-slate-800/60 backdrop-blur-xl border border-indigo-500/30 rounded-xl p-4 flex-col gap-2 shadow-2xl relative overflow-hidden group h-[360px]">
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

      {/* Separator */}
      <div className="h-px bg-slate-700/50 my-0.5" />

      {/* Tournament Management (One Row) */}
      <div className="mt-auto flex items-center gap-2 bg-indigo-500/5 p-1 rounded-xl border border-indigo-500/20">
        {/* Toggle Switch */}
        <button 
          onClick={() => setIsTournamentActive(!isTournamentActive)}
          className={cn(
            "w-8 h-4.5 rounded-full p-0.5 transition-all flex-shrink-0 relative",
            isTournamentActive ? "bg-indigo-500" : "bg-slate-700 font-bold"
          )}
          title="Tournament Mode"
        >
          <div className={cn(
            "w-3.5 h-3.5 bg-white rounded-full transition-all transform shadow-sm",
            isTournamentActive ? "translate-x-3.5" : "translate-x-0"
          )} />
        </button>

        {/* -+ Control Grouped on Left */}
        <div className="flex items-center bg-indigo-500/10 rounded border border-indigo-500/30 overflow-hidden h-7">
          <button 
            onClick={() => setShuffleRange(Math.max(0, shuffleRange - 5))}
            className="w-5 h-full flex items-center justify-center hover:bg-indigo-500 hover:text-white text-indigo-400 text-[10px] font-bold transition-all border-r border-indigo-500/30"
          >-</button>
          <div className="px-1 text-[10px] font-mono font-bold text-indigo-300 min-w-[24px] text-center">
            {shuffleRange}%
          </div>
          <button 
            onClick={() => setShuffleRange(Math.min(100, shuffleRange + 5))}
            className="w-5 h-full flex items-center justify-center hover:bg-indigo-500 hover:text-white text-indigo-400 text-[10px] font-bold transition-all border-l border-indigo-500/30"
          >+</button>
        </div>

        {/* Action Buttons */}
        <div className="flex-1 flex gap-1">
          <button 
            onClick={onRiggedRandomize}
            disabled={!isTournamentActive}
            className={cn(
              "flex-1 h-7 rounded-lg font-bold text-[10px] transition-all active:scale-95 flex items-center justify-center gap-1 uppercase",
              isTournamentActive 
                ? "bg-indigo-600/50 hover:bg-indigo-500 text-white border border-indigo-500/30" 
                : "bg-slate-800 text-slate-700 cursor-not-allowed opacity-50"
            )}
          >
            <Zap size={10} fill="currentColor" /> Shuffle
          </button>
          
          {isTournamentActive && (
            <button 
              onClick={onRunSelected}
              disabled={selectedIds.size === 0 || isRunningAny}
              className="flex-1 h-7 rounded-lg font-bold text-[10px] transition-all active:scale-95 flex items-center justify-center gap-1 uppercase bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg shadow-orange-500/20 border border-orange-400/50 animate-in fade-in zoom-in duration-300"
            >
              <Play size={10} fill="currentColor" /> RACE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
