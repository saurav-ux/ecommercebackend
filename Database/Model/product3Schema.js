import mongoose from "mongoose";
const product3Schema = new mongoose.Schema({
    imgName1:{
        type:String,
        required:true
    },
    imgName2:{
        type:String,
        required:true
    }
})

const Product3Data = new mongoose.model("Product3Data",product3Schema)
export default Product3Data