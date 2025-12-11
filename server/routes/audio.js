// import express from "express";
// import multer from "multer"; // נדרש כדי לקבל קבצים ב-POST

// const router = express.Router();
// const upload = multer(); // שמירה בזיכרון בלבד

// router.post("/audio", upload.single("audio"), (req, res) => {
//   try {
//     console.log("Audio received:", req.file); 
//     res.json({
//       message: "Audio received successfully!",
//       filename: req.file.originalname,
//       size: req.file.size,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// export default router;
import express from "express";
import multer from "multer";
import path from "path";

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
    