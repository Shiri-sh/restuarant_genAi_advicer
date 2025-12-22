// import path from "path";
// import fs from "fs";
// import {prepareAudioforGenAI, prepareDataforGenAI, getResponseFromGenAI} from "../services/analyzeAudioServices.js";
// import { convertToMp3, fileToGenerativePart } from "../services/fileActions.js";
// import { getDishes } from "../models/dishesModel.js";
// import { GoogleGenAI } from "@google/genai";

// jest.mock("fs");
// jest.mock("path", () => jest.requireActual("path"));

// jest.mock("../services/fileActions.js", () => ({
//   convertToMp3: jest.fn(),
//   fileToGenerativePart: jest.fn()
// }));
// jest.mock("../models/dishesModel.js", () => ({
//   getDishes: jest.fn()
// }));
// jest.mock("@google/genai", () => {
//   return {
//     GoogleGenAI: jest.fn().mockImplementation(() => ({
//       models: {
//         generateContent: jest.fn()
//       }
//     }))
//   };
// });

// describe("prepareAudioforGenAI", () => {

//   it("converts audio to mp3 and returns generative part", async () => {
  
//     const file = { path: "/tmp/test.wav" };

//     convertToMp3.mockResolvedValue();

//     fileToGenerativePart.mockReturnValue({ mock: "audioPart" });

//     const result = await prepareAudioforGenAI(file);

   
//     expect(convertToMp3).toHaveBeenCalledWith(
//       "/tmp/test.wav",
//       path.join("/tmp", "test.mp3")
//     );

    
//     expect(fileToGenerativePart).toHaveBeenCalledWith(
//       path.join("/tmp", "test.mp3"),
//       "audio/mp3"
//     );

    
//     expect(result).toEqual({ mock: "audioPart" });
//   });

//   it("throws error when convertToMp3 fails", async () => {
//     const file = { path: "/tmp/test.wav" };

   
//     convertToMp3.mockRejectedValue(new Error("Conversion failed"));

    
//     await expect(prepareAudioforGenAI(file))
//       .rejects
//       .toThrow("Conversion failed");
//   });
//   it("cleans up files on error", async () => {
//     const file = { path: "/tmp/test.wav" };

//     fs.existsSync.mockReturnValue(true);
   
//     convertToMp3.mockRejectedValue(new Error("Conversion failed"));

    
//     await expect(prepareAudioforGenAI(file))
//       .rejects
//       .toThrow("Conversion failed");

   
//     expect(fs.unlinkSync).toHaveBeenCalledWith("/tmp/test.wav");
//   });
//   it("throws error when fileToGenerativePart fails", async () => {
//     const file = { path: "/tmp/test.wav" };

    
//     fileToGenerativePart.mockRejectedValue(new Error("Conversion failed"));

//     await expect(prepareAudioforGenAI(file))
//       .rejects
//       .toThrow("Conversion failed");
//   });

// });

// describe("prepareDataforGenAI", () => {

//   it("returns formatted dishes data as string", async () => {
//     getDishes.mockResolvedValue([
//       {
//         name: "Pizza",
//         ingredients: "Cheese",
//         price: 60,
//         image_url: "pizza.jpg",
//         category_id: 2,
//         is_vegan: false,
//         is_vegetarian: true,
//         on_sale: false,
//         sale_price: null,
//         created_at: "2024-01-01"
//       }
//     ]);

//     const result = await prepareDataforGenAI();

    
//     expect(getDishes).toHaveBeenCalled();

    
//     expect(typeof result).toBe("string");

    
//     const expectedFields = [
//       "name: Pizza",
//       "ingredients: Cheese",
//       "price: 60",
//       "image_url: pizza.jpg",
//       "category_id: 2",
//       "is_vegan: false",
//       "is_vegetarian: true",
//       "on_sale: false",
//       "sale_price: null",
//       "created_at: 2024-01-01"
//     ];

//     expectedFields.forEach(field => {
//       expect(result).toContain(field);
//     });
//   });

//   it("throws error if getDishes fails", async () => {
    
//     getDishes.mockRejectedValue(new Error("DB error"));

//     await expect(prepareDataforGenAI())
//       .rejects
//       .toThrow("DB error");
//   });

// });

// describe("getResponseFromGenAI", () => {

//   it("returns parsed AI response", async () => {
   
//     const mockAIResponse = JSON.stringify({
//       response: {"recommended_dishes":[{"name":"Pasta"}]}
//     });

//     const aiInstance = GoogleGenAI.mock.instances[0];

    
//     aiInstance.models.generateContent.mockResolvedValue(mockAIResponse);
   
//     const result = await getResponseFromGenAI({ audio: true }, "dishes info");

   
//     expect(result.response.recommended_dishes).toContain("Pasta");
//   });

