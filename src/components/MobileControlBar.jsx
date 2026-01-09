import React, { useState } from 'react';
import { Play, RotateCcw, Settings2, CheckSquare, Square, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

export const MobileControlBar = ({
  selectedIds,
  onToggleSelect,
  onRunSelected,
  onStopAll,
  onReset,
  onSelectAll,
  onDeselectAll,
  isRunningAny
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ALGO_LABELS = [
    { id: 'bubble', label: 'Bubble' },
    { id: 'selection', label: 'Selection' },
    { id: 'insertion', label: 'Insertion' },
    { id: 'quick', label: 'Quick' },
    { id: 'merge', label: 'Merge' },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 z-40 flex flex-col gap-2">
      {/* Expanded Menu (Algorithm Selection) */}
      {isMenuOpen && (
        <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl mb-2 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Algorithms</span>
            <button
              onClick={() => selectedIds.size === 5 ? onDeselectAll() : onSelectAll()}
              className="text-xs text-indigo-400 font-medium active:text-indigo-300"
            >
              {selectedIds.size === 5 ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {ALGO_LABELS.map(algo => (
              <label
                key={algo.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border transition-all active:scale-95",
                  selectedIds.has(algo.id)
                    ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-200"
                    : "bg-slate-900/40 border-slate-700/50 text-slate-400"
                )}
              >
                <div className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center transition-all",
                  selectedIds.has(algo.id) ? "bg-indigo-500 border-indigo-500" : "border-slate-600"
                )}>
                  {selectedIds.has(algo.id) && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>
                <span className="text-sm font-medium">{algo.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Main Bar */}
      <div className="h-16 bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl flex items-center justify-between p-2 pr-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent pointer-events-none" />

        <div className="flex items-center gap-2">
          {/* Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "w-12 h-12 flex items-center justify-center rounded-xl transition-all active:scale-95",
              isMenuOpen ? "bg-slate-700 text-white" : "bg-transparent text-slate-400 hover:text-white"
            )}
          >
            {isMenuOpen ? <ChevronDown size={20} /> : <Settings2 size={20} />}
          </button>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-700/50 text-slate-300 hover:bg-slate-700 active:scale-95 transition-all"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        {/* Main Action Button */}
        <div className="flex-1 pl-2">
            {isRunningAny ? (
            <button
              onClick={onStopAll}
              className="w-full h-12 flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold shadow-lg shadow-rose-500/30 active:scale-95 transition-all"
            >
              <Square size={16} fill="currentColor" /> STOP
            </button>
            ) : (
            <button
              onClick={onRunSelected}
              disabled={selectedIds.size === 0}
              className="w-full h-12 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:active:scale-100 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 active:scale-95 transition-all"
            >
              <Play size={18} fill="currentColor" /> RUN
            </button>
            )}
        </div>
      </div>
    </div>
  );
};
