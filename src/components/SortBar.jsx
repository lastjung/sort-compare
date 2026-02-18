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
        isComparing ? "bg-yellow-300 shadow-[0_0_8px_rgba(253,224,71,0.6)]" :
        "bg-pink-400 hover:bg-pink-300"
      )}
      style={{ height: `${height}%` }}
    />
  );
};
