require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const jobs = require("./routes/jobroutes");
const connectDB = require("./db/connect");

//middleware
const cors = require("cors");
app.use(cors());
app.use(express.json());

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
