import React from 'react'
import Main from './Main'
import { Routes, Route } from "react-router-dom";
import Posts from './Posts';
import PostInner from "./PostInner"

const App = () => {



  return (
    <div>

       <img id="logo" src="./logo.png" alt="logo" width="150px"/>

       <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<PostInner />} />
      </Routes>

    </div>
  )
}

export default App