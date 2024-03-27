//MULTER AND LOCAL STORAGE
//MULTER AND LOCAL STORAGE
//MULTER AND LOCAL STORAGE

// const path = require("path");
// const express = require("express");
// const multer = require("multer");

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "upload/");
//   },

//   filename: (req, file, cb) => {
//     const extname = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${Date.now()}${extname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png||image\/webp/;

//   const extname = path.extname(file.originalname);
//   const mimetype = file.mimetype;

//   if (filetypes.test(extname) && mimetypes.test(mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Images only"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });
// const uploadSingleImage = upload.single("image");

// router.post("/", (req, res) => {
//   uploadSingleImage(req, res, (err) => {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     } else if (req.file) {
//       res.status(200).send({
//         message: "Image uploaded successfully",
//         image: `/${req.file.path}`,
//       });
//     } else {
//       res.status(400).send({ message: "No image file provided" });
//     }
//   });
// });

// module.exports = router;

//MULTER AND CLOUDINARY
//MULTER AND CLOUDINARY
//MULTER AND CLOUDINARY

// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const cloudinary = require("cloudinary");

// const router = express.Router();

// // Configure Cloudinary with your credentials
// cloudinary.v2.config({
//   cloud_name: "dyf0wsiaf",
//   api_key: "274681121237253",
//   api_secret: "axtnn4Z2t-KdAfkAQ85E1_bhcVA",
// });

// // Multer configuration
// const upload = multer();

// // Middleware to handle single file upload
// const uploadSingleImage = upload.single("image");

// // Route for uploading image to Cloudinary
// router.post("/", (req, res) => {
//   uploadSingleImage(req, res, (err) => {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     } else if (req.file) {
//       // Upload file to Cloudinary
//       cloudinary.uploader.upload(req.file.path, (error, result) => {
//         if (error) {
//           console.log(error);
//           res
//             .status(500)
//             .send({ message: "Error uploading image to Cloudinary" });
//         } else {
//           // Send response with URL of uploaded image
//           res.status(200).send({
//             message: "Image uploaded successfully",
//             image: result.secure_url, // URL of the uploaded image on Cloudinary
//           });
//         }
//       });
//     } else {
//       res.status(400).send({ message: "No image file provided" });
//     }
//   });
// });

// module.exports = router;

const express = require("express");
const path = require("path");
const cloudinary = require("cloudinary").v2;

const router = express.Router();

cloudinary.config({
  cloud_name: "dyf0wsiaf",
  api_key: "274681121237253",
  api_secret: "axtnn4Z2t-KdAfkAQ85E1_bhcVA",
});

// Define upload preset options to accept all image types
const uploadPresetOptions = {
  unsigned: true,
  folder: "uploads",
  allowed_formats: ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "webp"],
};

cloudinary.api
  .create_upload_preset(uploadPresetOptions)
  .then((uploadPreset) => {
    console.log("Upload preset created/updated:", uploadPreset);
  })
  .catch((error) => {
    console.error("Error creating/uploading preset:", error);
  });

module.exports = router;
