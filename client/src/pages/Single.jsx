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
// import {FaUserCircle} from 'react-icons/fa';
import {FaUserCircle,FaHeart,FaTrash,FaRegHeart,FaRegComment} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import DOMPurify from 'dompurify';
import {successNotification,errorNotification} from '../components/Toast.jsx';




const Single = () => {




const [post,setPost] = useState({});
const[isPostLiked,setIsPostLiked] = useState(false);
const [comments,setComments] = useState([]);
const [comment,setComment] = useState('');
// const [,setCurrentUser] = useState('');


const {currentUser} = useContext(AuthContext);
// console.log(currentUser.data.id);
// console.log("currentUser as printed in single.jsx");
// console.log("currentUser as printed in single.jsx");



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
 setPost(data.data.data[1][0]);
 // setIsPostLiked(data.data.ifPostLiked);
 if (data.data.ifPostLiked !== isPostLiked) {
     setIsPostLiked(data.data.ifPostLiked);
   }
 setComments(data.data.data[2]);
//  console.log(data.data.data[2]);
//  console.log("data.data[2].data in single.jsx");
//  console.log("data.data[2].data in single.jsx");
} catch (error) {
 console.log(error);
 errorNotification('Peeking allowed… but for full access, we need to know who you are!');
 return navigate('/login');
}
}
fetchData();
},[postId,isPostLiked,comment,comments])


const addComment = async(e) => {

  console.log('addComment called');
  e.preventDefault();

  try {
    await axios.post(`/api/v1/posts/comment/${post.postId}/${post.postUserId}`,{comment})
    setComment('');
    return successNotification("Comment added successfully");
  } catch (error) {
    return console.log(error);
  }
}

const deleteComment = async(commentId) => {
  // e.preventDefault();
  try {
    await axios.delete(`/api/v1/posts/comment/${post.postId}/${commentId}`);
    return successNotification("Comment deleted successfully");
  } catch (error) {
    return console.log(error);
  }
}

const toggleLike = async() => {
 console.log('toggleLike function called');
try {
  await axios.post(`/api/v1/posts/like/${post.id}/${post.postUserId}`);
  setIsPostLiked(!isPostLiked);
  return null;
} catch (error) {
  return console.log(error);
}
}


return (
 <div className="single">
   <div className="content">
     <img
       src={`../../public/upload/${post.img}`}
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
         <Link to={`/write?edit=${postId}`} state={post}>
           <img src={Edit} alt="edit" />
         </Link>
         <img onClick={deletePost} src={Delete} alt="delete" />
       </div>:
       <></>
       }
     </div>
     <div className="post-stats">
     <div className="like">
       <button onClick={() => toggleLike()}>{ isPostLiked ?
     <FaHeart className='liked-button'></FaHeart>
     :
    <FaRegHeart className="like-button"></FaRegHeart>
     }
     </button>
    <p className="like-count">{post.likesCount}</p>
    </div>
     <div className="comment">
       <button>{
         <FaRegComment className="comment-button"></FaRegComment>
       }
     </button>
    <p className="like-count">{post.commentsCount}</p>
    </div>
    </div>
     <h1>
      {post.title}
     </h1>
     <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.description),
        }}
        ></p>
        <div className="comment-container">
     <div className="add-comment">
      <form onSubmit={(e) => addComment(e)} className="comment-form">
      <input value={comment} type="text" id="comment-field" className="comment-field" placeholder="Leave a comment..." onChange={(e) => {
        setComment(e.target.value);
      }}/>
      <button type="submit" className="add-comment-button">Add</button>
      </form>
     </div>
     <div className="display-comments">
       { comments.map( (comment) => {
         return(
           <div className="comment">
     <div className="user">
       {comment.img ? <img src={comment.img} alt="img" /> : <FaUserCircle className="icon"></FaUserCircle>}
       {/* {post.userImage && <img src={post.userImage} alt="img" />} */}
       <div className="info">
        <div className="user-info">
         <span>{comment.username}</span>
         <p>{moment(comment.createdAt).fromNow()}</p>
         </div>{ comment.commentedByUser === currentUser.data.id ? 
          <FaTrash onClick={() => deleteComment(comment.commentId)} className="delete-comment"></FaTrash>
          :
          <></>
         }
       </div>
     </div>
     <div className="comment-text">
       {comment.comment}
     </div>
</div>
         )
       })
}
     </div>
   </div>
   </div>
   {post?.cat && <Menu cat={post.cat}></Menu>}
 </div>
);
};








export default Single;







