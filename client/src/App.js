import React from 'react'
import Main from './Main'
import { Routes, Route, useNavigate} from "react-router-dom";
import Posts from './Posts';
import PostInner from "./PostInner"

const App = () => {

 const navigate = useNavigate()

  return (
    <div>

       <img id="logo" src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" width="150px" onClick={() => navigate("/")}/>

       <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<PostInner />} />
      </Routes>

    </div>
  )
}

export default App