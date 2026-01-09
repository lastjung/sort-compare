import React, { useState } from 'react';
import { Play, Square, CheckSquare, Zap, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { cn } from '../utils/cn';
import { audioEngine } from '../utils/audio';

export const ControlCard = ({ 
  selectedIds,
  onToggleSelect,
  onRunSelected, 
  onStopAll,
  onReset,
  onSelectAll, 
  onDeselectAll,
  isRunningAny
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    audioEngine.setEnabled(next);
  };

  const ALGO_LABELS = [
    { id: 'bubble', label: 'Bubble' },
    { id: 'selection', label: 'Selection' },
    { id: 'insertion', label: 'Insertion' },
    { id: 'quick', label: 'Quick' },
    { id: 'merge', label: 'Merge' },
  ];

  return (
    <div className="bg-slate-800/60 backdrop-blur-xl border border-indigo-500/30 rounded-xl p-5 flex flex-col justify-between h-[320px] shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-amber-400 fill-amber-400/20" />
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Global Control</h3>
          </div>
          <button 
            onClick={toggleSound}
            className={cn(
              "p-2 rounded-lg transition-all",
              soundEnabled ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "bg-slate-700 text-slate-400"
            )}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>

        {/* Inline Selection Grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-4">
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
                "w-3.5 h-3.5 rounded border flex items-center justify-center transition-all",
                selectedIds.has(algo.id) ? "bg-indigo-500 border-indigo-500" : "border-slate-600"
              )}>
                {selectedIds.has(algo.id) && <div className="w-1.5 h-1.5 bg-white rounded-sm" />}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tight">{algo.label}</span>
            </label>
          ))}

          {/* Master Select All Toggle in Grid */}
          <label 
            className={cn(
              "flex items-center gap-2 cursor-pointer p-1.5 rounded-lg border transition-all active:scale-95 group/master",
              selectedIds.size === 5 
                ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-200" 
                : "bg-slate-900/30 border-transparent text-slate-500 hover:text-slate-400"
            )}
            onClick={(e) => {
              e.preventDefault();
              selectedIds.size === 5 ? onDeselectAll() : onSelectAll();
            }}
          >
            <div className={cn(
              "w-3.5 h-3.5 rounded border flex items-center justify-center transition-all",
              selectedIds.size === 5 
                ? "bg-indigo-500 border-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]" 
                : selectedIds.size > 0 
                  ? "bg-indigo-500/50 border-indigo-500" 
                  : "border-slate-600 group-hover/master:border-slate-500"
            )}
            >
              {selectedIds.size === 5 && <div className="w-1.5 h-1.5 bg-white rounded-sm" />}
              {selectedIds.size > 0 && selectedIds.size < 5 && <div className="w-1.5 h-[2px] bg-white rounded-sm" />}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tight">Select All</span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Progress</span>
            <span className="text-xs font-mono font-bold text-indigo-400">{selectedIds.size} / 5</span>
          </div>
          <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" 
              style={{ width: `${(selectedIds.size / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button 
          onClick={onReset}
          className="group flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-700/50 hover:bg-slate-700 hover:text-white hover:border-slate-400/40 text-slate-300 rounded-xl font-bold text-xs border border-slate-600/50 transition-all active:scale-95 hover:shadow-lg hover:shadow-slate-900/50"
        >
          <RotateCcw size={14} className="transition-transform duration-500 group-hover:-rotate-180" /> RESET
        </button>
        {isRunningAny ? (
          <button 
            onClick={onStopAll}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-xl font-bold text-sm border border-rose-500/30 transition-all active:scale-95 shadow-lg shadow-rose-900/20"
          >
            <Square size={14} fill="currentColor" /> STOP ALL
          </button>
        ) : (
          <button 
            onClick={onRunSelected}
            disabled={selectedIds.size === 0}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white rounded-xl font-bold text-sm shadow-xl shadow-indigo-500/30 transition-all active:scale-95"
          >
            <Play size={16} fill="currentColor" /> RUN SELECTED
          </button>
        )}
      </div>
    </div>
  );
};
