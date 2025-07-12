import React, { useEffect, useState } from "react";
import person from "../img/person.jpg";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation } from "react-router-dom";
import Menu from "../components/Menu.jsx";
import axios from 'axios';
import moment from 'moment';
import { useContext } from "react";
import { AuthContext } from "../../../api/Context/authContext.jsx";
import {FaUserCircle} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Single = () => {


 const [post,setPost] = useState({});

 const {currentUser} = useContext(AuthContext);

 const location = useLocation();
 const navigate = useNavigate();
 const postId = location.pathname.split('/')[2];

 const deletePost = async() => {
  try {
    await axios.delete(`/api/v1/posts/${postId}`)
    return navigate('/');
  } catch (error) {
    return console.log(error);
  }
 }

 useEffect(()=> {


 const fetchData = async() => {
 try {
   const data = await axios.get(`/api/v1/posts/${postId}`);
   setPost((data.data)[0]);
   console.log(data.data[0].cat);
   console.log('data.data[0].cat');
 } catch (error) {
   console.log(error)
 }
 }
 fetchData();
 },[])


 return (
   <div className="single">
     <div className="content">
       <img
         src={post.img}
         alt="img"
       />
       <div className="user">
         {post.userImage ? <img src={post.userImage} alt="img" /> : <FaUserCircle className="icon"></FaUserCircle>}
         {/* {post.userImage && <img src={post.userImage} alt="img" />} */}
         <div className="info">
           <span>{post.username}</span>
           <p>{moment(post.date).fromNow()}</p>
         </div>
         { currentUser?.data.id === post.postUserId ?
         <div className="edit">
           <Link to={`/write?edit=${postId}`}>
             <img src={Edit} alt="edit" />
           </Link>
           <img onClick={deletePost} src={Delete} alt="delete" />
         </div>:
         <></>
         }
       </div>
       <h1>
        {post.title}
       </h1>
       <p>
       {post.description}
       </p>
     </div>
     {post?.cat && <Menu cat={post.cat}></Menu>}
   </div>
 );
};


export default Single;



