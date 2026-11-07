const express = require("express");
const Workout = require("../models/Workout");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
router.use(requireAuth);

router.get("/", async (req, res) => {
  try { res.json(await Workout.find({ userId: req.user._id }).sort({ date: -1 })); }
  catch (error) { res.status(500).json({ message: "Could not load workouts." }); }
});

router.post("/", async (req, res) => {
  try {
    const { exercise, duration, calories, date } = req.body;
    if (!exercise || !Number.isFinite(Number(duration)) || Number(duration) <= 0 || !Number.isFinite(Number(calories)) || Number(calories) < 0) {
      return res.status(400).json({ message: "Enter a valid exercise, duration, and calorie value." });
    }
    const workout = await Workout.create({ userId: req.user._id, exercise, duration: Number(duration), calories: Number(calories), date: date || Date.now() });
    res.status(201).json(workout);
  } catch (error) { res.status(400).json({ message: "Could not save workout." }); }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Workout.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!result) return res.status(404).json({ message: "Workout not found." });
    res.json({ success: true });
  } catch (error) { res.status(400).json({ message: "Could not delete workout." }); }
});
module.exports = router;
