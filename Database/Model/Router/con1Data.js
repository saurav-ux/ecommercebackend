import express from 'express'
const productRouter = express.Router()
import ProductData from '../productSchema.js'

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
        res.status(200).send(await ProductData.find({}))
    } catch (error) {
        res.status(500).send("Internal Server Error: " + error)
    }
})

export default productRouter