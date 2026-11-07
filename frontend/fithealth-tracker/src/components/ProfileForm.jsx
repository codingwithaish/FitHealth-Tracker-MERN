import { useState, useEffect } from "react";
import { saveProfile } from "../api";

export default function ProfileForm({ profile, setProfile }) {
  const [form, setForm] = useState({});

  // Initialize form with profile data
  useEffect(() => { 
    setForm(profile || {});
  }, [profile]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  //prevents page reload
    const saved = await saveProfile(form);
    setProfile(saved);
    alert("Profile saved!");
  };

  return (
    <form onSubmit={handleSubmit} className="grid-2">
      <label>
        Name
        <input name="name" value={form.name || ""} onChange={handleChange} />
      </label>
      <label>
        Age
        <input type="number" name="age" value={form.age || ""} onChange={handleChange}/>
      </label>
      <label>
        Gender
        <select name="gender" value={form.gender || ""} onChange={handleChange}>
          <option value="">Select</option>
          <option>Female</option>
          <option>Male</option>
        </select>
      </label>
      <label>
        Height (cm)
        <input type="number" name="height" value={form.height || ""} onChange={handleChange} />
      </label>
      <label>
        Weight (kg)
        <input type="number" name="weight" value={form.weight || ""} onChange={handleChange}/>
      </label>
      <label>
        Daily Goal (kcal)
        <input type="number" name="goal" value={form.goal || ""} onChange={handleChange}/>
      </label>
      <div className="actions">
        <button type="submit">Save Profile</button>
      </div>
    </form>
  );
}
