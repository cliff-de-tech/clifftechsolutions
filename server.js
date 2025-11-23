import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- SCHEMA ---
const repairSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  device: { type: String, default: "General Device" }, // Default since form doesn't ask specific device yet
  issue: String,
  status: { type: String, default: "Received" }, // Received, In Progress, Ready, Completed
  date: { type: Date, default: Date.now }
});

const RepairJob = mongoose.model("RepairJob", repairSchema);

// --- ROUTES ---

// POST: Handle Contact Form (Saves to DB + Sends Email)
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    // 1. Save to Database (Map 'message' to 'issue')
    const newJob = new RepairJob({ 
      name, 
      email, 
      phone, 
      issue: message 
    });
    
    await newJob.save();

    // 2. Send Email (Optional - wraps in try/catch so DB save still works if email fails)
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      await transporter.sendMail({
        from: `"Cliff_Tech Site" <${process.env.EMAIL_USER}>`,
        to: "cliffdesignz@gmail.com",
        subject: `New Inquiry: ${name}`,
        text: `Name: ${name}\nPhone: ${phone}\nIssue: ${message}\n\n(Saved to Database ID: ${newJob._id})`
      });
    } catch (emailErr) {
      console.log("Email failed to send, but DB saved:", emailErr.message);
    }

    res.json({ success: true, message: "Inquiry saved!", jobId: newJob._id });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// GET: Check Repair Status
app.get("/api/status/:phone", async (req, res) => {
  try {
    const jobs = await RepairJob.find({ phone: req.params.phone }).sort({ date: -1 });
    res.json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, error: "Could not fetch status" });
  }
});

// Serve frontend (Catch-all)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// SECRET ADMIN ROUTE: Get all jobs
// In a real app, you would protect this with a password!
app.get("/api/admin/all-jobs", async (req, res) => {
  try {
    const jobs = await RepairJob.find().sort({ date: -1 }); // Get all jobs, newest first
    res.json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));