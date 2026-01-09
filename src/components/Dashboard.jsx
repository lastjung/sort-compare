import React, { useState, useCallback, useRef } from 'react';
import { SortCard } from './SortCard';
import { ControlCard } from './ControlCard';
import { MobileControlBar } from './MobileControlBar';
import { Scoreboard } from './Scoreboard';
import { bubbleSort, selectionSort, insertionSort, quickSort, mergeSort } from '../algorithms';

const ALGORITHMS = [
  { id: 'bubble', title: 'Bubble Sort', fn: bubbleSort },
  { id: 'selection', title: 'Selection Sort', fn: selectionSort },
  { id: 'insertion', title: 'Insertion Sort', fn: insertionSort },
  { id: 'quick', title: 'Quick Sort', fn: quickSort },
  { id: 'merge', title: 'Merge Sort', fn: mergeSort },
];

export const Dashboard = ({ data, speed, onRandomize }) => {
  const [selectedIds, setSelectedIds] = useState(new Set(ALGORITHMS.map(a => a.id)));
  const [triggerMap, setTriggerMap] = useState({});
  const [activeIds, setActiveIds] = useState(new Set());
  const [stopTrigger, setStopTrigger] = useState(0);
  
  // Scoreboard state
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [scoreboardResults, setScoreboardResults] = useState([]);
  const resultsRef = useRef({});
  const runningSetRef = useRef(new Set());

  const toggleSelect = useCallback((id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectAll = () => setSelectedIds(new Set(ALGORITHMS.map(a => a.id)));
  const deselectAll = () => setSelectedIds(new Set());

  const runSelected = () => {
    // Reset results for new run
    resultsRef.current = {};
    runningSetRef.current = new Set(selectedIds);
    setShowScoreboard(false);
    
    const nextTriggers = { ...triggerMap };
    const nextActive = new Set(activeIds);
    
    selectedIds.forEach(id => {
      const current = nextTriggers[id] || 0;
      nextTriggers[id] = Math.max(current, 0) + 1;
      nextActive.add(id);
    });
    
    setTriggerMap(nextTriggers);
    setActiveIds(nextActive);
  };

  const stopAll = () => {
    setStopTrigger(prev => prev + 1);
    setActiveIds(new Set());
    runningSetRef.current = new Set();
  };

  const resetAll = () => {
    stopAll();
    if (onRandomize) onRandomize();
  };

  const handleSortEnd = (id, stats) => {
    setActiveIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    
    // Collect results
    if (stats && runningSetRef.current.has(id)) {
      const algo = ALGORITHMS.find(a => a.id === id);
      resultsRef.current[id] = {
        title: algo?.title || id,
        ...stats
      };
      runningSetRef.current.delete(id);
      
      // Check if all completed
      if (runningSetRef.current.size === 0 && Object.keys(resultsRef.current).length > 0) {
        setScoreboardResults(Object.values(resultsRef.current));
        setShowScoreboard(true);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALGORITHMS.map((algo) => (
          <SortCard 
            key={algo.id}
            title={algo.title}
            algorithm={algo.fn}
            initialData={data}
            speed={speed}
            isSelected={selectedIds.has(algo.id)}
            onToggleSelect={() => toggleSelect(algo.id)}
            triggerRun={triggerMap[algo.id] || 0}
            triggerStop={stopTrigger}
            onEnd={(stats) => handleSortEnd(algo.id, stats)}
          />
        ))}
        <ControlCard 
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onRunSelected={runSelected}
          onStopAll={stopAll}
          onReset={resetAll}
          onSelectAll={selectAll}
          onDeselectAll={deselectAll}
          isRunningAny={activeIds.size > 0}
        />
        <MobileControlBar 
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onRunSelected={runSelected}
          onStopAll={stopAll}
          onReset={resetAll}
          onSelectAll={selectAll}
          onDeselectAll={deselectAll}
          isRunningAny={activeIds.size > 0}
        />
      </div>
      
      {showScoreboard && (
        <Scoreboard 
          results={scoreboardResults}
          onClose={() => setShowScoreboard(false)}
        />
      )}
    </div>
  );
};
