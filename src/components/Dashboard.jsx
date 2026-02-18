import React, { useState, useCallback, useRef } from 'react';
import { SortCard } from './SortCard';
import { ControlCard } from './ControlCard';
import { MobileControlBar } from './MobileControlBar';
import { Scoreboard } from './Scoreboard';
import { CommentaryPanel } from './CommentaryPanel';
import { bubbleSort, selectionSort, insertionSort, quickSort, mergeSort, heapSort, shellSort, cocktailSort } from '../algorithms';

const ALGORITHMS = [
  { 
    id: 'bubble', 
    title: 'Bubble Sort', 
    fn: bubbleSort, 
    complexity: 'O(n²)', 
    desc: 'Swaps adjacent elements if they are in wrong order.' 
  },
  { 
    id: 'selection', 
    title: 'Selection Sort', 
    fn: selectionSort, 
    complexity: 'O(n²)', 
    desc: 'Selects the smallest element and moves it to the sorted part.' 
  },
  { 
    id: 'insertion', 
    title: 'Insertion Sort', 
    fn: insertionSort, 
    complexity: 'O(n²)', 
    desc: 'Builds the sorted array one item at a time by comparison.' 
  },
  { 
    id: 'quick', 
    title: 'Quick Sort', 
    fn: quickSort, 
    complexity: 'O(n log n)', 
    desc: 'Divides array into partitions and sorts them recursively.' 
  },
  { 
    id: 'merge', 
    title: 'Merge Sort', 
    fn: mergeSort, 
    complexity: 'O(n log n)', 
    desc: 'Recursively divides array in half and merges sorted parts.' 
  },
  { 
    id: 'heap', 
    title: 'Heap Sort', 
    fn: heapSort, 
    complexity: 'O(n log n)', 
    desc: 'Builds a max-heap and repeatedly extracts the maximum.' 
  },
  { 
    id: 'shell', 
    title: 'Shell Sort', 
    fn: shellSort, 
    complexity: 'O(n log n)', 
    desc: 'Sorts elements at specific intervals, reducing the gap.' 
  },
  { 
    id: 'cocktail', 
    title: 'Cocktail Sort', 
    fn: cocktailSort, 
    complexity: 'O(n²)', 
    desc: 'Bidirectional bubble sort, shaking elements both ways.' 
  },
];

