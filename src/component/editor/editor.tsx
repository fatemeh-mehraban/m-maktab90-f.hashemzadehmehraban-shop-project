import dynamic from 'next/dynamic';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface props {
  value: string |undefined;
  onChange: ()=>void;
}
const TextEditor = ({ value, onChange }: props) => {
  const ReactQuill = useMemo(
    () => dynamic(import('react-quill'), { ssr: false }),
    []
    );

  return (
    // <ReactQuill
    //   theme="snow"
    //   value={value}
    //   onChange={(e) => {
    //     setValue(e);
    //     refTextEditor && refTextEditor.currentValue=e;
    //   }
    // }
    // />
    <>
    <ReactQuill
     theme="snow"
      value={value}
      placeholder="ـوضیحات"
      onChange={
        onChange
      }

    />
    </>
  );
};

export default TextEditor;
