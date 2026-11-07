const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const workoutRoutes = require("./routes/workouts");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Keep the original local MongoDB connection unchanged.
 mongoose.connect("mongodb://127.0.0.1:27017/fithealth")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => { console.error("MongoDB connection failed:", error.message); process.exit(1); });

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/workouts", workoutRoutes);

app.listen(8080, () => console.log("Server running on http://localhost:8080"));
