import React from 'react';
import { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';


const Write = () => {

  const editor = useRef(null);
  const [content, setContent] = useState('');
  console.log(content);

  return (
    <div className='add'>
      <div className="content">
        <input type="text" placeholder='label' />
        <div className="editorContainer">
          <JoditEditor
            ref={editor}
            value={content}
            onChange={newContent => { setContent(newContent) }}
            autofocus
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">i1</div>
        <div className="item">i2</div>
      </div>
    </div>
  )
}


export default Write