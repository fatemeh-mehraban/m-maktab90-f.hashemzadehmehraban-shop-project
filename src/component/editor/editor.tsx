import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
interface props {
  value: string |undefined;
  refTextEditor: any;
}
const TextEditor = ({ value, refTextEditor }: props) => {
  const [values, setValue] = useState('');
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={(e) => {
        setValue(e);
        refTextEditor && refTextEditor.currentValue=e;
      }
    }
    />
  );
};

export default TextEditor;
