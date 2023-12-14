import express from 'express'
const productRouter = express.Router()
import ProductData from '../productSchema.js'
import  jwt  from "jsonwebtoken";
productRouter.post('/',async (req,res)=>{
       try {
        const addData = new ProductData(req.body)
         await addData.save()
         res.status(200).send(true)
       } catch (error) {
        res.status(500).send("Internal Server Errors: ",error)
       }
})

productRouter.get('/',async (req,res)=>{
    try {
        // jwt.verify(req.token,"saurckdlopesauravvr",async(err,authData)=>{
        //     if(err){
        //         res.status(500).send({message:"Invalid Token"})
        //     }
         //   else{
              //  res.status(200).send(authData)
              res.status(200).send(await ProductData.find({}))
            //   res.status(200).send({message:"Profile Details"})
          //  }
      //  })

        // res.status(200).send(await ProductData.find({}))
    } catch (error) {
        res.status(500).send("Internal Server Error: " + error)
    }
})

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
         req.token = token;
         next()
    }
    else{
        res.status(500).send({
            message: "Token is not valid"
        })
    }
  }


export default productRouter