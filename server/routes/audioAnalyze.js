
import express from "express";
import fs from "fs";
import dotenv from "dotenv";
import path from "path"; 
import prompt from "../services/prompt.js";
import multer from "multer";
import { storage } from "../services/storage.js";
import {GoogleGenAI} from '@google/genai';
import { convertToMp3, fileToGenerativePart } from "../services/fileActions.js";

dotenv.config();

const router = express.Router();

const upload = multer({ storage });

const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

router.post("/analyze-audio", upload.single("audio"), async (req, res) => {
    
    let convertedFilePath = null;
    const originalFilePath = req.file ? req.file.path : null;
    
    try {
        console.log("--- Request Received ---");
        
        if (!req.file) {
            console.error("Multer failed to provide req.file. Check client FormData and field name.");
            return res.status(400).json({ error: "Audio file is required or upload failed." });
        }

        console.log(`File uploaded successfully to: ${originalFilePath}`);

        const originalDir = path.dirname(originalFilePath);
        const originalName = path.basename(originalFilePath, path.extname(originalFilePath));
        convertedFilePath = path.join(originalDir, `${originalName}.mp3`);
        
        await convertToMp3(originalFilePath, convertedFilePath);

        const audioPart = fileToGenerativePart(convertedFilePath, "audio/mp3"); 
        const contents = [{ text: prompt }, audioPart];

        console.log("contents:", contents);

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
        });

        console.log(result.text);

        res.json({
          success: true,
          analysis: result.text,
        });
    
    } catch (err) {
        console.error("Audio analysis or internal server error:", err);
        if (originalFilePath && fs.existsSync(originalFilePath)) fs.unlinkSync(originalFilePath);
        if (convertedFilePath && fs.existsSync(convertedFilePath)) fs.unlinkSync(convertedFilePath);
    
        res.status(500).json({ error: "Server error during analysis or conversion" });
    }
});

export default router;
