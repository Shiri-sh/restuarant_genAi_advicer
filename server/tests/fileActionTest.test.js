import fs from "fs";
import { fileToGenerativePart, convertToMp3 } from "../services/fileActions.js";

jest.mock("fs", () => ({
  readFileSync: jest.fn(),
  existsSync: jest.fn(),
}));

// ================= ffmpeg mock =================
jest.mock("fluent-ffmpeg", () => {
  let mockShouldFail = false;

  const mockFfmpeg = jest.fn(() => ({
    toFormat: jest.fn().mockReturnThis(),
    on: jest.fn(function (event, cb) {
      if (event === "error" && mockShouldFail) {
        cb(new Error("FFmpeg failed"));
      }
      if (event === "end" && !mockShouldFail) {
        cb();
      }
      return this;
    }),
    save: jest.fn(),
  }));

  mockFfmpeg.__setFail = (val) => {
    mockShouldFail = val;
  };

  return mockFfmpeg;
});

const ffmpegMock = jest.requireMock("fluent-ffmpeg");

// ================= Tests =================
describe("fileToGenerativePart", () => {
  it("returns Gemini compatible object", () => {
    fs.readFileSync.mockReturnValue(Buffer.from("audio"));

    const result = fileToGenerativePart("file.wav", "audio/wav");

    expect(result).toEqual({
      inlineData: {
        data: Buffer.from("audio").toString("base64"),
        mimeType: "audio/wav",
      },
    });
  });
});

describe("convertToMp3", () => {
  afterEach(() => {
    ffmpegMock.__setFail(false);
  });

  it("resolves when ffmpeg succeeds", async () => {
    ffmpegMock.__setFail(false);

    await expect(
      convertToMp3("input.wav", "output.mp3")
    ).resolves.toBeDefined();
  });

  it("rejects when ffmpeg fails", async () => {
    ffmpegMock.__setFail(true);

    await expect(
      convertToMp3("input.wav", "output.mp3")
    ).rejects.toThrow("Conversion failed");
  });
});
