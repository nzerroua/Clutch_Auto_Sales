// File: src/middleware/auth.js

import jwt from "jsonwebtoken";

// ✅ Middleware to verify admin JWT token
export const verifyAdmin = (req, res, next) => {
  // 🔐 Get the Authorization header from the request
  const authHeader = req.headers.authorization;

  // ❌ If header is missing or does not start with "Bearer", reject the request
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  // 🧩 Extract the token part after "Bearer"
  const token = authHeader.split(" ")[1];

  try {
    // ✅ Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 💾 Attach decoded data (e.g., email) to request object for later use
    req.admin = decoded;

    // ✅ Continue to the next middleware or route handler
    next();
  } catch (err) {
    // ❌ Token is invalid or expired
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
