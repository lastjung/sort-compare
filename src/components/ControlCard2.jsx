import React from 'react';
import { Play, Zap } from 'lucide-react';
import { cn } from '../utils/cn';

export const ControlCard2 = ({
  selectedIds,
  onRunSelected,
  isRunningAny,
  arraySize,
  onApplyDataSize,
  onRiggedRandomize,
  shuffleRange,
  setShuffleRange,
  isTournamentActive,
  setIsTournamentActive
}) => {
  return (
    <div className="hidden lg:flex bg-slate-800/65 backdrop-blur-xl border border-indigo-500/30 rounded-xl p-3 shadow-2xl relative overflow-hidden flex-col h-[400px] md:h-[320px]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/8 to-transparent pointer-events-none" />
      <div className="relative z-10 w-full h-full flex flex-col">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-700/50">
          <Zap size={14} className="text-indigo-400 fill-indigo-400/20" />
          <h3 className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">
            Tournament Control
          </h3>
        </div>

        <div className="flex-1 flex items-end">
          <div className="w-full flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 rounded-lg border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-between px-2">
                <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-300">Mode</span>
                <button
                  onClick={() => setIsTournamentActive(!isTournamentActive)}
                  className={cn(
                    "w-8 h-4.5 rounded-full p-0.5 transition-all relative",
                    isTournamentActive ? "bg-indigo-500" : "bg-slate-700"
                  )}
                  title="Tournament Mode"
                >
                  <div
                    className={cn(
                      "w-3.5 h-3.5 bg-white rounded-full transition-all transform shadow-sm",
                      isTournamentActive ? "translate-x-3.5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              <button
                onClick={() => onApplyDataSize?.(100)}
                className={cn(
                  "h-8 rounded-lg font-bold text-[10px] uppercase border transition-all active:scale-95",
                  arraySize === 100
                    ? "bg-indigo-500/20 border-indigo-400/50 text-indigo-200"
                    : "bg-slate-900/40 border-slate-700/50 text-slate-300 hover:text-white hover:border-slate-500"
                )}
              >
                Base 100
              </button>

              <button
                onClick={() => onApplyDataSize?.(200)}
                className={cn(
                  "h-8 rounded-lg font-bold text-[10px] uppercase border transition-all active:scale-95",
                  arraySize === 200
                    ? "bg-amber-500/20 border-amber-400/50 text-amber-200"
                    : "bg-slate-900/40 border-slate-700/50 text-slate-300 hover:text-white hover:border-slate-500"
                )}
              >
                Large 200
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="h-8 flex items-center bg-indigo-500/10 rounded-lg border border-indigo-500/30 overflow-hidden">
                <button
                  onClick={() => setShuffleRange(Math.max(0, shuffleRange - 5))}
                  className="w-7 h-full flex items-center justify-center hover:bg-indigo-500 hover:text-white text-indigo-400 text-[10px] font-bold transition-all border-r border-indigo-500/30"
                >
                  -
                </button>
                <div className="flex-1 text-[10px] font-mono font-bold text-indigo-300 text-center">
                  {shuffleRange}%
                </div>
                <button
                  onClick={() => setShuffleRange(Math.min(100, shuffleRange + 5))}
                  className="w-7 h-full flex items-center justify-center hover:bg-indigo-500 hover:text-white text-indigo-400 text-[10px] font-bold transition-all border-l border-indigo-500/30"
                >
                  +
                </button>
              </div>
              <button
                onClick={onRiggedRandomize}
                className="h-8 rounded-lg font-bold text-[10px] transition-all active:scale-95 flex items-center justify-center gap-1 uppercase bg-indigo-600/60 hover:bg-indigo-500 text-white border border-indigo-500/30"
              >
                <Zap size={10} fill="currentColor" /> Shuffle
              </button>

              <button
                onClick={onRunSelected}
                disabled={selectedIds.size === 0 || isRunningAny}
                className="h-8 rounded-lg font-bold text-[10px] transition-all active:scale-95 flex items-center justify-center gap-1 uppercase bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg shadow-orange-500/20 border border-orange-400/50"
              >
                <Play size={10} fill="currentColor" /> RACE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
