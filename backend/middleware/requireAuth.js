const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.fithealth_token;
    if (!token) return res.status(401).json({ message: "Please log in to continue." });
    const payload = jwt.verify(token, process.env.JWT_SECRET || "local-fithealth-dev-secret-change-me");
    const user = await User.findById(payload.userId).select("name email");
    if (!user) return res.status(401).json({ message: "Account not found. Please log in again." });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Your session expired. Please log in again." });
  }
};

module.exports = requireAuth;
