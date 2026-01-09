import React, { useState, useCallback } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { Dashboard } from './components/Dashboard';
import { generateRandomArray } from './utils/data';

function App() {
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(800);
  const [data, setData] = useState(() => generateRandomArray(50)); // Initialize directly

  const randomize = useCallback(() => {
    setData(generateRandomArray(arraySize));
  }, [arraySize]);


  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-indigo-500/30 pb-20">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(67,56,202,0.1),transparent)] pointer-events-none" />
      <ControlPanel 
        arraySize={arraySize}
        setArraySize={setArraySize}
        speed={speed}
        setSpeed={setSpeed}
        onRandomize={randomize}
      />
      <main className="relative">
        <Dashboard data={data} speed={speed} onRandomize={randomize} />
      </main>
      
      <footer className="mt-12 py-12 border-t border-white/5 text-center">
        <p className="text-slate-500 text-xs font-medium tracking-widest uppercase">
          Built with React & Tailwind CSS • Sorting Performance Benchmark
        </p>
      </footer>
    </div>
  );
}

export default App;
