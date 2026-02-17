import React from 'react';
import { cn } from '../utils/cn';

export const SortBar = ({ value, max, isComparing, isSwapping, isFinalized, isSorted }) => {
  const height = (value / max) * 100;
  
  return (
    <div 
      className={cn(
        "flex-1 mx-[1px] rounded-t-sm transition-all duration-150",
        (isSorted || isFinalized) ? "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]" :
        isSwapping ? "bg-emerald-400 scale-y-110 z-10 shadow-[0_0_12px_rgba(52,211,153,0.6)]" :
        isComparing ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" :
        "bg-indigo-500/60 hover:bg-indigo-400"
      )}
      style={{ height: `${height}%` }}
    />
  );
};
