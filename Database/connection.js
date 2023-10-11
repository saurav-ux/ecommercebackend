import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// const connect1 = 'mongodb+srv://sauravanand243:Ejse5gkM6dG0UECt@cluster0.9jeqyld.mongodb.net/?retryWrites=true&w=majority'
 const connect1 = process.env.DATABASE
mongoose.connect(connect1, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Connection failed:", error);
});




