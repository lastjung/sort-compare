import React, { useEffect, useRef } from 'react';
import { cn } from '../utils/cn';
import { Mic, Radio } from 'lucide-react';

export const CommentaryPanel = ({ logs }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="h-[320px] bg-slate-800/60 backdrop-blur-xl border border-indigo-500/30 rounded-xl p-4 flex flex-col shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Mic size={16} className="text-rose-400 animate-pulse" />
          <h3 className="text-sm font-bold text-indigo-200 uppercase tracking-widest leading-none">Live Commentary</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-rose-500/20 rounded-full border border-rose-500/30">
          <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
          <span className="text-[10px] font-bold text-rose-300 uppercase leading-none">ON AIR</span>
        </div>
      </div>

      {/* Logs */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-indigo-500/20 scrollbar-track-transparent"
      >
        {logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-2">
            <Radio size={32} className="opacity-20" />
            <span className="text-sm font-bold uppercase tracking-widest opacity-40">Waiting for race...</span>
          </div>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-mono text-slate-500">{log.time}</span>
                <p className={cn(
                  "text-sm font-medium leading-relaxed font-sans",
                  log.type === 'start' ? "text-indigo-300 font-bold text-base" :
                  log.type === 'finish-1' ? "text-yellow-300 font-bold text-base" :
                  log.type === 'finish-2' ? "text-slate-200 font-bold" :
                  log.type === 'finish-3' ? "text-orange-300 font-bold" :
                  "text-slate-300"
                )}>
                  {log.text}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
