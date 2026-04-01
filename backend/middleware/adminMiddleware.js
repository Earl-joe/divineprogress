import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

export const adminMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Get admin from DB (THIS IS THE FIX)
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Optional: check role
    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    req.admin = admin; // ✅ REAL mongoose document

    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};