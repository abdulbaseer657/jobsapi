require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const jobs = require("./routes/jobroutes");
const connectDB = require("./db/connect");
var cors = require('cors');



//middleware
app.use(express.json());
app.use(cors());
app.use(function(req,res,next){
        res.setHeader("Access-Control-Allow-Origin ", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  next();
})

//routes
app.use("/api/v1/", jobs);

//start app
const start = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`listening at port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
