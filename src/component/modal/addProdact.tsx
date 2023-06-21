

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
import usestore from "../../store"
import axios from 'axios';
import UploadImages from '../UploadImages'

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
  const [thumbnailSrc, setThumbnailSrc] = useState<unknown | string>('');
  const [imgsSrc, setImgsSrc] = useState<unknown[] | never[]>([]);
  const [Name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [Desc, setDesc] = useState("")

  let newdata = new FormData();
  const reload = usestore((state) => state.reload)
  const setReload = usestore((state) => state.setReload)
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
    setName(e.target.value)
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value)
  };
  
  const handleDescChange = (value) => {
    setDesc(value)
  };
  const handlequantityChange = (e) => {
    setQuantity(e.target.value)
  };

  const handleImageDelete = (index) => {
    const imagesCopy = [...currentImages];
    imagesCopy.splice(index, 1);
    setCurrentImages(imagesCopy);
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
    setCategoryValue(event.target.value);
    console.log(categoryValue)


  };


  const handleSubmit = (id:string) => {
    newdata.append('name', Name);
    newdata.append('price', price)
    newdata.append('quantity', quantity)
    newdata.append('category', categoryValue)
    newdata.append('subcategory', subcategoryValue)
    newdata.append('description', Desc)
    newdata.append('brand', 'apple');
    newdata.append('thumbnail', thumbnailSrc);
    imgsSrc.map((item: any) => {
    newdata.append('images', item);
    })
    axios.post(`http://localhost:8000/api/products`, newdata)
    setReload(!reload)
    setOpen(false)



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


        <UploadImages
  setImgsSrc={setImgsSrc}
  setThumbnailSrc={setThumbnailSrc}
/>



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
        <TextField name="quantity"  label="موجودی" sx={{width:1}} onChange={(value)=>handlePriceChange(value)}
/>
        <TextField name="price"  label="قیمت" sx={{width:1}} onChange={(e)=>handlequantityChange(e)}/>


        <Box className="reletive w-full mt-10">
        <Editor            
        value={"توضیحات"}
        onChange={(value)=>handleDescChange(value)}
     />
        </Box>
    

        <DialogActions>
          <Button onClick={handleClose}>لغو</Button>
          <Button onClick={handleSubmit}>ذخیره</Button>
        </DialogActions>
    </Box>

        </DialogContent>

      </Dialog>
    </div>
  );
}
