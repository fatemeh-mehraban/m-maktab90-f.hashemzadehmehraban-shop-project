
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { useRef,useCallback } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import dynamic from "next/dynamic";
import { useState, useEffect,useMemo} from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getCategory, getSubCategory } from '@/lib/services/axios'
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import usestore from "../../store"
import Image from 'next/image'
import UploadImages from '../UploadImages'

// import {useDropzone}  from 'react-dropzone'
// import Dropzone from 'react-dropzone'

export default function FormDialogEdit(data) {
  const refTextEditor = useRef(null);

  const [open, setOpen] = React.useState(false);
  const [categoryValue, setCategoryValue] = useState('');
  const [subcategoryValue, setSubCategoryValue] = useState('');
  const [category, setCategory] = useState([])
  const [subcategory, setSubCategory] = useState([])
  const [Name, setName] = useState(data.data ? data.data.name : "")
  const [price, setPrice] = useState(data.data ? data.data.price : "")
  const [quantity, setQuantity] = useState(data.data ? data.data.quantity : "")
  const [editor,setEditor]=useState(data.data ? data.data.description : "")
  const [img, setImg] = useState(data.data ? data.data.images : "")
  const [imgName, setImgName] = useState([])
  const [currentThumbnailName, setCurrentThumbnailName] = useState([])
  const ReactQuill = useMemo(
    () => dynamic(import('react-quill'), { ssr: false }),
    []
    );
  let newdata = new FormData();
  const reload = usestore((state) => state.reload)
  const setReload = usestore((state) => state.setReload)
  const [currentThumbnail, setCurrentThumbnail] = useState(data.data ? ["http://localhost:8000/images/products/thumbnails/" + data.data.images[0]] : "");


  const [thumbnailSrc, setThumbnailSrc] = useState(data.data ? `http://localhost:8000/images/products/thumbnails/${data.data.images[0]}` : "");
  const [imgsSrc, setImgsSrc] = useState([`http://localhost:8000/images/products/images/${ data.data.images[0]}`]);



  const [currentImages, setCurrentImages] = useState(data.data ? [`http://localhost:8000/images/products/images/${data.data.images[0]}`] : "");
  const [currentImages2, setCurrentImages2] = useState(data.data ? [`http://localhost:8000/images/products/thumbnails/${data.data.images[0]}`] : "");
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
//  **********************
 
 
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
setThumbnailSrc(Array[0]);
}
  // // ***********************************************************************



  // // ****************************************************************


  const handleImageDelete = (index) => {
    const imagesCopy = [...currentImages];
    imagesCopy.splice(index, 1);
    setCurrentImages(imagesCopy);
  };
  
  const handleChange = (event: SelectChangeEvent) => {
    setCategoryValue(event.target.value as string);
    console.log(categoryValue)
  };
  const handleChangesub = (event: SelectChangeEvent) => {
    setSubCategoryValue(event.target.value as string);
  
  };
  
  
  useEffect(()=>{    
    getCategory().then((res:any)=>{
      setCategory(res.data.data.categories)
    })
  
  },[])
  useEffect(()=>{    
    getSubCategory().then((res:any)=>{
      setSubCategory(res.data.data.subcategories)
    })
  
  },[])
  
  const handleNameChange = (e) => {
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
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false)
  };
  const handleSubmit = (id:string) => {
    console.log(refTextEditor.currentValue);
    imgsSrc
    newdata.append('name', Name);
    newdata.append('price', price)
    newdata.append('quantity', quantity)
    newdata.append('description', editor)
    newdata.append('category', categoryValue)
    newdata.append('subcategory', subcategoryValue)
    newdata.append('thumbnail',thumbnailSrc);
    imgName.map(item=>newdata.append('images', item))

      setReload(!reload)
    setOpen(false)
  // useEffect(()=>{

    axios.patch(`http://localhost:8000/api/products/${id}`, newdata)
  // },[newdata])
  };
  

  const onchange =(e)=>{
    console.log(e)
    setEditor(e)
      }
  
  return (
    <div >
       <Box >
       <EditOutlinedIcon sx={{color:"green", ml:1  }} onClick={handleClickOpen}/>
      </Box>

      <Dialog open={open} onClose={handleClose} dir="rtl"  >
        <DialogTitle>  ویرایش محصول</DialogTitle>
        <DialogContent sx={{display:"flex" , flexDirection: 'column', gap:4}}>
        <Box component="form" noValidate autoComplete="off" className="flex flex-col items-center gap-3 my-5" dir="rtl">

        <div className="flex flex-col gap-5 w-full ">
            <div className="flex gap-10">
              {currentImages && currentImages.map((image, index) => (
                <div key={index} className="rounded-xl">
                  <Image className="rounded-xl" src={image} alt="" onChange={(e)=>handleInputChange(e)} width={100} height={150}/>
                  <Button onClick={() => handleImageDelete(index)}>Delete</Button>
                </div>
              ))}
  </div>
  <div> 
    <span className="text-green-500 font-bold">عکس کالا: </span>
    <input type="file" ref={fileInputRef && fileInputRef} onChange={handleImageChange} onClick={() => fileInputRef.current.click()} multiple />
    </div>
          </div>

{/* ***************************************************** */}

<div className="flex flex-col gap-5 w-full">
    <div className="flex gap-10">
      <div>
        <Image src={currentThumbnail} alt="" width={150} height={150}/>
      </div>
    </div>
    <input type="file" ref={fileInputRef2} onChange={handleThumbnailChange } onClick={() => fileInputRef2.current.click()} />
  </div>

{/* <UploadImages
  // value={value}
  // errors={errors}
  // register={register}
  setImgsSrc={setImgsSrc}
  setThumbnailSrc={setThumbnailSrc}
  imgsSrc={imgsSrc}
  thumbnailSrc={thumbnailSrc}
/> */}


{/* ***************************************** */}

        <TextField label="نام کالا" sx={{width:1}} defaultValue={data.data && data.data.name} value={Name}  onChange={(e)=>handleNameChange(e)} />

        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{!categoryValue ? data.data&&  data.data.category.name:"دسته بندی"}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryValue}
          defaultValue={data.data && data.data.category.name}
          placeholder={data.data && data.data.category.name}
          label="دسته بندی"
          onChange={handleChange}
        >
          {category.map(item=>  (
    <MenuItem key={item.id} defaultValue={item.name} value={item._id} sx={{paddingX:"50px"}} dir="rtl">{item.name}</MenuItem> 
    
          ))
        }

        </Select>
        </FormControl>




        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label2">{!subcategoryValue  ? data.data && data.data.subcategory.name:" زیرمجموعه"}</InputLabel>
        <Select
          labelId="demo-simple-select-label2"
          id="demo-simple-select"
          value={subcategoryValue}
          defaultValue={data.data && data.data.subcategory.name}
          placeholder={data.data && data.data.subcategory.name}
          label=" زیرمجموعه"
          onChange={handleChangesub}
        >
          {subcategory.map(item=>  (
        <MenuItem key={item.id} defaultValue={item.name} value={item._id} sx={{paddingX:"50px"}} dir="rtl">{item.name}</MenuItem> 
    
          ))
        }

        </Select>
        </FormControl>
        <TextField  label="موجودی" sx={{width:1}} value={quantity}  defaultValue={data.data && data.data.quantity} onChange={(e)=>handlequantityChange(e)}/>
        <TextField  label="قیمت" sx={{width:1}} value={price}  defaultValue={data.data && data.data.price} onChange={(e)=>handlePriceChange(e)} />
        <Box className="reletive w-full mt-10">
        <ReactQuill
     theme="snow"
      value={editor}
      placeholder="ـوضیحات"
      onChange={
        onchange
      }
    />
        </Box>


        <DialogActions>
          <Button onClick={handleClose}>لغو</Button>
          <Button onClick={()=>handleSubmit(data.data._id)}>ذخیره</Button>
        </DialogActions>
    </Box>

        </DialogContent>

      </Dialog>
    </div>
  );
}
