import express from "express";
import multer from "multer";

const router = express.Router();

// הגדרת אחסון
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // תיקייה לשמירת קבצים
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/audio", upload.single("audio"), (req, res) => {
  try {
    console.log("Audio saved:", req.file.path);

    res.json({
      message: "Audio saved successfully!",
      path: req.file.path,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
