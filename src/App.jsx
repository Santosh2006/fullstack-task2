import { useState, useEffect } from 'react';
import GoalForm from './components/GoalForm.jsx';
import LogWater from './components/LogWater.jsx';
import Progress from './components/Progress.jsx';

const DEFAULT_GOAL = 2500;

// Read a value from localStorage (falls back if nothing saved yet)
function load(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [view, setView] = useState('progress'); // 'progress' | 'log' | 'goal'
  const [goal, setGoal] = useState(() => load('goal', DEFAULT_GOAL));
  const [entries, setEntries] = useState(() => load('entries', []));

  // Save to localStorage whenever data changes
  useEffect(() => localStorage.setItem('goal', JSON.stringify(goal)), [goal]);
  useEffect(() => localStorage.setItem('entries', JSON.stringify(entries)), [entries]);

  function addEntry(date, amount) {
    setEntries([...entries, { id: Date.now(), date, amount }]);
  }

  function deleteEntry(id) {
    setEntries(entries.filter((e) => e.id !== id));
  }

  return (
    <div className="app">
      <h1>Water Intake Tracker</h1>

      <nav>
        <button className={view === 'progress' ? 'active' : ''} onClick={() => setView('progress')}>Progress</button>
        <button className={view === 'log' ? 'active' : ''} onClick={() => setView('log')}>Log Water</button>
        <button className={view === 'goal' ? 'active' : ''} onClick={() => setView('goal')}>Set Goal</button>
      </nav>

      {view === 'progress' && <Progress goal={goal} entries={entries} />}
      {view === 'log' && <LogWater entries={entries} onAdd={addEntry} onDelete={deleteEntry} />}
      {view === 'goal' && <GoalForm goal={goal} onSave={setGoal} />}
    </div>
  );
}
