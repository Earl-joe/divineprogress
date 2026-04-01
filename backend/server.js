import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv'
import studentRoutes from './routes/studentRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
// Added: ensure upload directory exists for multer (result file uploads).
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();

const uploadDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}


app.use(express.json());
// Added: serve uploaded result PDFs/images for the student portal download links.
app.use('/uploads', express.static(uploadDir))
// Added: simple CORS headers so Next.js frontend can call backend during development.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});
app.use('/api/contact', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/student', studentRoutes)


const PORT = 5001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("DB connection error:", err));

app.get('/api/status', (req, res) => {
    res.json({message: "dps web is running"})
    console.log(req.body)
});

app.listen(PORT, () => {
   console.log(`Server is running on ${PORT}`)
});