import express from "express";
import bcrypt from "bcryptjs";
const router = express.Router();
import LoginData from "../Schema.js";

//get data
router.get("/", async (req, res) => {
  try {
    res.status(200).send(await LoginData.find({}));
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error);
  }
});

router.post("/", async (req, res) => {
  try {
    const addingData = new LoginData(req.body);
    const email = req.body.email;
    const useremail = await LoginData.findOne({ email: email });
    if (useremail !== null) {
      res.status(400).send("Email Already Exists");
    } else {
      const tokenn = await addingData.generateAuthToken();
      console.log("gen token", tokenn);
      // res.cookie("mern",tokenn,{
      //     expires:new Date(Date.now()+600000),
      //     httpOnly:true
      // })
      await addingData.save();
      res.status(200).send(true);
    }
    // res.status(201).send(true)
  } catch (error) {
    res.status(500).send("Internal Server Errors: ", error);
  }
});

router.post("/validate", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await LoginData.findOne({ email: email });

    if (useremail !== null) {
      const isMatch = await bcrypt.compare(password, useremail.password);
      if (isMatch) {
        const token = await useremail.generateAuthToken();
        console.log("login token", token);
        // res.cookie("mern",token,{
        //     expires:new Date(Date.now()+60000),
        //     httpOnly:true
        // })
        // console.log("cookies",req.cookies.mern)
        res
          .status(201)
          .send({ status: true, name: useremail.name, token: token });
      } else {
        res
          .status(401)
          .send({ status: false, name: "Incorrect email or password" });
      }
    } else {
      res
        .status(401)
        .send({ status: false, name: "Incorrect email or password" });
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
