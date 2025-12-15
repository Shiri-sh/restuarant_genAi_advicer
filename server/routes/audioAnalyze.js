
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import fs from "fs";
import dotenv from "dotenv";
import path from "path"; 
import prompt from "../services/prompt.js";
import multer from "multer";
import { storage } from "../services/storage.js";
import {GoogleGenAI} from '@google/genai';
import { convertToMp3, fileToGenerativePart } from "../services/fileActions.js";
import {getDishes} from "../models/dishesModel.js";

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
        const dishes = await getDishes();

        const dishesInfo = dishes.map(dish => {
            return `Name: ${dish.name}, Ingredients: ${dish.ingredients}, Price: ${dish.price}, Category ID: ${dish.category_id}, Is Vegan: ${dish.is_vegan}, Is Vegetarian: ${dish.is_vegetarian}, On Sale: ${dish.on_sale}, Sale Price: ${dish.sale_price}`;
        }).join("\n");
        console.log("dishInfo", dishesInfo);

        const contents = [{ text: prompt },{ text: dishesInfo }, audioPart];
    
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
        });
        let parsed;

try {
  parsed = JSON.parse(result.text);
} catch (e) {
  console.error("AI returned invalid JSON:", result.text);
  return res.status(500).json({ error: "AI response format error" });
}

res.json({
  success: true,
  recommended_dishes: parsed.recommended_dishes
});
    
    } catch (err) {
        console.error('Full error stack:', err.stack || err, 'code:', err.code || null);
        if (originalFilePath && fs.existsSync(originalFilePath)) fs.unlinkSync(originalFilePath);
        if (convertedFilePath && fs.existsSync(convertedFilePath)) fs.unlinkSync(convertedFilePath);
    
        res.status(500).json({ error: "Server error during analysis or conversion" });
    }
});

export default router;
