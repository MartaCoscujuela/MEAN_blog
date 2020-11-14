const express = require('express');
const bodyParser = require("body-parser");
const Post = require("./models/post");
const mongoose = require("mongoose");


const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb+srv://marta:KUdr315VZtl4h5hg@cluster0.ws66z.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(()=>{
  console.log("connected");
})
.catch((error)=>{
  console.log("connection failed" + error);
});

app.use((req, res, next) =>{
next();
});

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json(
      { message: "Post added successfully",
      postId: result._id
    });
  });
});

app.get('/api/posts', (req, res, next)=>{
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  });
  res.status(200).json({message: "resource deleted successfully"});
});


module.exports = app;
