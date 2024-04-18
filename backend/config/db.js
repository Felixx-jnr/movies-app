const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Deitycoder:codercoder@cluster0.y3q2atx.mongodb.net/MoviesHQ?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("successfully connected");
  } catch (error) {
    console.log(`Error${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
