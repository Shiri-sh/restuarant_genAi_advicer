import fs from "fs";
import { fileToGenerativePart, convertToMp3 } from "../services/fileActions.js";

jest.mock("fs");

jest.mock("fluent-ffmpeg", () => {
  return jest.fn(() => ({
    toFormat: jest.fn().mockReturnThis(),
    on: jest.fn(function (event, callback) {
      if (event === "error") {
        callback(new Error("FFmpeg failed"));
      }
      return this;
    }),
    save: jest.fn(),
  }));
});

describe("fileToGenerativePart", () => {
  it("returns correct Gemini format object", () => {
    fs.readFileSync.mockReturnValue(Buffer.from("test-audio"));
    const result = fileToGenerativePart("fake/path.wav", "audio/wav");
    expect(result).toHaveProperty("inlineData");
    expect(result.inlineData.mimeType).toBe("audio/wav");
    expect(typeof result.inlineData.data).toBe("string");
  });
});

describe("convertToMp3", () => {
  it("rejects the promise when ffmpeg fails", async () => {
    await expect(
      convertToMp3("input.wav", "output.mp3")
    ).rejects.toThrow("Conversion failed");
  });
});
