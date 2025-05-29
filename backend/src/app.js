// File: app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import carRoutes from "./routes/car.routes.js";
import formRoutes from "./routes/form.routes.js";
import authRoutes from "./routes/auth.routes.js"; // ✅ Admin auth routes

dotenv.config();
const app = express();

// ✅ Enable CORS
app.use(cors());

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded images
app.use("/uploads", express.static("uploads"));

// ✅ API routes
app.use("/api/cars", carRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/auth", authRoutes); // ✅ Login route for admin

export default app;
