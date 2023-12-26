const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");

const PORT = 3000;
const { hostname } = require("os");

app.use(express.json());
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    console.log(error);
  }
};
connect();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use(express.json({ extended: true }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//routes------------------------------
app.use("/user",require("./routes/user.routes"))
app.use("/task",require("./routes/task.routes"))

/* --------------------------------------- */

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}:${hostname}`);
});
