// File: src/routes/car.routes.js
import express from "express";
import multer from "multer";
import {
  getCars,
  addCar,
  updateCar,
  deleteCar,
} from "../controllers/car.controller.js";
import { PrismaClient } from "@prisma/client";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

// ✅ Multer config for in-memory image uploads (for Supabase)
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Public route: Get all cars with filters and pagination
router.get("/", getCars);

// ✅ Admin-only: Add new car
router.post("/", verifyAdmin, upload.array("images", 10), addCar);

// ✅ Admin-only: Update car
router.put("/:id", verifyAdmin, upload.array("images", 10), updateCar);

// ✅ Admin-only: Delete a car
router.delete("/:id", verifyAdmin, deleteCar);

// ✅ Public route: Get filter options
router.get("/filters", async (req, res) => {
  const { make } = req.query;

  const normalize = (s) =>
    s && typeof s === "string" ? s.trim().toLowerCase() : "";

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;

  try {
    const [makesRaw, stylesRaw, modelsRaw] = await Promise.all([
      prisma.car.findMany({ distinct: ["make"], select: { make: true } }),
      prisma.car.findMany({ distinct: ["style"], select: { style: true } }),
      prisma.car.findMany({
        where: make ? { make: { equals: make, mode: "insensitive" } } : {},
        distinct: ["model"],
        select: { model: true },
      }),
    ]);

    const makes = [
      ...new Set(makesRaw.map((item) => normalize(item.make))),
    ].map(capitalize);

    const styles = [
      ...new Set(stylesRaw.map((item) => normalize(item.style))),
    ].map(capitalize);

    const models = [
      ...new Set(modelsRaw.map((item) => normalize(item.model))),
    ].map(capitalize);

    res.json({ makes, models, styles });
  } catch (err) {
    console.error("Error fetching filter options:", err);
    res.status(500).json({ error: "Failed to fetch filter options" });
  }
});

// ✅ Public route: Get single car by ID
router.get("/:id", async (req, res) => {
  try {
    const car = await prisma.car.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(car);
  } catch (err) {
    console.error("Error fetching car:", err);
    res.status(500).json({ error: "Failed to fetch car" });
  }
});

export default router;