//   it("throws error when AI fails", async () => {
//     const aiInstance = GoogleGenAI.mock.instances[0];

    
//     aiInstance.models.generateContent.mockRejectedValue(new Error("AI error"));
    
//     await expect(
//       getResponseFromGenAI({ audio: true }, "dishes info")
//     ).rejects.toThrow("AI error");
//   });

// });
import path from "path";
import fs from "fs";
import { prepareAudioforGenAI, prepareDataforGenAI, getResponseFromGenAI } from "../services/analyzeAudioServices.js";
import { convertToMp3, fileToGenerativePart } from "../services/fileActions.js";
import { getDishes } from "../models/dishesModel.js";
import { GoogleGenAI } from "@google/genai";

// Mocks
jest.mock("fs");
jest.mock("path", () => jest.requireActual("path"));

jest.mock("../services/fileActions.js", () => ({
  convertToMp3: jest.fn(),
  fileToGenerativePart: jest.fn()
}));

jest.mock("../models/dishesModel.js", () => ({
  getDishes: jest.fn()
}));

jest.mock("@google/genai", () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    models: {
      generateContent: jest.fn()
    }
  }))
}));

// ==================== prepareAudioforGenAI ====================
describe("prepareAudioforGenAI", () => {
  const file = { path: "/tmp/test.wav" };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("converts audio to mp3 and returns generative part", async () => {
    convertToMp3.mockResolvedValue(path.join("/tmp", "test.mp3"));
    fileToGenerativePart.mockReturnValue({ audioPart: { mock: "audioPart" } });

    const result = await prepareAudioforGenAI(file);

    expect(convertToMp3).toHaveBeenCalledWith(
      "/tmp/test.wav",
      path.join("/tmp", "test.mp3")
    );
    expect(fileToGenerativePart).toHaveBeenCalledWith(
      path.join("/tmp", "test.mp3"),
      "audio/mp3"
    );

    expect(result).toHaveProperty("audioPart");
    expect(result.audioPart).toEqual({ mock: "audioPart" });
    expect(result).toHaveProperty("originalFilePath", "/tmp/test.wav");
    expect(result).toHaveProperty("convertedFilePath", path.join("/tmp", "test.mp3"));

  });

  it("throws error when convertToMp3 fails", async () => {
    convertToMp3.mockRejectedValue(new Error("Conversion failed"));

    await expect(prepareAudioforGenAI(file))
      .rejects
      .toThrow("Conversion failed");
  });

  it("cleans up files on error", async () => {
    fs.existsSync.mockReturnValue(true);
    convertToMp3.mockRejectedValue(new Error("Conversion failed"));

    await expect(prepareAudioforGenAI(file))
      .rejects
      .toThrow("Conversion failed");

    expect(fs.unlinkSync).toHaveBeenCalledWith("/tmp/test.wav");
  });

  it("throws error when fileToGenerativePart fails", async () => {
    convertToMp3.mockResolvedValue(path.join("/tmp", "test.mp3"));
    fileToGenerativePart.mockRejectedValue(new Error("Conversion failed"));

    await expect(prepareAudioforGenAI(file))
      .rejects
      .toThrow("Conversion failed");
  });
});

// ==================== prepareDataforGenAI ====================
describe("prepareDataforGenAI", () => {
  afterEach(() => jest.clearAllMocks());

  it("returns formatted dishes data as string", async () => {
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

    expect(getDishes).toHaveBeenCalled();
    expect(typeof result).toBe("string");
    expect(result).toContain("name: Pizza");
    expect(result).toContain("ingredients: Cheese");
    expect(result).toContain("price: 60");
  });

  it("throws error if getDishes fails", async () => {
    getDishes.mockRejectedValue(new Error("DB error"));

    await expect(prepareDataforGenAI())
      .rejects
      .toThrow("DB error");
  });
});

// ==================== getResponseFromGenAI ====================
describe("getResponseFromGenAI", () => {
  afterEach(() => jest.clearAllMocks());

  it("returns parsed AI response", async () => {
    const mockAIResponse = JSON.stringify({
      response: { recommended_dishes: [{ name: "Pasta" }] }
    });

    const aiInstance = new GoogleGenAI();
    aiInstance.models.generateContent.mockResolvedValue(mockAIResponse);

    const result = await getResponseFromGenAI({ audio: true }, "dishes info");

    expect(result.response.recommended_dishes[0].name).toBe("Pasta");
  });

  it("throws error when AI fails", async () => {
    const aiInstance = new GoogleGenAI();
aiInstance.models.generateContent.mockResolvedValue(mockAIResponse);

    await expect(getResponseFromGenAI({ audio: true }, "dishes info"))
      .rejects
      .toThrow("AI error");
  });
});
