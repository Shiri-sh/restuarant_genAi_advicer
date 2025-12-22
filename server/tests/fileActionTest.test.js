import fs from "fs";
import { fileToGenerativePart, convertToMp3 } from "../services/fileActions.js";

jest.mock("fs");

// Mock של FFmpeg שמאפשר הצלחה או כשל לפי flag
jest.mock("fluent-ffmpeg", () => {
  return jest.fn(() => ({
    toFormat: jest.fn().mockReturnThis(),
    on: jest.fn(function (event, callback) {
      // אם event הוא 'error' ו-shouldFail=true, זרוק שגיאה
      if (event === "error" && this.shouldFail) {
        callback(new Error("FFmpeg failed"));
      }
      // אם event הוא 'end' ו-shouldFail=false, קרא ל-callback כדי לסיים בהצלחה
      if (event === "end" && !this.shouldFail) {
        callback();
      }
      return this;
    }),
    save: jest.fn(),
    // דיפולט ל-false
    shouldFail: false,
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
  it("resolves successfully when ffmpeg works", async () => {
    // לא לגרום לכשל
    convertToMp3.shouldFail = false;

    await expect(
      convertToMp3("input.wav", "output.mp3")
    ).resolves.toBeUndefined();
  });

  it("rejects the promise when ffmpeg fails", async () => {
    // גרום ל-ffmpeg לזרוק שגיאה
    convertToMp3.shouldFail = true;

    await expect(
      convertToMp3("input.wav", "output.mp3")
    ).rejects.toThrow("Conversion failed");

    // אפס את flag אחרי ה-test
    convertToMp3.shouldFail = false;
  });
});
