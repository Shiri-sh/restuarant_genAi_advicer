
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import multer from "multer";
import { storage } from "../services/storage.js";
import analyzeAudio from "../controllers/analyzeAudio.js";


const router = express.Router();

const upload = multer({ storage });

router.post("/analyze-audio", upload.single("audio"),analyzeAudio );

export default router;
