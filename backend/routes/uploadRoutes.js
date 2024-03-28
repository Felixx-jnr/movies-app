const express = require("express");
const cloudinary = require("cloudinary").v2;
const router = express.Router();
const multer = require("multer");

const Movie = require("../models/movieModels");

// Configure multer to handle file uploads
const upload = multer({ dest: "upload/" });

const cloudName = "dyf0wsiaf";
const unsignedUploadPreset = "UnsignedUpload";

cloudinary.config({
  cloud_name: cloudName,
  api_key: "274681121237253",
  api_secret: "axtnn4Z2t-KdAfkAQ85E1_bhcVA",
});

// Route to handle image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: unsignedUploadPreset,
    });

    // // Save the Cloudinary URL to your database
    const imageUrl = result.secure_url;

    // Create a new Movie instance and save the image URL
    const movie = new Movie({ image: imageUrl });
    await movie.save();

    // Respond with the uploaded image URL
    res.json({ imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

module.exports = router;
