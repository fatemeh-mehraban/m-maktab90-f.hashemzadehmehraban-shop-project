

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { CKBox } from "@ckbox/core";
import { Component } from 'react';
import  {CKEditor}  from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  { useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import dynamic from "next/dynamic";
export default function FormDialog(row:any , userName:any) {
  const [open, setOpen] = React.useState(false);

  const Editor = dynamic(() => import("../editor/editor"), { ssr: false });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
       <Box >
          <Button sx={{bgcolor: 'success.main', color:"gray",paddingY:"20px"}} onClick={handleClickOpen}>
            <AddIcon className='text-green-600'/>
            اضافه کردن محصول
          </Button>   
      </Box>
      <Dialog open={open} onClose={handleClose} dir="rtl"  >
        <DialogTitle> محصول جدید</DialogTitle>
        <DialogContent sx={{display:"flex" , flexDirection: 'column', gap:4}}>
        <Box component="form" noValidate autoComplete="off" className="flex flex-col items-center gap-3 my-5" dir="rtl">
        
        <TextField  type="file"   inputProps={{multiple: true}}/>
        <TextField label="نام کالا" sx={{width:1}} />
        <TextField  label="دسته بندی" sx={{width:1}}/>
        <TextField  label="زیرمجموعه "sx={{width:1}}/>
        {/* <Box > */}
        <TextField  label="موجودی" sx={{width:1}}/>
        <TextField  label="قیمت" sx={{width:1}}/>
        {/* </Box> */}


        <Box className="reletive w-full mt-10">
        <Editor            
        value={"توضیحات"}
        onChange={(v) => console.log(v)}

     />
        </Box>


        <DialogActions>
          <Button onClick={handleClose}>لغو</Button>
          <Button onClick={handleClose}>ذخیره</Button>
        </DialogActions>
    </Box>

        </DialogContent>

      </Dialog>
    </div>
  );
}
