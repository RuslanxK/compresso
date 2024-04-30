const express = require("express");
const router = express.Router();
const post = require("../models/postModel");
const multer = require("multer"); 
const fs = require("fs");
require('dotenv').config()


const upload = multer();


router.get("/posts", async (req, res) => {
  try {
    const posts = await post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
});



router.get("/post/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const Post = await post.findById(id);

    if (!Post) {
      return res.status(404).send();
    }

    res.status(200).json(Post);
  } catch (e) {
    res.status(500).send(e.message);
  }
});



router.post("/posts", upload.single("image"), async (req, res) => {
  const secretHeader = req.headers['x-admin-secret'];
  if (secretHeader === process.env.ADMIN_SECRET) {
    const { title, content } = req.body;
    const imageBuffer = req.file.buffer;
    const base64Image = imageBuffer.toString("base64");

    const Post = new post({
      title,
      content,
      image: base64Image,
    });

    try {
      const response = await Post.save();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});



module.exports = router;
