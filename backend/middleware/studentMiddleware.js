import jwt from "jsonwebtoken";
import Student from "../models/student.js";

export const studentMiddleware = async (req, res, next) => {
  let token;

  try {
    // Get token from headers
    token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find student
    const student = await Student.findById(decoded.id).select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Attach student to request
    req.student = student;

    next();
  } catch {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};