const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const streamifier = require("streamifier");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

router.post("/", async (req, res) => {
  try {
    await upload(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error uploading file" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "movies", // Set a Cloudinary folder
        },
        (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            return res.status(500).json({ error: "Failed to upload file" });
          }

          const imageUrl = result.secure_url;

          res.json({
            message: "Image uploaded successfully",
            image: imageUrl, // Return the image URL
          });
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