export const Dashboard = ({ 
  data, 
  speed, 
  setSpeed, 
  arraySize, 
  setArraySize, 
  onRandomize,
  onRiggedRandomize,
  shuffleRange,
  setShuffleRange 
}) => {
  const [selectedIds, setSelectedIds] = useState(new Set(ALGORITHMS.map(a => a.id)));
  const [triggerMap, setTriggerMap] = useState({});
  const [activeIds, setActiveIds] = useState(new Set());
  const [stopTrigger, setStopTrigger] = useState(0);
  const [isTournamentActive, setIsTournamentActive] = useState(false);
  
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

  // Tournament state
  const [ranking, setRanking] = useState({});
  const finishOrderRef = useRef(0);
  const [logs, setLogs] = useState([]);
  const startTimeRef = useRef(0);
  const originalSpeedRef = useRef(speed);

  const addLog = (text, type = 'info') => {
    const time = ((Date.now() - startTimeRef.current) / 1000).toFixed(1) + 's';
    setLogs(prev => [...prev, { time, text, type }]);
  };

  const runSelected = () => {
    // Reset results for new run
    resultsRef.current = {};
    runningSetRef.current = new Set(selectedIds);
    setShowScoreboard(false);
    setRanking({});
    finishOrderRef.current = 0;
    startTimeRef.current = Date.now();
    originalSpeedRef.current = speed;
    
    if (isTournamentActive) {
      setLogs([{ time: '0.0s', text: `🏁 Race Started! ${selectedIds.size} Contenders fighting for glory!`, type: 'start' }]);
      
      // Intermediate Commentary (after 10s)
      setTimeout(() => {
        if (finishOrderRef.current === 0) { // Only if no one finished yet
            addLog("👀 Looks like Quick Sort and Merge Sort are pulling ahead as expected!", "info");
        }
      }, 10000);
    } else {
      setLogs([]);
    }
    
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
    if (isTournamentActive && speed !== originalSpeedRef.current) {
        setSpeed(originalSpeedRef.current);
    }
  };

  const resetAll = () => {
    stopAll();
    if (onRandomize) onRandomize();
    setLogs([]);
    setRanking({});
    finishOrderRef.current = 0;
    if (isTournamentActive && speed !== originalSpeedRef.current) {
        setSpeed(originalSpeedRef.current);
    }
  };

  const handleSortEnd = (id, stats) => {
    setActiveIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    
    // Handle Tournament Ranking
    if (isTournamentActive && stats && runningSetRef.current.has(id)) {
      finishOrderRef.current += 1;
      const rank = finishOrderRef.current;
      setRanking(prev => ({
        ...prev,
        [id]: rank
      }));
      
      const algoName = ALGORITHMS.find(a => a.id === id)?.title || id;
      let logText = `${algoName} finishes #${rank}!`;
      let type = 'info';
      
      if (rank === 1) {
        logText = `🥇 ${algoName} takes the GOLD! Incredible speed!`;
        type = 'finish-1';
      } else if (rank === 2) {
        logText = `🥈 ${algoName} takes Silver! Just missed it!`;
        type = 'finish-2';
      } else if (rank === 3) {
        logText = `🥉 ${algoName} grabs Bronze! Top 3 decided!`;
        type = 'finish-3';
      } else if (rank === 4) {
        logText = `${algoName} finishes 4th. Solid performance.`;
        
        // Auto-speedup logic at Rank 4 - Always speed up to near max
        if (speed < 980) {
            setSpeed(980);
            addLog("🐌 Bubble and Cocktail sorts have a long way to go. Speeding up for you!", "info");
        }
      }
      
      addLog(logText, type);
      

    }

    // Collect results
    if (stats && runningSetRef.current.has(id)) {
      const algo = ALGORITHMS.find(a => a.id === id);
      resultsRef.current[id] = {
        ...stats,
        title: algo?.title || id,
        complexity: algo?.complexity || 'O(n²)',
        rank: isTournamentActive ? finishOrderRef.current : null,
      };
      runningSetRef.current.delete(id);
      
      // Check if all completed
      if (runningSetRef.current.size === 0 && Object.keys(resultsRef.current).length > 0) {
        // 1. Trigger Scoreboard
        setScoreboardResults(Object.values(resultsRef.current).sort((a, b) => a.time - b.time));
        setTimeout(() => {
          setShowScoreboard(true);
        }, 1000);

        // 2. Trigger Final Commentary Summary
        if (isTournamentActive) {
            const results = Object.values(resultsRef.current).sort((a, b) => a.rank - b.rank);
            if (results.length > 0) {
                const first = results[0]?.title;
                const second = results[1]?.title;
                const third = results[2]?.title;
                const last = results[results.length - 1]?.title;
                
                setTimeout(() => {
                    addLog(`🏁 Race Finished! Winner: ${first}, 2nd: ${second}, 3rd: ${third}... and Last Place: ${last}.`, 'finish-1');
                }, 1000); 
            }
        }
      }
    }
  };

  const visibleAlgorithms = ALGORITHMS.filter(algo => selectedIds.has(algo.id));

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 pb-28 lg:pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First 2 visible cards */}
        {visibleAlgorithms.slice(0, 2).map((algo) => (
          <SortCard 
            key={algo.id}
            title={algo.title}
            complexity={algo.complexity}
            desc={algo.desc}
            algorithm={algo.fn}
            initialData={data}
            speed={speed}
            isSelected={true} // Always selected if visible
            onToggleSelect={() => toggleSelect(algo.id)}
            triggerRun={triggerMap[algo.id] || 0}
            triggerStop={stopTrigger}
            onEnd={(stats) => handleSortEnd(algo.id, stats)}
            rank={ranking[algo.id]}
          />
        ))}
        
        {/* ControlCard - Wrapped for Commentary Anchor */}
        <div className="relative group/control">
          <ControlCard 
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            onRunSelected={runSelected}
            onStopAll={stopAll}
            onReset={resetAll}
            onSelectAll={selectAll}
            onDeselectAll={deselectAll}
            isRunningAny={activeIds.size > 0}
            onRiggedRandomize={onRiggedRandomize}
            shuffleRange={shuffleRange}
            setShuffleRange={setShuffleRange}
            isTournamentActive={isTournamentActive}
            setIsTournamentActive={setIsTournamentActive}
          />
          
          {/* Commentary Panel - Anchored to Control Card (Right Side) */}
          {isTournamentActive && (
            <div className="absolute top-0 left-full ml-[-40px] w-[340px] h-full z-40 hidden lg:block filter drop-shadow-2xl">
               <CommentaryPanel logs={logs} />
            </div>
          )}
          
          {/* Mobile Commentary (Fixed Bottom) - For smaller screens */}
          {isTournamentActive && (
            <div className="fixed bottom-20 left-4 right-4 h-48 lg:hidden z-50">
               <CommentaryPanel logs={logs} />
            </div>
          )}
        </div>
        

        
        {/* Remaining visible cards */}
        {visibleAlgorithms.slice(2).map((algo) => (
          <SortCard 
            key={algo.id}
            title={algo.title}
            complexity={algo.complexity}
            desc={algo.desc}
            algorithm={algo.fn}
            initialData={data}
            speed={speed}
            isSelected={true} // Always selected if visible
            onToggleSelect={() => toggleSelect(algo.id)} // This will hide it
            triggerRun={triggerMap[algo.id] || 0}
            triggerStop={stopTrigger}
            onEnd={(stats) => handleSortEnd(algo.id, stats)}
            rank={ranking[algo.id]}
          />
        ))}
      </div>
      
      {/* MobileControlBar (Mobile + Tablet) */}
      <MobileControlBar 
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onRunSelected={runSelected}
          onStopAll={stopAll}
          onReset={resetAll}
          onSelectAll={selectAll}
          onDeselectAll={deselectAll}
          isRunningAny={activeIds.size > 0}
          arraySize={arraySize}
          setArraySize={setArraySize}
          speed={speed}
          setSpeed={setSpeed}
          onRandomize={onRandomize}
          onRiggedRandomize={onRiggedRandomize}
          shuffleRange={shuffleRange}
          setShuffleRange={setShuffleRange}
          isTournamentActive={isTournamentActive}
          setIsTournamentActive={setIsTournamentActive}
        />
      
      {showScoreboard && (
        <Scoreboard 
          results={scoreboardResults}
          onClose={() => setShowScoreboard(false)}
        />
      )}
      

    </div>
  );
};
