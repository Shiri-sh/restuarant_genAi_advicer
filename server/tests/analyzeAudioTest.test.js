import path from "path";
import fs from "fs";

jest.mock("fs", () => ({
  existsSync: jest.fn(),
  unlinkSync: jest.fn(),
  readFileSync: jest.fn(),
}));

jest.mock("../services/fileActions.js", () => ({
  convertToMp3: jest.fn(),
  fileToGenerativePart: jest.fn(),
}));

jest.mock("../models/dishesModel.js", () => ({
  getDishes: jest.fn(),
}));

// ===== GoogleGenAI mock (חוקי!) =====
jest.mock("@google/genai", () => {
  const mockGenerateContent = jest.fn();

  return {
    GoogleGenAI: jest.fn().mockImplementation(() => ({
      models: {
        generateContent: mockGenerateContent,
      },
    })),
    __mockGenerateContent: mockGenerateContent,
  };
});

import {
  prepareAudioforGenAI,
  prepareDataforGenAI,
  getResponseFromGenAI,
} from "../services/analyzeAudioServices.js";

import { convertToMp3, fileToGenerativePart } from "../services/fileActions.js";
import { getDishes } from "../models/dishesModel.js";

const { __mockGenerateContent } = jest.requireMock("@google/genai");

// ================= Tests =================

describe("prepareAudioforGenAI", () => {
  const file = { path: "/tmp/test.wav" };

  afterEach(() => jest.clearAllMocks());

  it("converts audio and returns correct object", async () => {
    convertToMp3.mockResolvedValue();
    fileToGenerativePart.mockReturnValue({
      inlineData: { data: "x", mimeType: "audio/mp3" },
    });

    const result = await prepareAudioforGenAI(file);

    expect(convertToMp3).toHaveBeenCalledWith(
      "/tmp/test.wav",
      path.join("/tmp", "test.mp3")
    );

    expect(result.convertedFilePath).toBe(path.join("/tmp", "test.mp3"));
  });

  it("cleans up files on error", async () => {
    fs.existsSync.mockReturnValue(true);
    convertToMp3.mockRejectedValue(new Error("Conversion failed"));

    await expect(prepareAudioforGenAI(file)).rejects.toThrow();

    expect(fs.unlinkSync).toHaveBeenCalledTimes(2);
  });
});

describe("prepareDataforGenAI", () => {
  it("returns formatted dishes string", async () => {
    getDishes.mockResolvedValue([
      { name: "Pizza", ingredients: "Cheese", price: 60 },
    ]);

    const result = await prepareDataforGenAI();

    expect(result).toContain("Pizza");
    expect(result).toContain("Cheese");
  });
});

describe("getResponseFromGenAI", () => {
  it("returns parsed AI response", async () => {
    __mockGenerateContent.mockResolvedValue({
      text: JSON.stringify({
        response: { recommended_dishes: [{ name: "Pasta" }] },
      }),
    });

    const result = await getResponseFromGenAI({ audio: true }, "info");

    expect(result.response.recommended_dishes[0].name).toBe("Pasta");
  });

  it("throws when AI fails", async () => {
    __mockGenerateContent.mockRejectedValue(new Error("AI error"));

    await expect(
      getResponseFromGenAI({ audio: true }, "info")
    ).rejects.toThrow("AI error");
  });
});
