const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({


    title: String,
    content: String,
    
  },
  { timestamps: true }
  
);



const post = mongoose.model("posts", postSchema)

module.exports = post