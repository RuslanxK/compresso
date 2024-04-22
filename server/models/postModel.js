const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({


    title: String,
    content: String,
    image: {
      type: String, 
      required: true,
    },
    
  },
  { timestamps: true }
  
);



const post = mongoose.model("posts", postSchema)

module.exports = post