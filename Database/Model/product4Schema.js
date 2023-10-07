import mongoose from "mongoose";
const product4Schema = new mongoose.Schema({
 
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

const Product4Data = new mongoose.model("Product4Data",product4Schema)
export default Product4Data