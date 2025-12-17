
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import fs from "fs";
import dotenv from "dotenv";
import path from "path"; 
import prompt from "../services/prompt.js";
import {GoogleGenAI} from '@google/genai';
import { convertToMp3, fileToGenerativePart } from "../services/fileActions.js";
import {getDishes} from "../models/dishesModel.js";
import { getResponseFromGenAI, prepareAudioforGenAI, prepareDataforGenAI } from "../services/analyzeAudioServices.js";

dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });
const analyzeAudio =  async (req, res) => {
    try {
      const file = req.file;

      if (!file) {
        console.error("Multer failed to provide req.file. Check client FormData and field name.");
        return res.status(400).json({ error: "Audio file is required or upload failed." });
      }

      const audioPart = await prepareAudioforGenAI(file);
      const dishesInfo = await prepareDataforGenAI();
      const result = await getResponseFromGenAI(audioPart, dishesInfo);
      
      res.status(200).json({ success: true, recommended_dishes: result.recommended_dishes });
    } catch (error) {
        console.error(error);
        if (req.file.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(500).json({ error: "An error occurred while processing the request." });
    }
};


export default analyzeAudio