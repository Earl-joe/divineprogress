import express from "express";
import mongoose from "mongoose";
import Admin from "../models/admin.js";
// Added: missing imports required by existing routes.
import Student from "../models/student.js";
import jwt from "jsonwebtoken";
import { studentMiddleware } from "../middleware/studentMiddleware.js";

const router = express.Router();

router.get("/announcements", studentMiddleware, async (req, res) => {
  try {
    // Since you only allow ONE admin
    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      message: "All announcements",
      count: admin.announcements.length,
      announcements: admin.announcements,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Added: school-wide timetables (from the single admin document).
router.get("/timetables", studentMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findOne();
    if (!admin) {
      return res.json({ timetables: [] });
    }

    const student = await Student.findById(req.student.id).select("hiddenTimetableIds");
    const hidden = new Set(
      (student?.hiddenTimetableIds || []).map((id) => id.toString())
    );

    const all = admin.timetables || [];
    const timetables = all.filter((t) => t._id && !hidden.has(t._id.toString()));

    res.json({ timetables });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Added: hide a school timetable from this student's view only (does not remove it for others).
router.delete("/timetable/:timetableId", studentMiddleware, async (req, res) => {
  try {
    const { timetableId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(timetableId)) {
      return res.status(400).json({ message: "Invalid timetable id" });
    }

    const oid = new mongoose.Types.ObjectId(timetableId);

    await Student.findByIdAndUpdate(req.student.id, {
      $addToSet: { hiddenTimetableIds: oid },
    });

    res.json({ message: "Timetable removed from your list" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/results", studentMiddleware, async (req, res) => {
  try {
    // Changed: never return password hash in API responses.
    const student = await Student.findById(req.student.id).select("files studentName class");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      files: student.files,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Added: remove one result file from this student's record (student-initiated).
router.delete("/file/:fileId", studentMiddleware, async (req, res) => {
  try {
    const { fileId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({ message: "Invalid file id" });
    }

    const student = await Student.findById(req.student.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const sub = student.files.id(fileId);
    if (!sub) {
      return res.status(404).json({ message: "File not found" });
    }

    sub.deleteOne();
    await student.save();

    res.json({
      message: "File removed from your account",
      files: student.files,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { parentEmail, password } = req.body;

    // Changed: normalize email so login matches lowercase storage in MongoDB.
    const emailKey = typeof parentEmail === "string" ? parentEmail.trim().toLowerCase() : "";

    // 1. Find student using parentEmail (your identifier)
    const student = await Student.findOne({ parentEmail: emailKey });

    if (!student) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Check password
    const isMatch = await student.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Create token
    const token = jwt.sign(
      {
        id: student._id,
        role: "student",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      student: {
        id: student._id,
        studentName: student.studentName,
        parentEmail: student.parentEmail,
        class: student.class,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;