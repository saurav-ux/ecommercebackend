import jwt from "jsonwebtoken";
// import LoginData from "../Database/Model/Schema"

const auth = async (req, res, next) => {
  // console.warn("middle ware called")
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ");

    //how jwt.verify work
    //if the signature is valid, the decoded parameter in
    //the callback function contains the payload of the JWT,
    // which typically includes information about the user or permissions.
    jwt.verify(token[1], process.env.SECRET, (error, valid) => {
      if (error) {
        res.status(401).send({result:"Please provide valid token"});
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({result:"Please add token with header"});
  }

  //  try {
  //     const token = req.cookies.jwt
  //     console.log("tokenAuth",token)
  //     const verifyUser =  jwt.verify(token,process.env.SECRET)
  //     console.log("verifyUser",verifyUser)
  //  } catch (error) {
  //     res.status(401).send(error)
  //  }
};

export default auth;
