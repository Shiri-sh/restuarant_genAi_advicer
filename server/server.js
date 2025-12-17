import express from "express";
import cors from "cors";
import audioAnalyzeRouter from "./routes/audioAnalyzeRoute.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors()); 
app.use(express.json());

app.use("/api", audioAnalyzeRouter);
app.use("/images", express.static(path.join(__dirname, "images")));
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${process.env.PORT }`);
    console.log(`Database Host: ${process.env.MYSQL_HOST}`);
    console.log(`Database User: ${process.env.MYSQL_USER}`);
});
