import { useState, useEffect, useCallback } from "react";
import ProfileForm from "./components/ProfileForm";
import WorkoutForm from "./components/WorkoutForm";
import HistoryTable from "./components/HistoryTable";
import WeekChart from "./components/WeekChart";
import AuthForm from "./components/AuthForm";
import { getCurrentUser, getProfile, getWorkouts, deleteWorkout, logout } from "./api";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [workouts, setWorkouts] = useState([]);
  const [checking, setChecking] = useState(true);
  const [loadError, setLoadError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      const [profileData, workoutData] = await Promise.all([getProfile(), getWorkouts()]);
      setProfile(profileData || {}); setWorkouts(workoutData || []); setLoadError("");
    } catch (error) { setLoadError(error.message); }
  }, []);

  useEffect(() => {
    getCurrentUser().then(({ user: current }) => setUser(current)).catch(() => setUser(null)).finally(() => setChecking(false));
  }, []);
  useEffect(() => { if (user) loadDashboard(); }, [user, loadDashboard]);

  const refreshWorkouts = async () => {
    try { setWorkouts(await getWorkouts()); } catch (error) { setLoadError(error.message); }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Delete this workout?")) {
      try { await deleteWorkout(id); await refreshWorkouts(); } catch (error) { setLoadError(error.message); }
    }
  };
  const handleLogout = async () => {
    try { await logout(); } finally { setUser(null); setProfile({}); setWorkouts([]); }
  };

  if (checking) return <div className="loading-screen">Loading FitHealth…</div>;
  if (!user) return <AuthForm onAuthenticated={setUser} />;

  return <div className="app-page">
    <header className="topbar"><div className="topbar-brand"><span className="brand-mark small">FH</span><span>FitHealth <strong>Tracker</strong></span></div><div className="topbar-user"><span>Welcome, {user.name}</span><button className="logout-button" onClick={handleLogout}>Log out</button></div></header>
    <main className="container">
      <div className="page-intro"><p className="eyebrow">YOUR HEALTH, IN FOCUS</p><h1>Fitness dashboard</h1><p>Track workouts, understand your activity, and celebrate your progress.</p></div>
      {loadError && <div className="notice" role="alert">{loadError}</div>}
      <section className="card"><div className="section-heading"><div><p className="eyebrow">PERSONAL DETAILS</p><h2>Your profile</h2></div></div><ProfileForm profile={profile} setProfile={setProfile} /></section>
      <section className="card"><div className="section-heading"><div><p className="eyebrow">DAILY MOVEMENT</p><h2>Log a workout</h2></div></div><WorkoutForm profile={profile} refreshWorkouts={refreshWorkouts} /></section>
      <section className="card"><div className="section-heading"><div><p className="eyebrow">YOUR ACTIVITY</p><h2>Workout history</h2></div></div><HistoryTable profile={profile} workouts={workouts} onDelete={handleDelete} /></section>
      <WeekChart workouts={workouts} />
      <footer className="app-footer">Small steps add up. Keep showing up for yourself.</footer>
    </main>
  </div>;
}
