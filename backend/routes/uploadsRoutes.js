import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import multer from "multer";
import { storage } from "../config/cloudinaryConfig.js";
const upload = multer({ storage });

const router = express.Router();

router.post("/", protect, admin, upload.single("image"), (req, res) => {
  if (req.file.mimetype) {
    res.json(req.file.path);
  }
});

export default router;
