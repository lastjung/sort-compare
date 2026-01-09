import React from 'react';
import { Settings2, RefreshCcw, LayoutGrid, Sliders } from 'lucide-react';

export const ControlPanel = ({ 
  arraySize, 
  setArraySize, 
  speed, 
  setSpeed, 
  onRandomize 
}) => {
  return (
    <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
            <LayoutGrid className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Sort Algo Compare
            </h1>
            <p className="text-xs text-slate-500 font-medium tracking-tight">VISUALIZING PERFORMANCE</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:gap-8 bg-slate-800/50 px-4 md:px-6 py-3 rounded-2xl border border-white/5">
          <div className="flex flex-col gap-1.5 min-w-[100px] md:min-w-[140px] flex-1 md:flex-none">
            <div className="flex justify-between items-center px-0.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sliders size={10} /> Count
              </label>
              <span className="text-[10px] font-mono text-indigo-400 font-bold">{arraySize}</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="100" 
              value={arraySize} 
              onChange={(e) => setArraySize(Number(e.target.value))}
              className="accent-indigo-500 h-1.5 w-full bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1.5 min-w-[100px] md:min-w-[140px] flex-1 md:flex-none">
            <div className="flex justify-between items-center px-0.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Settings2 size={10} /> Speed
              </label>
              <span className="text-[10px] font-mono text-indigo-400 font-bold">{speed}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="1000" 
              value={speed} 
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="accent-indigo-500 h-1.5 w-full bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <button 
            onClick={onRandomize}
            className="group flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 bg-slate-100 hover:bg-white text-slate-900 rounded-xl font-semibold text-xs md:text-sm transition-all active:scale-95 shadow-lg shadow-white/5 whitespace-nowrap"
          >
            <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
            Randomize
          </button>
        </div>
      </div>
    </div>
  );
};
