// File: src/routes/auth.routes.js

import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// 🔐 Admin login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });

  res.json({ token });
});

export default router;
