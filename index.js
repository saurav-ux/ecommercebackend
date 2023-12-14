import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "./Database/connection.js";
import router from "./Database/Model/Router/login.js";
import productRouter from "./Database/Model/Router/con1Data.js";
import product2Router from "./Database/Model/Router/con2Data.js";
import product3Router from "./Database/Model/Router/con3Data.js";
import product4Route from "./Database/Model/Router/con4Data.js";
import product5Route from "./Database/Model/Router/con5Data.js";
import cookieParser from "cookie-parser";

//By using the cors middleware and calling app.use(cors()),
// you allow your Express server to respond to requests from different origins,
// including http://localhost:3001.
import cors from "cors";
const app = express();
app.use(cors());
app.use(cors({
  origin:['https://deploy-mern-1whq.vercel.app'],
  methods:['POST','GET','PATCH'],
  credentials:true
}))
const PORT = process.env.PORT || 5003;
app.use(express.json());
app.use(cookieParser());
app.use("/login", router);
// below is jwt autentication
// app.use("/conData", auth, productRouter);
app.use("/conData", productRouter);
app.use('/con2Data',product2Router)
app.use('/con3Data',product3Router)
app.use('/con4Data',product4Route)
app.use('/con5Data',product5Route)
app.get("/", (req, res) => {
  console.log("Test");
  res.send("Hello Saurav");
});


app.listen(PORT, () =>
  console.log(`Server is running on : http://localhost:${PORT}`)
);

