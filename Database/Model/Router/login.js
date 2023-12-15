import express from "express";
import bcrypt from "bcryptjs";
const router = express.Router();
import LoginData from "../Schema.js";
import  jwt  from "jsonwebtoken";
//get data
router.get("/",verifyToken, async (req, res) => {
  try {
    jwt.verify(req.token,"saurckdlopesauravvr",async(err,authData)=>{
        if(err){
            res.status(500).send({message:"Invalid Token"})
        }
        else{
          //  res.status(200).send(authData)
          res.status(200).send(await LoginData.find({}))
        //   res.status(200).send({message:"Profile Details"})
        }
    })

    // res.status(200).send(await ProductData.find({}))
} catch (error) {
    res.status(500).send("Internal Server Error: " + error)
}
});


//adding data
router.post("/", async (req, res) => {
  try {
    const addingData = new LoginData(req.body);
    const email = req.body.email;
    const useremail = await LoginData.findOne({ email: email });
    if (useremail !== null ) {
      res.status(400).send("Email Already Exists");
    }
    else if( req.body.name===undefined){
      res.status(400).send("Please Fill Name");   
    }
     else {
      // const tokenn = await addingData.generateAuthToken();
      // console.log("gen token", tokenn);
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

        jwt.sign({ userId: useremail._id }, "saurckdlopesauravvr", { expiresIn: '1h' }, (err, token) => {
          if (err) {
              console.log("Token Error: ", err);
              res.status(500).send({ message: "Failed to create token" });
          } else {
              // res.json({ token });
              res.status(200).send({token:token,status:true,name:useremail.name})
          }
      });

        // const token = await useremail.generateAuthToken();
        // console.log("login token", token);
        // res.cookie("mern",token,{
        //     expires:new Date(Date.now()+60000),
        //     httpOnly:true
        // })
        // console.log("cookies",req.cookies.mern)
        // res
        //   .status(201)
        //   .send({ status: true, name: useremail.name, token: token });
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



export default router;
