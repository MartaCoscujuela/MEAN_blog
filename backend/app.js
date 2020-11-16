const express = require('express');
const path = require("path")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");

const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));

mongoose.connect("mongodb+srv://marta:KUdr315VZtl4h5hg@cluster0.ws66z.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(()=>{
  console.log("connected");
})
.catch((error)=>{
  console.log("connection failed" + error);
});

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
