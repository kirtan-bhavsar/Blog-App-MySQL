import React from 'react';
import { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Write = () => {

  const state = useLocation().state;
  console.log(state);
  console.log("state");

  const navigate = useNavigate();

 const editor = useRef(null);
 const [content, setContent] = useState(state?.description || '');
 const [title,setTitle]  = useState(state?.title || "");
 const [file,setFile] = useState(null);
 const [cat,setCat] = useState(state?.cat || '');

 const upload = async() => {
  try {
    const formData = new FormData();
    formData.append('file',file);
    const res = await axios.post('/api/v1/upload',formData);
    return res.data ;
  } catch (error) {
    console.log(error);
  }
 }

 const editorConfig = useMemo(() => ({
   height: 275
 }), []);

 const submitPost = async(e) => {
  e.preventDefault();
  const imgUrl = await upload();
  try {
    state ? 
    await axios.put(`/api/v1/posts/${state.id}`,{
      description:content,
      title,
      img : file ? imgUrl : "",
      cat
    }) : 
    await axios.post(`/api/v1/posts`,{
      description:content,
      title:title,
      img : file ? imgUrl : "",
      cat:cat,
      date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    });
    navigate('/')
  } catch (error) {
    console.log(error);
  }
 }

 return (
   <div className='add'>
     <div className="content">
       <input type="text" placeholder='Label' value={title} onChange={(e) => {
        setTitle(e.target.value)
        console.log(title);
        }}/>
       <div className="editorContainer">
         <JoditEditor
           className='editor'
           ref={editor}
           value={content}
           config={editorConfig}
           onChange={newContent => { setContent(newContent) }}
         />
       </div>
     </div>
     <div className="menu">
       <div className="item">
         <h1>Publish</h1>
         <span>
           <b>Status: </b> Draft
           </span>
           <span>
           <b>Visibility: </b> Public
           </span>
           <input type="file" id='file' style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])}/>
           <label className='file' htmlFor="file">Upload Image</label>
           <div className="buttons">
             <button>Save as a Draft</button>
             <button onClick={(e) => submitPost(e)}>Publish</button>
           </div>
       </div>
       <div className="item">
         <h1>Category</h1>
         <div className="cat">
         <input type="radio" checked={cat === 'art'} value='art' id='art' name='cat' onChange={(e) => setCat(e.target.value)} />
         <label htmlFor="art">Art</label>
         </div>
         <div className="cat">
         <input type="radio" checked={cat === 'science'} value='science' id='science' name='cat' onChange={(e) => setCat(e.target.value)} />
         <label htmlFor="science">Science</label></div>
         <div className="cat">
         <input type="radio" checked={cat === 'technology'} value='technology' id='technology' name='cat' onChange={(e) => setCat(e.target.value)} />
         <label htmlFor="technology">Technology</label></div>
         <div className="cat">
         <input type="radio" checked={cat === 'cinema'} value='cinema' id='cinema' name='cat' onChange={(e) => setCat(e.target.value)} />
         <label htmlFor="cinema">Cinema</label></div>
         <div className="cat">
         <input type="radio" checked={cat === 'design'} value='design' id='design' name='cat' onChange={(e) => setCat(e.target.value)} />
         <label htmlFor="design">Design</label></div>
         <div className="cat">
         <input type="radio" checked={cat === 'food'} value='food' id='food' name='cat' onChange={(e) => setCat(e.target.value)} />
         <label htmlFor="food">Food</label></div>
       </div>
     </div>
   </div>
 )
}




export default Write