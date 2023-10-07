import express from 'express'
const product5Route = express.Router()
import Product5Data from '../product5Scheme.js'

product5Route.post('/',async(req,res)=>{
    try {
          const addData = Product5Data(req.body)
          await addData.save()
          res.status(200).send(true)
    } catch (error) {
        res.status(500).send("Internal Server Errors: ",error)
    }
   
})

product5Route.get('/',async(req,res)=>{
    try {
        res.status(200).send(await Product5Data.find({}))
    } catch (error) {
        res.status(500).send("Internal Server Error: " + error)
    }
    
})

export default product5Route