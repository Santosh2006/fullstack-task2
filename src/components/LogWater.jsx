import { useState } from 'react';

const today = () => new Date().toISOString().slice(0, 10);

export default function LogWater({ entries, onAdd, onDelete }) {
  const [date, setDate] = useState(today());
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const num = Number(amount);
    if (!date) return setError('Please choose a date.');
    if (!amount || isNaN(num) || num < 50 || num > 5000) {
      return setError('Enter an amount between 50 and 5000 ml.');
    }
    onAdd(date, num);
    setAmount('');
    setError('');
  }

  // Newest date first
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Log Water Intake</h2>
        <label>
          Date
          <input type="date" value={date} max={today()} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Amount (ml)
          <input type="number" value={amount} placeholder="e.g. 250" onChange={(e) => setAmount(e.target.value)} />
        </label>
        <button type="submit">Add</button>
        {error && <p className="error">{error}</p>}
      </form>

      <h3>Entries</h3>
      {sorted.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul>
          {sorted.map((e) => (
            <li key={e.id}>
              <span>{e.date} — {e.amount} ml</span>
              <button className="delete" onClick={() => onDelete(e.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
