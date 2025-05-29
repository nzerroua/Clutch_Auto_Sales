// File: src/controllers/form.controller.js

import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../utils/mailer.js";

const prisma = new PrismaClient();

// 📩 Submit Contact Form
export const submitContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const form = await prisma.contactForm.create({
      data: { firstName, lastName, email, phone, message },
    });

    // ✅ Email Notification
    await sendEmail({
      to: process.env.EMAIL_TO,
      subject: "New Contact Form Submission",
      text: `
New contact form submitted:

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || "N/A"}

Message:
${message || "No message provided."}
      `,
    });

    res.status(201).json(form);
  } catch (err) {
    console.error("Error submitting contact form:", err);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
};

// 💰 Submit Financing Request
export const submitFinancingRequest = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const request = await prisma.financingRequest.create({
      data: { firstName, lastName, email, phone, message },
    });

    // ✅ Email Notification
    await sendEmail({
      to: process.env.EMAIL_TO,
      subject: "New Financing Request",
      text: `
New financing request submitted:

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || "N/A"}

Message:
${message || "No message provided."}
      `,
    });

    res.status(201).json(request);
  } catch (err) {
    console.error("Error submitting financing request:", err);
    res.status(500).json({ error: "Failed to submit financing request" });
  }
};

// 📥 Get All Contact Forms
export const getAllContactForms = async (req, res) => {
  try {
    const forms = await prisma.contactForm.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(forms);
  } catch (err) {
    console.error("Error fetching contact forms:", err);
    res.status(500).json({ error: "Failed to fetch contact forms" });
  }
};

// 🗑️ Delete Contact Form by ID
export const deleteContactForm = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.contactForm.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Contact form deleted successfully." });
  } catch (err) {
    console.error("Error deleting contact form:", err);
    res.status(500).json({ error: "Failed to delete contact form" });
  }
};

// 🧹 Delete All Contact Forms
export const deleteAllContactForms = async (req, res) => {
  try {
    await prisma.contactForm.deleteMany();
    res.json({ message: "All contact forms deleted." });
  } catch (err) {
    console.error("Error deleting all contact forms:", err);
    res.status(500).json({ error: "Failed to delete all contact forms" });
  }
};

// 📥 Get All Financing Requests
export const getAllFinancingRequests = async (req, res) => {
  try {
    const requests = await prisma.financingRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(requests);
  } catch (err) {
    console.error("Error fetching financing requests:", err);
    res.status(500).json({ error: "Failed to fetch financing requests" });
  }
};

// 🗑️ Delete Financing Request by ID
export const deleteFinancingRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.financingRequest.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Financing request deleted successfully." });
  } catch (err) {
    console.error("Error deleting financing request:", err);
    res.status(500).json({ error: "Failed to delete financing request" });
  }
};

// 🧹 Delete All Financing Requests
export const deleteAllFinancingRequests = async (req, res) => {
  try {
    await prisma.financingRequest.deleteMany();
    res.json({ message: "All financing requests deleted." });
  } catch (err) {
    console.error("Error deleting all financing requests:", err);
    res.status(500).json({ error: "Failed to delete all financing requests" });
  }
};
