import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

interface EditorType{
  value:any,
  onChange:(x:string)=>void,
  refTextEditor:any
}
const Editor = ({
  value,
  onChange,
  refTextEditor
  
}:EditorType) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
        // setDesc(data)
        refTextEditor.currentvalue=data
      }}
    />
  );
};

export default Editor