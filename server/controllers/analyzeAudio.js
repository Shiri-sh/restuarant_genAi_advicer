
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import fs from "fs";
import dotenv from "dotenv";
import path from "path"; 
import prompt from "../services/prompt.js";
import {GoogleGenAI} from '@google/genai';
import { convertToMp3, fileToGenerativePart } from "../services/fileActions.js";
import {getDishes} from "../models/dishesModel.js";

dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });
const analyzeAudio =  async (req, res) => {
    
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
            return `name: ${dish.name},
             ingredients: ${dish.ingredients}, 
             price: ${dish.price},
             image_url: ${dish.image_url},
             category_id: ${dish.category_id},
             is_vegan: ${dish.is_vegan},
             is_vegetarian: ${dish.is_vegetarian},
             on_sale: ${dish.on_sale},
             sale_price: ${dish.sale_price},
             created_at: ${dish.created_at},`;
             
        }).join("\n");

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

    }

export default analyzeAudio