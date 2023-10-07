import mongoose from "mongoose";
const product2Schema = new mongoose.Schema({
    imgName:{
        type:String,
        required:true
    }
})
const Product2Data = new mongoose.model("Product2Data",product2Schema)
export default Product2Data