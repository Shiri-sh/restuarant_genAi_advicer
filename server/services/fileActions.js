import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
let ffmpegConfigured = true;
function fileToGenerativePart(filePath, mimeType) {
  try {
    return {
      inlineData: {
        data: fs.readFileSync(filePath).toString("base64"),
        mimeType,
      },
    };
  } catch (error) {
    console.error("Error in fileToGenerativePart:");
    throw error;
  }

}

const convertToMp3 = (inputPath, outputPath) => {
  if (!ffmpegConfigured) {
    ffmpeg.setFfmpegPath("/usr/bin/ffmpeg");
    ffmpeg.setFfprobePath("/usr/bin/ffprobe");
    ffmpegConfigured = true;
  }
  return new Promise((resolve, reject) => {
    console.log("Converting file:", inputPath, fs.existsSync(inputPath));
    ffmpeg(inputPath)
      .toFormat('mp3')
      .on('error', (err) => {
        console.error("FFmpeg Conversion Error:", err.message);
        reject(new Error(`Conversion failed: ${err.message}`));
      })
      .on('end', () => {
        resolve(outputPath);
      })
      .save(outputPath);
  });
};
export { convertToMp3, fileToGenerativePart };