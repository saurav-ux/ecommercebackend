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
              res.status(200).send({token:token,status:true,name:useremail.name,id:useremail._id})
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

// GET request to retrieve wishlist items by user ID
router.get('/wishlist/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
      const userDetails = await LoginData.findById(userId);

      if (!userDetails) {
          return res.status(404).json({ message: 'User not found' });
      }

      const wishlistItems = userDetails.wishlist;
      res.status(200).json(wishlistItems);
  } catch (error) {
      res.status(500).json({ message: 'Server Error' });
  }
});

//post
// Assuming you have your mongoose model defined as 'LoginDetail'

// POST request to add an item to the wishlist by user ID
router.post('/wishlist/:userId', async (req, res) => {
  console.log("body",req.body)
  const { off, price, cutprice, imgName } = req.body;
  const userId = req.params.userId;

  try {
      const userDetails = await LoginData.findById(userId);

      if (!userDetails) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Creating a new wishlist item
      const newWishlistItem = {
          off,
          price,
          cutprice,
          imgName
      };

      userDetails.wishlist.push(newWishlistItem); // Adding the new item to the wishlist array
      await userDetails.save(); // Save the updated user details

      res.status(201).json({ message: 'Item added to wishlist successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server Error in Post' });
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
