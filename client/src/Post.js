import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { postImages } from "./images";

const Post = ({ postData, posts }) => {

  const navigate = useNavigate();

const [img, setImg] = useState("")


useEffect(() => {
  
  const foundImage = postImages.find(image => image.id === postData._id);
  if (foundImage) {
  
    setImg(foundImage.src);
  } else {
  
    setImg(""); 
  }
}, [postData]);



 console.log(img)

  

  const truncatedTitle =
    postData.title.length > 15
      ? postData.title.substring(0, 22) + "..."
      : postData.title;
  const truncatedContent =
    postData.content.length > 15
      ? postData.content.substring(0, 75) + "..."
      : postData.content;

      
  const navigateToPost = () => {

    localStorage.setItem("img", img);
    navigate(`/post/${postData._id}`);
  };

  return (
    <div className="post" onClick={navigateToPost}>
    
        <img src={img} width="100%" alt="img" />
    

      <h3>{truncatedTitle}</h3>
      <p>{truncatedContent}</p>
    </div>
  );
};

export default Post;
