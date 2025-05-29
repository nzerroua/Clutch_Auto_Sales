// File: src/routes/form.routes.js

import express from "express";
import {
  submitContactForm,
  submitFinancingRequest,
  getAllContactForms,
  deleteContactForm,
  deleteAllContactForms,
  getAllFinancingRequests,
  deleteFinancingRequest,
  deleteAllFinancingRequests,
} from "../controllers/form.controller.js";
import { verifyAdmin } from "../middleware/auth.js"; // ✅ Protect sensitive routes

const router = express.Router();

// 📩 Contact Form Routes
router.post("/contact", submitContactForm);
router.get("/contact", verifyAdmin, getAllContactForms);
router.delete("/contact/:id", verifyAdmin, deleteContactForm);
router.delete("/contact", verifyAdmin, deleteAllContactForms); // 🧹 Delete all contact forms

// 💰 Financing Request Routes
router.post("/financing", submitFinancingRequest);
router.get("/financing", verifyAdmin, getAllFinancingRequests);
router.delete("/financing/:id", verifyAdmin, deleteFinancingRequest);
router.delete("/financing", verifyAdmin, deleteAllFinancingRequests); // 🧹 Delete all financing requests

export default router;
