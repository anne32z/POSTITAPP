import mongoose from "mongoose";
import cors from "cors";
import express from "express";



const app = express();
app.use(express.json());
app.use(cors());

 

//Database connection
const connectString ="";

 

mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});


app.listen(3001, () => {
  console.log("You are connected");

});