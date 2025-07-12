import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Menu = ({cat}) => {

  const [posts,setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      try {
       const data = await axios.get(`/api/v1/posts?cat=${cat}`);
       setPosts(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[cat]);

  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map((post) => {
            return(
                <div className="post">
                    <img src={post.img} alt="img" />
                    <h2>{post.title}</h2>
                    <Link to={`/post/${post.id}`}><button>Read More</button></Link>
                </div>
            )
        })}
    </div>
  )
}

export default Menu