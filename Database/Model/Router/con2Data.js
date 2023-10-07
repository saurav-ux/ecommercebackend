import express from "express";
const product2Router = express.Router()
import Product2Data from "../product2Schema.js";


product2Router.post('/',async(req,res)=>{
   try {
    const addData = new Product2Data(req.body)
    await addData.save()
    res.status(200).send(true)
   } catch (error) {
    res.status(500).send("Internal Server Errors: ",error)
   }
})

product2Router.get('/',async (req,res)=>{
    try {
        res.status(200).send(await Product2Data.find({}))
    } catch (error) {
        res.status(500).send("Internal Server Error: " + error)
    }
})

// update details
product2Router.patch("/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      //When you set { new: true },
      // it tells Mongoose to return the modified document (the updated version) after the update operation is complete.
      await Product2Data.findByIdAndUpdate(_id, req.body, { new: true });
      res.send("Data Updated");
    } catch (e) {
      res.status(500).send("Internal Server Error: ", e);
    }
  });

export default product2Router