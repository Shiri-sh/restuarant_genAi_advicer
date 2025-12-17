import path from "path";
import {prepareAudioforGenAI, prepareDataforGenAI, getResponseFromGenAI} from "../services/analyzeAudioServices.js";

//תלויות-חיצוניות-לעשות-עליהן-mock
import { convertToMp3, fileToGenerativePart } from "../services/fileActions.js";
import { getDishes } from "../models/dishesModel.js";
import { GoogleGenAI } from "@google/genai";
//כל-התלויות-שרצות-באמת-המטרה-היא-לעשות-להן--mock-
//כדי-שלא-ירצו-באמת
jest.mock("fs");
jest.mock("path", () => jest.requireActual("path"));
jest.mock("../services/fileActions.js", () => ({
  convertToMp3: jest.fn(),
  fileToGenerativePart: jest.fn()
}));
jest.mock("../models/dishesModel.js", () => ({
  getDishes: jest.fn()
}));
jest.mock("@google/genai", () => {
  return {
    GoogleGenAI: jest.fn().mockImplementation(() => ({
      models: {
        generateContent: jest.fn()
      }
    }))
  };
});


describe("prepareAudioforGenAI", () => {

  it("converts audio to mp3 and returns generative part", async () => {
   //דימוי-קובץ-מזויף
    const file = { path: "/tmp/test.wav" };

    // כאילו-שההמרה-הצליחה
    convertToMp3.mockResolvedValue();

    //מגדירים-ערך-מזויף-שג'מיני-מצפה
    fileToGenerativePart.mockReturnValue({ mock: "audioPart" });

    const result = await prepareAudioforGenAI(file);

    //בדיקת-חישוב-נתיב-נכון
    expect(convertToMp3).toHaveBeenCalledWith(
      "/tmp/test.wav",
      path.join("/tmp", "test.mp3")
    );

    // בדיקת-אודיו-בפורמט-הנכון
    expect(fileToGenerativePart).toHaveBeenCalledWith(
      path.join("/tmp", "test.mp3"),
      "audio/mp3"
    );

    // בודקים שהפונקציה מחזירה את מה שהתלות החזירה
    expect(result).toEqual({ mock: "audioPart" });
  });

  it("throws error when conversion fails", async () => {
    const file = { path: "/tmp/test.wav" };

    // מדמים כשל בהמרת הקובץ
    convertToMp3.mockRejectedValue(new Error("Conversion failed"));

    // בודקים שהשגיאה אכן נזרקת החוצה
    await expect(prepareAudioforGenAI(file))
      .rejects
      .toThrow("Conversion failed");
  });

});

describe("prepareDataforGenAI", () => {

  it("returns formatted dishes data as string", async () => {
    //נכניס-נתונים-מזויפים-במקום-המסד-נתונים
    getDishes.mockResolvedValue([
      {
        name: "Pizza",
        ingredients: "Cheese",
        price: 60,
        image_url: "pizza.jpg",
        category_id: 2,
        is_vegan: false,
        is_vegetarian: true,
        on_sale: false,
        sale_price: null,
        created_at: "2024-01-01"
      }
    ]);

    const result = await prepareDataforGenAI();

    //בודקים-שנקראה-הפונקציה
    expect(getDishes).toHaveBeenCalled();

    // בודקים שהפלט הוא מחרוזת
    expect(typeof result).toBe("string");

    // בודקים שהמידע פורמט נכון
    expect(result).toContain("name: Pizza");
    expect(result).toContain("price: 60");
    expect(result).toContain("image_url: pizza.jpg");
    expect(result).toContain("category_id: 2");
    expect(result).toContain("is_vegan: false");
    expect(result).toContain("is_vegetarian: true");
    expect(result).toContain("on_sale: false");
    expect(result).toContain("created_at: 2024-01-01");
    expect(result).toContain("ingredients: Cheese");
    expect(result).toContain("sale_price: null");
  });

  it("throws error if getDishes fails", async () => {
    //במקרה-של-כשל
    getDishes.mockRejectedValue(new Error("DB error"));

    // בדיקה-שנזרקת-שגיאה
    await expect(prepareDataforGenAI())
      .rejects
      .toThrow("DB error");
  });

});

describe("getResponseFromGenAI", () => {

  it("returns parsed AI response", async () => {
    //תשובה-מזויפת-בפורמט-של-AI
    const mockAIResponse = JSON.stringify({
      recommended_dishes: ["Pasta"]
    });

    //גישה-מזויפת-לAI
    const aiInstance = GoogleGenAI.mock.instances[0];

    //לוודא-שהקריאה-של-הAI
    //תחזיר-את-הJSON-המזויף
    aiInstance.models.generateContent.mockResolvedValue(mockAIResponse);
   
    const result = await getResponseFromGenAI({ audio: true }, "dishes info");

   //בודקים-שחזר-תשובה-בהתאמה
    expect(result.recommended_dishes).toContain("Pasta");
  });

  it("throws error when AI fails", async () => {
    const aiInstance = GoogleGenAI.mock.instances[0];

    //בדיקה-שיש-שגיאה-מAI
    aiInstance.models.generateContent.mockRejectedValue(new Error("AI error"));

    //נדוק-שהשגיאה-נזרקת
    await expect(
      getResponseFromGenAI({ audio: true }, "dishes info")
    ).rejects.toThrow("AI error");
  });

});
