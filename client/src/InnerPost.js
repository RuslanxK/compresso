import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const InnerPost = () => {

    const { id } = useParams()

    const [post, setPost] = useState({})


    useEffect(() => {
        const getPost = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_POSTS_API}/post/${id}`)
            setPost(data)
        }
         getPost()
     }, []);


  return (
    <div className='innerPost'>
    
      {post.title}
      {post.content}

    </div>
  )
}

export default InnerPost