import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Post from './Post'

const Posts = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
       const getPosts = async () => {
           const { data } = await axios.get(`${process.env.REACT_APP_POSTS_API}/posts`)
           setPosts(data)
       }
        getPosts()
    }, []);


    const postsData = posts?.map((post) => {

         return <Post key={post._id} postData={post} />
    })

  return (

    <div className='posts-main'>
        
        <div className="texts">
        <h1>דולור <span className="secondary-title"> לורם איפסום </span> </h1>
        <p>
          לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית צש בליא, מנסוטו
          צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק.<br /> לורם איפסום דולור סיט אמט,
          קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים.
        </p>


       </div>


       <div className='posts'>
              {postsData}


       </div>

    </div>
  )
}

export default Posts