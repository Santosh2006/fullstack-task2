import { useState } from 'react';

export default function GoalForm({ goal, onSave }) {
  const [value, setValue] = useState(goal);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const num = Number(value);
    if (!value || isNaN(num) || num < 500 || num > 10000) {
      setError('Enter a goal between 500 and 10000 ml.');
      setSaved(false);
      return;
    }
    onSave(num);
    setError('');
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Set Daily Goal</h2>
      <label>
        Daily goal (ml)
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
      </label>
      <button type="submit">Save Goal</button>
      {error && <p className="error">{error}</p>}
      {saved && <p className="success">Goal saved: {goal} ml</p>}
    </form>
  );
}
