
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from '@google/genai';
import { getResponseFromGenAI, prepareAudioforGenAI, prepareDataforGenAI } from "../services/analyzeAudioServices.js";

dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });
const analyzeAudio = async (req, res) => {
  let originalFilePath = null;
  let convertedFilePath = null;
  try {
    const file = req.file;

    if (!file) {
      console.error("Multer failed to provide req.file. Check client FormData and field name.");
      return res.status(400).json({ error: "Audio file is required or upload failed." });
    }
    const { audioPart, originalFilePath: orig, convertedFilePath: conv } = await prepareAudioforGenAI(file);
    originalFilePath = orig;
    convertedFilePath = conv;
    const dishesInfo = await prepareDataforGenAI();
    const result = await getResponseFromGenAI(audioPart, dishesInfo);

    res.status(200).json({ success: true, response: result });
  } catch (error) {
    console.error(error);
    if (req.file.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: "An error occurred while processing the request. please try again later" });
  }
  finally {
    [originalFilePath, convertedFilePath].forEach(f => {
      if (f && fs.existsSync(f)) {
        try {
          fs.unlinkSync(f);
        } catch (e) {
          console.error("Failed to delete file:", f, e);
        }
      }
    });
  }
};


export default analyzeAudio