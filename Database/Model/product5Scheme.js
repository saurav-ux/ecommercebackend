import mongoose from "mongoose";
const product5Schema = new mongoose.Schema({
 
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

const Product5Data = new mongoose.model("Product5Data",product5Schema)
export default Product5Data