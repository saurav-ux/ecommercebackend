import mongoose from "mongoose";

const dbName = "sauravdatabase";
// const connect1 = `mongodb+srv://sauravanand243:Saurav@123@cluster0.jbbncif.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const connect1 = 'mongodb+srv://sauravanand243:Ejse5gkM6dG0UECt@cluster0.9jeqyld.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(connect1, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Connection failed:", error);
});



