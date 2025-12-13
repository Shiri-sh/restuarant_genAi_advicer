import ffmpeg from "fluent-ffmpeg";
import fs from "fs";

function fileToGenerativePart(filePath, mimeType) {
  return {
    inlineData: {
      data: fs.readFileSync(filePath).toString("base64"),
      mimeType,
    },
  };
}

const convertToMp3 = (inputPath, outputPath) => {
    return new Promise((resolve, reject) => {
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