const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const URI = process.env.MONGO_URI;
const connectDb = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDb;
