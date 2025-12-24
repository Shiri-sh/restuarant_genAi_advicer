
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import prompt from "./prompt.js";
import { GoogleGenAI } from '@google/genai';
import { convertToMp3, fileToGenerativePart } from "./fileActions.js";
import { getDishes } from "../models/dishesModel.js";

dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

const prepareAudioforGenAI = async (file) => {
    let convertedFilePath = null;
    let originalFilePath = file.path;
    try {
        const originalDir = path.dirname(originalFilePath);
        const originalName = path.basename(originalFilePath, path.extname(originalFilePath));
        convertedFilePath = path.join(originalDir, `${originalName}.mp3`);

        await convertToMp3(originalFilePath, convertedFilePath);
        return {audioPart: fileToGenerativePart(convertedFilePath, "audio/mp3"),originalFilePath:originalFilePath,convertedFilePath:convertedFilePath};

    } catch (error) {
        if (originalFilePath && fs.existsSync(originalFilePath)) fs.unlinkSync(originalFilePath);
        if (convertedFilePath && fs.existsSync(convertedFilePath)) fs.unlinkSync(convertedFilePath);
        console.error("Error in prepareAudioforGenAI:");
        throw error;
    }
}
const prepareDataforGenAI = async () => {
    try{
    const dishes = await getDishes();
    console.log("dishes",dishes);
    return dishes.map(dish => {
        return `name: ${dish.name},
             ingredients: ${dish.ingredients}, 
             price: ${dish.price},
             image_url: ${dish.image_url},
             category_name: ${dish.category_name},
             is_vegan: ${dish.is_vegan},
             is_vegetarian: ${dish.is_vegetarian},
             on_sale: ${dish.on_sale},
             sale_price: ${dish.sale_price},
             created_at: ${dish.created_at},`;

    }).join("\n");
    } catch (error) {
        console.error("Error in prepareDataforGenAI:");
        throw error;
    }
}

const getResponseFromGenAI = async (audioPart, dishesInfo) => {
    try {
        const contents = [{ text: prompt }, { text: dishesInfo }, audioPart];
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
        });
        console.log("GenAI result:", result);
        return JSON.parse(result.text);
    } catch (error) {
        console.error("Error in getResponseFromGenAI:");
        throw error;
    }
}
export { getResponseFromGenAI, prepareAudioforGenAI, prepareDataforGenAI };