import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@juniyadi/ckeditor5-custom-build";

interface EditorType{
  value:string,
  editor:any
  // onChange:(x:string)=>void
}
const Editor = ({
  value,
  editor
}:EditorType) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      // onChange={(event, editor) => {
      //   const data = editor.getData();
      //   onChange(data);
      // }}
      editor={Editor}
    />
  );
};

export default Editor