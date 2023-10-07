import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
 
    off:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    cutprice:{
        type:Number,
        required:true,
    },
    imgName:{
        type:String,
        required:true,
    }
    
})

const ProducrData = new mongoose.model("ProducrData",productSchema)
export default ProducrData