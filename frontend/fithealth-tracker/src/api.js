const API_BASE = "http://localhost:8080/api";
const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...options,
    headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed. Please try again.");
  return data;
};

export const register = (data) => request("/auth/register", { method: "POST", body: JSON.stringify(data) });
export const login = (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data) });
export const getCurrentUser = () => request("/auth/me");
export const logout = () => request("/auth/logout", { method: "POST" });
export const getProfile = () => request("/profile");
export const saveProfile = (data) => request("/profile", { method: "POST", body: JSON.stringify(data) });
export const getWorkouts = () => request("/workouts");
export const addWorkout = (data) => request("/workouts", { method: "POST", body: JSON.stringify(data) });
export const deleteWorkout = (id) => request(`/workouts/${id}`, { method: "DELETE" });
