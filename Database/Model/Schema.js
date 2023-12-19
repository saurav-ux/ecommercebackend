import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
const loginDetails = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    wishlist:[{
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
    }]


    // tokens:[{
    //     token:{
    //       type:String,
    //       required: true
    //     }
    // }]
})


//generating token
loginDetails.methods.generateAuthToken = async function(){
    try {
        console.log("this",this._id.toString())  
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET, {
            expiresIn: '24h',
          })
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token
    } catch (error) {
       console.log('error in token generation')
    }

}


//hashing password
loginDetails.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next()

})
const LoginData =  new mongoose.model("LoginData",loginDetails)
export default LoginData
