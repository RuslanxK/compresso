import React from "react";
import { useNavigate } from "react-router-dom";

const Post = ({ postData}) => {

  const navigate = useNavigate();

  

  const truncatedTitle =
    postData.title.length > 15
      ? postData.title.substring(0, 22) + "..."
      : postData.title;
  const truncatedContent =
    postData.content.length > 15
      ? postData.content.substring(0, 75) + "..."
      : postData.content;

      
  const navigateToPost = () => {

    navigate(`/post/${postData._id}`);
  };

  return (
    <div className="post" onClick={navigateToPost}>
    
        <img src={`http://localhost:8080/${postData.image}`} width="100%" alt="img" />
    

      <h3>{truncatedTitle}</h3>
      <p>{truncatedContent}</p>
    </div>
  );
};

export default Post;
