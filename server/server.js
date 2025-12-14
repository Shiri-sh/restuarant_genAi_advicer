import express from "express";
import cors from "cors";
import audioAnalyzeRouter from "./routes/audioAnalyze.js";
import dotenv from "dotenv";

dotenv.config();


const app = express();
app.use(cors()); 
app.use(express.json());

app.use("/api", audioAnalyzeRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Key: ${process.env.GENAI_API_KEY}`);
});
