import { useState } from "react";
import { login, register } from "../api";

export default function AuthForm({ onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault(); setError(""); setBusy(true);
    try {
      const result = mode === "login" ? await login({ email: form.email, password: form.password }) : await register(form);
      onAuthenticated(result.user);
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };
  return <main className="auth-shell">
    <section className="auth-card">
      <div className="brand-mark">FH</div>
      <p className="eyebrow">YOUR PERSONAL WELLNESS SPACE</p>
      <h1>FitHealth Tracker</h1>
      <p className="auth-subtitle">Build healthy habits, one day at a time.</p>
      <div className="auth-tabs"><button className={mode === "login" ? "active" : ""} type="button" onClick={() => { setMode("login"); setError(""); }}>Log in</button><button className={mode === "register" ? "active" : ""} type="button" onClick={() => { setMode("register"); setError(""); }}>Create account</button></div>
      <form onSubmit={submit} className="auth-form">
        {mode === "register" && <label>Full name<input name="name" autoComplete="name" value={form.name} onChange={change} required maxLength={80} placeholder="Your name" /></label>}
        <label>Email address<input name="email" type="email" autoComplete="email" value={form.email} onChange={change} required placeholder="you@example.com" /></label>
        <label>Password<input name="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} value={form.password} onChange={change} required minLength={8} placeholder="At least 8 characters" /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="auth-submit" disabled={busy} type="submit">{busy ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}</button>
      </form>
      <p className="auth-footnote">Your profile and activity are private to your account.</p>
    </section>
  </main>;
}
