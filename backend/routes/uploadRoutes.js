// const express = require("express");
// const cloudinary = require("cloudinary").v2;
// const router = express.Router();
// const multer = require("multer");

// const Movie = require("../models/movieModels");

// // Configure multer to handle file uploads
// //const upload = multer({ storage: multer.memoryStorage() });
// const upload = multer({ dest: "upload/" });

// const cloudName = "dyf0wsiaf";
// const unsignedUploadPreset = "UnsignedUpload";

// cloudinary.config({
//   cloud_name: cloudName,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// // Route to handle image upload
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No image uploaded" });
//     }

//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       upload_preset: unsignedUploadPreset,
//     });

//     // Save the Cloudinary URL to your database
//     const imageUrl = result.secure_url;

//     // Respond with the uploaded image URL
//     res.json({ imageUrl });
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     res.status(500).json({ error: "Failed to upload image" });
//   }
// });

// module.exports = router;

const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const streamifier = require("streamifier");
const dotenv = require("dotenv");

dotenv.config();

// Create a schema and model for storing Cloudinary URLs

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

cloudinary.config({
  cloud_name: "dyf0wsiaf",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

router.post("/", async (req, res) => {
  try {
    await runMiddleware(req, res, upload);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "demo",
      },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Failed to upload file" });
        }

        // Store the Cloudinary URL to MongoDB
        const imageUrl = result.secure_url;

        res.status(200).json(imageUrl);
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

module.exports = router;
