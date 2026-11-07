import { useState } from "react";
import { addWorkout } from "../api";
import { METS } from "../utils/METS";

export default function WorkoutForm({ profile, refreshWorkouts }) {
  const [form, setForm] = useState({ exercise: "", duration: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const bmi = (profile.weight / ((profile.height / 100) ** 2)).toFixed(1);
  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    if (bmi < 35) return "Obese (Class I)";
    if (bmi < 40) return "Obese (Class II)";
    return "Obese (Class III)";
  };

  const getBMIColor = (bmi) => {
    if (bmi < 18.5) return "blue";          // Underweight
    if (bmi < 25) return "green";          // Normal
    if (bmi < 30) return "orange";         // Overweight
    if (bmi < 35) return "orangered";      // Obese I
    if (bmi < 40) return "red";            // Obese II
    return "darkred";                      // Obese III
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.exercise || !form.duration) return alert("Fill all fields");

    const met = METS[form.exercise] || 1; // Default to 1 if exercise not found
    const durationHours = form.duration / 60;
    const calories = Math.round(met * durationHours * profile.weight); 
    
    await addWorkout({ ...form, calories,date: new Date() });
    setForm({ exercise: "", duration: "" });
    refreshWorkouts();
  };

  return (
    <div>
      <h3>BMI: {bmi}</h3>
      <h3>Status: <span style={{color: getBMIColor(bmi)}}>{getBMIStatus(bmi)}</span></h3><br/>
    <form onSubmit={handleSubmit} className="grid-2">
      <label>
        Exercise
        <select name="exercise" value={form.exercise} onChange={handleChange}>
          <option value="">Select an exercise</option>
          {Object.keys(METS).map((exercise) => (
            <option key={exercise} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
      </label>
      <label>
        Duration (minutes)
        <input type="number" name="duration" value={form.duration} onChange={handleChange}/>
      </label>
      <div className="actions">
        <button type="submit">Add Workout</button>
      </div>
    </form>
    </div>
  );
}
