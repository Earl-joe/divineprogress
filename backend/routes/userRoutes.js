import express from "express";
// Changed: fixed filename case to match existing model file on disk.
import Contact from "../models/contact.js";

const router = express.Router();

router.post("/addmsg", async (req, res) => {
  try {
    // Changed: accept frontend-friendly keys and map to Contact model fields.
    const { fullName, name, email, phoneNumber, phone, message } = req.body;
    const resolvedName = fullName || name;
    const resolvedPhone = phoneNumber || phone;

    if (!resolvedName || !email || !message) {
      return res.status(400).json({ message: "pls enter all fields" });
    }

    const contact = await Contact.create({
      name: resolvedName,
      email,
      // Added: keep phone in payload for UI even if optional.
      phone: resolvedPhone,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
