import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../api/Context/authContext.jsx';
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const Home = () => {

 const location = useLocation();
 console.log(location);
 console.log("location");

 const queries = useLocation().search;

 const [posts,setPosts] = useState([]);
 const [totalPosts,setTotalPosts] = useState();

 const {currentUser} = useContext(AuthContext);

 console.log(posts);
 console.log('posts');
 console.log('posts');

 //  const posts = [
 //   {
 //     id: 1,
 //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
 //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
 //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
 //   },
 //   {
 //     id: 2,
 //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
 //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
 //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
 //   },
 //   {
 //     id: 3,
 //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
 //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
 //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
 //   },
 //   {
 //     id: 4,
 //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
 //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
 //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
 //   },
 // ];

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html,"text/html");
    return doc.body.textContent;
  }

useEffect(() => {
   const fetchData = async() => {
     try {
       const data = await axios.get(`api/v1/posts${queries}`);
      //  console.log(`api/v1/posts${location.search}`);
      //  console.log(data.data[0]);
      // console.log("data.data[0] in Home.jsx");
      // console.log('data.data[0] in Home.jsx');
      // console.log(data.data[1][0].totalPosts);
      // console.log("data.data[1] in Home.jsx");
      // console.log('data.data[1] in Home.jsx');
       setPosts(data.data[0]);
       setTotalPosts(data.data[1][0].totalPosts);
     } catch (error) {
       console.log(error)
     }
   }
   fetchData();
},[queries]);



 return (
   <div className='home'>
     <div className="posts">
       {posts.map((post) => {
         return(
           <div className="post">
             <div className="img">
               <img src={`../../public/upload/${post.img}`} alt="img" />
             </div>
             <div className="content">
               <Link className='link' to={`/post/${post.id}`}><h1>{post.title}</h1></Link>
               <p>{getText(post.description)}</p>
               <button><Link className='link' to={`/post/${post.id}`}>Read More</Link></button>
             </div>
           </div>
         )
       })}
     </div>
   </div>
 )
}


export default Home
