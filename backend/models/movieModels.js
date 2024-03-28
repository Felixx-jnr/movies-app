const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const movieSchema = new mongoose.Schema(
  {
    name: { type: String },
    image: { type: String },
    year: { type: Number },
    genre: { type: ObjectId, ref: "Genre" },
    genrename: { type: String },
    detail: { type: String },
    cast: [{ type: String }],
    reviews: [reviewSchema],
    numReviews: { type: Number },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
