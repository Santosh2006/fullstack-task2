export default function Progress({ goal, entries }) {
  const today = new Date().toISOString().slice(0, 10);
  const total = entries.filter((e) => e.date === today).reduce((sum, e) => sum + e.amount, 0);
  const percent = Math.min(Math.round((total / goal) * 100), 100);
  const remaining = Math.max(goal - total, 0);

  return (
    <div>
      <h2>Today's Progress</h2>
      <p>{total} ml of {goal} ml ({percent}%)</p>
      <div className="bar">
        <div className="fill" style={{ width: `${percent}%` }} />
      </div>
      <p>{remaining > 0 ? `${remaining} ml left to reach your goal.` : 'Goal reached! Good job!'}</p>
    </div>
  );
}
