import React, { useState } from 'react';
import { Settings2, RefreshCcw, LayoutGrid, Sliders, Volume2, VolumeX } from 'lucide-react';
import { cn } from '../utils/cn';
import { audioEngine } from '../utils/audio';

export const ControlPanel = ({ 
  arraySize, 
  setArraySize, 
  speed, 
  setSpeed, 
  onRandomize,
  onRiggedRandomize,
  shuffleRange,
  setShuffleRange
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    audioEngine.setEnabled(next);
  };

  return (
    <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
              <LayoutGrid className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Sort Algo Compare
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-tight hidden md:block">VISUALIZING PERFORMANCE</p>
            </div>
          </div>

          {/* Desktop Controls (Only visible on lg+) */}
          <div className="hidden lg:flex items-center gap-8 bg-slate-800/50 px-6 py-3 rounded-2xl border border-white/5">
            {/* Sound Toggle */}
            <button 
              onClick={toggleSound}
              className={cn(
                "p-2 rounded-lg transition-all",
                soundEnabled ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "bg-slate-700 text-slate-400 hover:text-white"
              )}
              title={soundEnabled ? "Mute" : "Sound"}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Count Slider */}
            <div className="flex flex-col gap-1.5 min-w-[140px]">
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

            {/* Speed Slider */}
            <div className="flex flex-col gap-1.5 min-w-[140px]">
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

            {/* Randomize Button */}
            <button 
              onClick={onRandomize}
              className="group flex items-center gap-2 px-6 py-2 bg-slate-100 hover:bg-white text-slate-900 rounded-xl font-semibold text-sm transition-all active:scale-95 shadow-lg shadow-white/5 whitespace-nowrap"
            >
              <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
              Randomize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
