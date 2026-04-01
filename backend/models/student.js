import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Added: explicit subdocument schema so each file has a stable _id for student delete API.
const studentFileSchema = new mongoose.Schema(
  {
    fileName: String,
    filePath: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const studentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    parentName: {
      type: String,
      required: true,
      trim: true,
    },

    parentEmail: {
      type: String,
      required: true,
      lowercase: true,
    },
    files: [studentFileSchema],

    // Added: timetable entries hidden from this student's view only (does not delete school-wide files).
    hiddenTimetableIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],

    // Class / stream: e.g. "Primary 2", "JSS 1", "SS2 Science" (see constants/classOptions.js).
    class: {
      type: String,
      required: true,
    },

    // Legacy: optional; SS streams are now encoded in `class` (SS1 Art, etc.).
    department: {
      type: String,
      trim: true,
      default: "",
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Student = mongoose.model("Student", studentSchema);

export default Student;