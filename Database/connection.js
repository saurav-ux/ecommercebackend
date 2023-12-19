import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//const connect = "mongodb://127.0.0.1:27017/sauravdatabase"
  const connect = process.env.DATABASE
mongoose.connect(connect, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Connection failed:", error);
});



