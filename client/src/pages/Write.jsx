import React from 'react';
import { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';




const Write = () => {


 const editor = useRef(null);
 const [content, setContent] = useState('');
 console.log(content);


 const editorConfig = useMemo(() => ({
   height: 275
 }), []);


 return (
   <div className='add'>
     <div className="content">
       <input type="text" placeholder='Label' />
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
           <input type="file" id='file' style={{display:"none"}}/>
           <label className='file' htmlFor="file">Upload Image</label>
           <div className="buttons">
             <button>Save as a Draft</button>
             <button>Update</button>
           </div>
       </div>
       <div className="item">
         <h1>Category</h1>
         <div className="cat">
         <input type="radio" value='art' id='art' name='cat' />
         <label htmlFor="art">Art</label>
         </div>
         <div className="cat">
         <input type="radio" value='science' id='science' name='cat' />
         <label htmlFor="science">Science</label></div>
         <div className="cat">
         <input type="radio" value='technology' id='technology' name='cat' />
         <label htmlFor="technology">Technology</label></div>
         <div className="cat">
         <input type="radio" value='cinema' id='cinema' name='cat' />
         <label htmlFor="cinema">Cinema</label></div>
         <div className="cat">
         <input type="radio" value='design' id='design' name='cat' />
         <label htmlFor="design">Design</label></div>
         <div className="cat">
         <input type="radio" value='food' id='food' name='cat' />
         <label htmlFor="food">Food</label></div>
       </div>
     </div>
   </div>
 )
}




export default Write