const express = require("express");
const Profile = require("../models/Profile");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
router.use(requireAuth);

router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id });
    res.json(profile || {});
  } catch (error) { res.status(500).json({ message: "Could not load profile." }); }
});

router.post("/", async (req, res) => {
  try {
    const allowed = ["name", "age", "gender", "height", "weight", "goal"];
    const values = Object.fromEntries(allowed.filter((key) => key in req.body).map((key) => [key, req.body[key]]));
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user._id },
      { $set: values, $setOnInsert: { userId: req.user._id } },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(profile);
  } catch (error) { res.status(400).json({ message: "Could not save profile." }); }
});
module.exports = router;
