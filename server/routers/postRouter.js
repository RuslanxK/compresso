const express = require("express");
const router = express.Router();
const post = require("../models/postModel");
const multer = require("multer"); 



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});


const upload = multer({ storage: storage });




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

  const { title, content } = req.body;

  // Retrieve the filename of the uploaded image from req.file
  const imagePath = req.file.path;

  const Post = new post({
    title,
    content,
    image: imagePath, // Save the image path in the database
  });

  try {
    const response = await Post.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});



module.exports = router;
