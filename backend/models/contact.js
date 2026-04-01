import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  // Added: optional phone field for contact form submissions.
  phone: String,
  message: String,
}, { timestamps: true });

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;