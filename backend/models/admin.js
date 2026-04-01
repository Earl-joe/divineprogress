// models/Admin.js

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Added: school-wide timetable files (visible to all students, like announcements).
const timetableEntrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "School timetable",
    },
    fileName: String,
    filePath: String,
  },
  { timestamps: true }
);

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "admin",
    },

    announcements: [announcementSchema],
    timetables: [timetableEntrySchema],
  },
  { timestamps: true }
);

// 🔐 Hash password
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔍 Compare password
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;