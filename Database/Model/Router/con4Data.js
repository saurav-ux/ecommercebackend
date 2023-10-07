import express from 'express'
const product4Route = express.Router()
import Product4Data from '../product4Schema.js'

product4Route.post('/',async(req,res)=>{
    try {
          const addData = Product4Data(req.body)
          await addData.save()
          res.status(200).send(true)
    } catch (error) {
        res.status(500).send("Internal Server Errors: ",error)
    }
   
})

product4Route.get('/',async(req,res)=>{
    try {
        res.status(200).send(await Product4Data.find({}))
    } catch (error) {
        res.status(500).send("Internal Server Error: " + error)
    }
    
})

export default product4Route