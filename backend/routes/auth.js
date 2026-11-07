const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000
};
const secret = () => process.env.JWT_SECRET || "local-fithealth-dev-secret-change-me";
const createToken = (userId) => jwt.sign({ userId }, secret(), { expiresIn: "7d" });
const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email });

router.post("/register", async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email, and password are required." });
    if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters." });
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: "Enter a valid email address." });
    if (await User.findOne({ email })) return res.status(409).json({ message: "An account with this email already exists." });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });
    res.cookie("fithealth_token", createToken(user._id), cookieOptions);
    return res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "An account with this email already exists." });
    return res.status(500).json({ message: "Could not create your account." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Email or password is incorrect." });
    }
    res.cookie("fithealth_token", createToken(user._id), cookieOptions);
    return res.json({ user: publicUser(user) });
  } catch (error) {
    return res.status(500).json({ message: "Could not log in. Please try again." });
  }
});

router.get("/me", requireAuth, (req, res) => res.json({ user: publicUser(req.user) }));
router.post("/logout", (req, res) => {
  res.clearCookie("fithealth_token", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
  res.json({ message: "Logged out successfully." });
});

module.exports = router;
