import express from "express";
import cors from "cors";
import audioAnalyzeRouter from "./routes/audioAnalyzeRoute.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Debug environment variables
console.log('Environment variables loaded:');
console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
console.log('MYSQL_PORT:', process.env.MYSQL_PORT);
console.log('MYSQL_USER:', process.env.MYSQL_USER);
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors()); 
app.use(express.json());

app.use("/api", audioAnalyzeRouter);
app.use("/images", express.static(path.join(__dirname, "images")));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Database Host: ${process.env.MYSQL_HOST}`);
    console.log(`Database User: ${process.env.MYSQL_USER}`);
});
