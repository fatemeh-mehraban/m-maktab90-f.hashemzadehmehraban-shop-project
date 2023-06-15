

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
import  { useRef,useState,useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import dynamic from "next/dynamic";
import Image from 'next/image'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getCategory ,getSubCategory} from '@/lib/services/axios'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';

export default function FormDialog(row:any , userName:any) {
  const [open, setOpen] = React.useState(false);
  const Editor = dynamic(() => import("../editor/editor"), { ssr: false });
  
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [categoryValue, setCategoryValue] =useState('');
  const [subcategoryValue, setSubCategoryValue] =useState('');
  const [currentThumbnail, setCurrentThumbnail] = useState();
  const [currentImages, setCurrentImages] = useState([]);
  const [img , setImg] = useState("")
  const [imgName , setImgName] = useState([])
  const [currentThumbnailName , setCurrentThumbnailName] = useState([])
  // *****************************************************************
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = [...currentImages];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setCurrentImages([...currentImages, ...newImages]);
        }
      };
      reader.readAsDataURL(files[i]);
    }

  const imageName2 = e.currentTarget.files;
  const entries=Object.entries(imageName2); 
  const Array=entries.map(item=>item[1]) 
  setImgName(Array);
  }
  // ***********************************************************************
  const fileInputRef2 = useRef(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];

    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i];
    //   console.log(file)

      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => {
          setCurrentThumbnail(reader.result);
      };
      reader.onerror=()=>{
        consol.log(reader.error)
      }
  const imageName2 = e.currentTarget.files;
  const entries=Object.entries(imageName2); 
  const Array=entries.map(item=>item[1]) 
   setCurrentThumbnailName(Array[0]);
  }


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    console.log(e.target.value)
  };
console.log(row)

  useEffect(() => {
    getCategory().then(res=> setCategory(res.data.data.categories))
  }, [])

  useEffect(() => {
    getSubCategory().then(res=> {setSubCategory(res.data.data.subcategories)
      
      // res.data.data.subcategories.map(item=>{
    
      //   category.map(category=>{
      //     item.category === category._id && setSubCategory(...subCategory,item)
      //   })
    })
  }, [])

  const handleChangesub = (event: SelectChangeEvent) => {
    setSubCategoryValue(event.target.value as string);
  };
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategoryValue(event.target.value as string);
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


        <div className="flex flex-col gap-5 w-full">
    <div className="flex gap-10">
    {currentImages && currentImages.map((image, index) => (
      <div key={index}>
        <Image src={image} alt="" onChange={(e)=>handleInputChange(e)} width={150} height={150}/>
        <Button onClick={() => handleImageDelete(index)}>Delete</Button>
      </div>
    ))}
    </div>
    <input type="file" ref={fileInputRef} onChange={handleImageChange } onClick={() => fileInputRef.current.click()} multiple />
  </div>
{/* ***************************************** */}

<div className="flex flex-col gap-5 w-full">
    <div className="flex gap-10">
      <div>
        <Image src={currentThumbnail} alt="" width={150} height={150}/>
      </div>
    </div>
    <input type="file" ref={fileInputRef2} onChange={handleThumbnailChange } onClick={() => fileInputRef2.current.click()} />
  </div>

{/* ***************************************** */}

        <TextField name="name"  label="نام کالا" sx={{width:1}} onChange={(e)=>handleChange(e)}/>


        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> دسته بندی</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryValue}
          label="دسته بندی"
          onChange={handleChangeCategory}
        >
          { category && category.map(item=>  (
    <MenuItem key={item.id} defaultValue={item.name} value={item._id} sx={{paddingX:"50px"}} dir="rtl">{item.name}</MenuItem> 
  ))
        }

        </Select>
        </FormControl>
{/* /* **************************************************************************************** */}

        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label2"> زیرمجموعه</InputLabel>
        <Select
          labelId="demo-simple-select-label2"
          id="demo-simple-select"
          value={subcategoryValue}
          label=" زیرمجموعه"
          onChange={handleChangesub}
        >
          {subCategory && subCategory.map(item=>  (
    <MenuItem key={item.id} defaultValue={item.name} value={item._id} sx={{paddingX:"50px"}} dir="rtl">{item.name}</MenuItem> 
    
          ))
        }

        </Select>
        </FormControl> 
{/* ************************************************************* */}
        <TextField name="quantity"  label="موجودی" sx={{width:1}}/>
        <TextField name="price"  label="قیمت" sx={{width:1}}/>


        <Box className="reletive w-full mt-10">
        <Editor            
        value={"توضیحات"}
        onChange={(v:any) => console.log(v)}

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
