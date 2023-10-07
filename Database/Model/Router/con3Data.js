import express from 'express'
const product3Router = express.Router()
import Product3Data from '../product3Schema.js'


product3Router.post('/',async (req,res)=>{
    try {
       const addData= new Product3Data(req.body)
        await addData.save()
        res.status(200).send(true)
    } catch (error) {
        res.status(500).send("Internal Server Error: ",error)
    }
})

product3Router.get('/',async(req,res)=>{
    try {
        res.status(200).send(await Product3Data.find({}))
    } catch (error) {
        res.status(500).send("Internal Server Error: ",error)
    }
})

export default product3Router
