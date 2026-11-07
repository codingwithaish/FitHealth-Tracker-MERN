const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  exercise: { type: String, required: true },
  duration: { type: Number, required: true, min: 1 },
  calories: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Workout", workoutSchema);
