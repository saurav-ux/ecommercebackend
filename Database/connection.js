import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/sauravdatabase",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Success")
}).catch((e)=>{
    console.log("Connection failed")
})