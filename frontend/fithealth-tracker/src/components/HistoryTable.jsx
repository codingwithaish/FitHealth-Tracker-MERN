export default function HistoryTable({ profile, workouts, onDelete }) {
  if (!workouts || workouts.length === 0) return <p>No workouts yet.</p>;
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  const remainingCalories = profile.goal - totalCalories;
  return (
    <div>
      <center>
      {remainingCalories <= 0 ? (
        <h3 className="blink">Wohoo!! You reached your goal 🎉 and burnt {Math.abs(remainingCalories)} calories more !!! </h3>
      ) : (
        <h3>Target calories remaining: {remainingCalories}</h3>
      )}  </center>
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Duration</th>
            <th>Calories</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((w, i) => (
            <tr key={i}>
              <td>{w.exercise}</td>
              <td>{w.duration} min</td>
              <td>{w.calories}</td>
              <td>{new Date(w.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => onDelete(w._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
