const mongoose = require( "mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true,
  },
});

module.exports = mongoose.model("Genre", genreSchema);