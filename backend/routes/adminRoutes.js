import express from "express";
import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../models/student.js"
import Contact from "../models/contact.js"
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
import path from "path";
import { STUDENT_CLASS_OPTIONS } from "../constants/classOptions.js";


const router = express.Router();

//
// 🚫 REGISTER ADMIN (ONLY ONE ALLOWED)
//


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const adminExists = await Admin.findOne({});

    if (adminExists) {
      return res.status(400).json({
        message: "Admin already exists. Only one admin account allowed.",
      });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
    });

    // 🔑 Create token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Admin created successfully",
      token, // ✅ return token here
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//
// 🔐 LOGIN ADMIN
//
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add-student", adminMiddleware, async (req, res) => {
  try {
    // Added: department from admin form (optional in DB).
    const { studentName, parentName, parentEmail, class: studentClass, password, department } =
      req.body;

      if(!studentName || !parentName || !parentEmail || !studentClass || !password){
        return res.status(401).json({ message: "pls input all fields" })
      }

    // Added: ensure class is one of the allowed school classes (matches frontend).
    if (!STUDENT_CLASS_OPTIONS.includes(studentClass)) {
      return res.status(400).json({ message: "Invalid class. Choose from the official class list." });
    }

    const student = await Student.create({
      studentName,
      parentName,
      parentEmail,
      class: studentClass,
      password,
      department: department || "",
    });

    res.status(201).json({
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//
// ❌ DELETE STUDENT (ADMIN ONLY)
//
router.delete("/delete-student/:id", adminMiddleware,async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//
// 📋 GET ALL STUDENTS (useful for admin panel)
//
router.get("/students", adminMiddleware, async (req, res) => {
  try {
    const students = await Student.find();

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Added: aggregate parents by parentEmail — one row per guardian with all linked children.
router.get("/parents", adminMiddleware, async (req, res) => {
  try {
    const students = await Student.find()
      .select("studentName parentName parentEmail class")
      .sort({ parentEmail: 1, studentName: 1 });

    const byEmail = new Map();

    for (const s of students) {
      const email = (s.parentEmail || "").toLowerCase();
      if (!email) continue;

      if (!byEmail.has(email)) {
        byEmail.set(email, {
          parentEmail: email,
          parentName: s.parentName,
          children: [],
        });
      }

      const row = byEmail.get(email);
      row.children.push({
        studentId: s._id,
        studentName: s.studentName,
        class: s.class,
      });
    }

    res.json({
      parents: Array.from(byEmail.values()),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Added: dashboard stats — real counts from MongoDB (parents = unique parent emails).
router.get("/stats", adminMiddleware, async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const parentEmails = await Student.distinct("parentEmail");
    res.json({
      totalStudents,
      totalParents: parentEmails.length,
      totalStaff: 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//
// ✏️ UPDATE STUDENT (ADMIN ONLY)
//
router.put("/edit-student/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      studentName,
      parentName,
      parentEmail,
      class: studentClass,
      password,
      department,
    } = req.body;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update fields only if provided
    if (studentName) student.studentName = studentName;
    if (parentName) student.parentName = parentName;
    if (parentEmail) student.parentEmail = parentEmail;
    if (studentClass) {
      const valid = STUDENT_CLASS_OPTIONS.includes(studentClass);
      const unchanged = studentClass === student.class;
      if (!valid && !unchanged) {
        return res.status(400).json({
          message: "Invalid class. Choose from the official class list (or keep the current value).",
        });
      }
      student.class = studentClass;
    }
    if (department !== undefined) student.department = department;

    // 🔐 If password is updated, it will be hashed automatically
    if (password) student.password = password;

    await student.save();

    res.json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/contacts", adminMiddleware, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.json({
      message: "All contact messages",
      count: messages.length,
      messages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//
// 
//
router.delete("/contact/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Contact.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add-announcement", adminMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    const admin = req.admin;

    if (!admin.announcements) {
      admin.announcements = [];
    }

    const newAnnouncement = {
      title,
      content,
    };

    admin.announcements.push(newAnnouncement);

    await admin.save();

    res.status(201).json({
      message: "Announcement added",
      announcements: admin.announcements,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Added: endpoint for frontend to fetch announcements list in admin dashboard.
router.get("/announcements", adminMiddleware, async (req, res) => {
  try {
    const admin = req.admin;
    res.json({
      message: "All announcements",
      count: admin.announcements?.length || 0,
      announcements: admin.announcements || [],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✏️ EDIT announcement
router.put("/edit/:announcementId", adminMiddleware, async (req, res) => {
  try {
    // Changed: use authenticated admin from token instead of requiring adminId in body.
    const { title, content } = req.body;
    const { announcementId } = req.params;

    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const announcement = admin.announcements.id(announcementId);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    if (title) announcement.title = title;
    if (content) announcement.content = content;

    await admin.save();

    res.json({
      message: "Announcement updated",
      announcement,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ❌ DELETE announcement
router.delete("/delete/:announcementId", adminMiddleware, async (req, res) => {
  try {
    // Changed: use authenticated admin from token instead of requiring adminId in body.
    const { announcementId } = req.params;

    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const announcement = admin.announcements.id(announcementId);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    announcement.deleteOne();

    await admin.save();

    res.json({
      message: "Announcement deleted",
      announcements: admin.announcements,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update-credentials", adminMiddleware, async (req, res) => {
  try {
    const { oldEmail, oldPassword, name, email, password } = req.body;

    // 1. Get admin from DB using ID from token
    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // 2. Verify old email
    if (admin.email !== oldEmail) {
      return res.status(400).json({ message: "Old email is incorrect" });
    }

    // 3. Verify old password
    const isMatch = await bcrypt.compare(oldPassword, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // 4. Update fields if provided
    if (name) admin.name = name;
    if (email) admin.email = email;

    // Changed: assign plain password — Admin model pre("save") hashes it once (manual hash + save would double-hash).
    if (password) {
      admin.password = password;
    }

    // 5. Save updated admin
    await admin.save();

    res.json({
      message: "Admin updated successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post(
  "/upload-file/:studentId",
  adminMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      const { studentId } = req.params;

      const student = await Student.findById(studentId);

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Changed: store a web path the frontend can use with /uploads/:file proxy.
      const fileData = {
        fileName: req.file.originalname,
        filePath: `/uploads/${path.basename(req.file.path)}`,
      };

      student.files.push(fileData);

      await student.save();

      res.json({
        message: "File uploaded and sent to student",
        file: fileData,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);








// Added: list school-wide timetables (same documents students see).
router.get("/timetables", adminMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    res.json({ timetables: admin?.timetables || [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Added: upload a timetable file — stored on admin and visible to every student.
router.post("/upload-timetable", adminMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (!admin.timetables) admin.timetables = [];

    const title =
      (req.body.title && String(req.body.title).trim()) || "School timetable";

    admin.timetables.push({
      title,
      fileName: req.file.originalname,
      filePath: `/uploads/${path.basename(req.file.path)}`,
    });

    await admin.save();

    res.status(201).json({
      message: "Timetable uploaded for all students",
      timetables: admin.timetables,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;