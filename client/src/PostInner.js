import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const PostInner = () => {

    const { id } = useParams()

    const [post, setPost] = useState({})


    useEffect(() => {
        const getPost = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_POSTS_API}/post/${id}`)
            setPost(data)
        }
         getPost()
     }, [id]);


  return (
    <div className='innerPost'>
    
     <div className='bg-image'>
      
 
     </div>

     <div className='innerPost-content'>

     <h2>{post.title}</h2>
     <p>{post.content}</p>
      
     </div>
     

    </div>
  )
}

export default PostInner