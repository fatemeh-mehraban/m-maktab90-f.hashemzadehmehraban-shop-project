

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
import  { useRef,useState,useEffect, useMemo } from 'react';
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
import swal from 'sweetalert';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "Zod";
import { useForm } from "react-hook-form";

import 'react-quill/dist/quill.snow.css';
export default function FormDialog(row:any , userName:any) {

  const personSchema = z.object({
    name: z.string().min(1, { message: "نام وارد نشده  است" }),
    category: z.string().min(1, { message: "دسته بندی وارد نشده  است" }),
    // subcategory: z.string().min(1, { message: "زیرمجموعه وارد نشده است" }),
    inventor: z.string().min(1, { message: "تعداد وارد نشده است" }),
    price: z.string().min(4, { message: "قیمت وارد نشده است" }),
    // description: z.string().min(1, { message: " توضیحات وارد نشده است  " }),
  })
  const { register , handleSubmit , formState:{errors} } = useForm( {resolver: zodResolver(personSchema)});

  const [open, setOpen] = React.useState(false);
  const ReactQuill = useMemo(
    () => dynamic(import('react-quill'), { ssr: false }),
    []
    );
  
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [categoryValue, setCategoryValue] =useState('');
  const [subcategoryValue, setSubCategoryValue] =useState('');
  const [img , setImg] = useState("")
  const [imgName , setImgName] = useState([])
  const [currentThumbnailName , setCurrentThumbnailName] = useState([])
  const [Name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [editor,setEditor]=useState("")
  const [currentThumbnail, setCurrentThumbnail] = useState("");


  const [thumbnailSrc, setThumbnailSrc] = useState("");
  const [imgsSrc, setImgsSrc] = useState([]);



  const [currentImages, setCurrentImages] = useState("");
  const [currentImages2, setCurrentImages2] = useState("");
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
      console.log(reader.error)
    }
const imageName2 = e.currentTarget.files;
const entries=Object.entries(imageName2); 
const Array=entries.map(item=>item[1]) 
setThumbnailSrc(Array[0]);
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
  const refTextEditor= useRef(null)
  const handleDescChange = (e) => {
    console.log(e)
    // setDesc(e)
  };
  const handlequantityChange = (e) => {
    setQuantity(e.target.value)
  };

  const handleImageDelete = (index) => {
    const imagesCopy = [...currentImages];
    imagesCopy.splice(index, 1);
    setCurrentImages(imagesCopy);
  };


// console.log(row)

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


  const handleSubmit2 = () => {
    newdata.append('name', Name);
    newdata.append('price', price)
    newdata.append('quantity', quantity)
    newdata.append('category', categoryValue)
    newdata.append('subcategory', subcategoryValue)
    newdata.append('description', editor)

    newdata.append('brand', 'apple');
    // newdata.append('thumbnail', thumbnailSrc);
    imgName.map((item: any) => {
    newdata.append('images', item);
    })
    // if(Name!==null && price!==null && quantity!==null && categoryValue!==null && subcategoryValue!==null && editor!==null && imgName.length>0){
      axios.post(`http://localhost:8000/api/products`, newdata)
      swal(`${Name}`, ` !به محصولات اضافه شد`, "success")
    // }
    setReload(!reload)
    setOpen(false)
    


  };



  const onchange =(e:any)=>{
    console.log(e)
    setEditor(e)
      }

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
        <Box component="form" noValidate autoComplete="off" className="flex flex-col items-center gap-3 my-5" dir="rtl" onSubmit={handleSubmit(handleSubmit2)}>


        <div className="flex flex-col gap-5 w-full ">
            <div className="flex gap-10">
              {currentImages && currentImages.map((image:any, index:any) => (
                <div key={index} className="rounded-xl">
                  <Image className="rounded-xl" src={image} alt=""  width={100} height={150}/>
                  <Button onClick={() => handleImageDelete(index)}>Delete</Button>
                </div>
              ))}
  </div>
  <div> 
    <span className="text-green-500 font-bold">عکس کالا: </span>
    <input type="file" ref={fileInputRef && fileInputRef} onChange={handleImageChange} onClick={() =>fileInputRef && fileInputRef.current.click()} multiple />
    </div>
          </div>

{/* ***************************************************** */}

{/* <div className="flex flex-col gap-5 w-full">
    <div className="flex gap-10">
      <div>
        <Image src={currentThumbnail} alt="" width={150} height={150}/>
      </div>
    </div>
    <input type="file" ref={fileInputRef2} onChange={handleThumbnailChange } onClick={() => fileInputRef2 && fileInputRef2.current.click()} />
  </div> */}



{/* ***************************************** */}

        <TextField name="name"  label="نام کالا" inputProps={{...register("name",{required:"نام کاربری را وارد کنید"})}} sx={{width:1}} onChange={(e)=>handleChange(e)}/>
        {errors.name && <p className="text-red-500 text-xs pb-5">نام کاربری را وارد کنید!</p>}


        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> دسته بندی</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryValue}
          label="دسته بندی"
          onChange={handleChangeCategory}
          inputProps={{...register("category",{required:"دسته بندی  را وارد کنید"})}}
        >
          { category && category.map((item:any)=>  (
    <MenuItem key={item.id} defaultValue={item.name} value={item._id} sx={{paddingX:"50px"}} dir="rtl">{item.name}</MenuItem> 
  ))
        }

        </Select>
        {errors.category && <p className="text-red-500 text-xs pb-5">نام دسته بندی را وارد کنید!</p>}
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
          inputProps={{...register("subCategory",{required:" نام زیرمجموعه  را وارد کنید"})}}

        >
          {subCategory && subCategory.map((item:any)=>  (
    <MenuItem key={item.id} defaultValue={item.name} value={item._id} sx={{paddingX:"50px"}} dir="rtl">{item.name}</MenuItem> 
    
          ))
        }

        </Select>
        {/* {errors.subcategory && <p className="text-red-500 text-xs pb-5">نام  زیرمجموعه را وارد کنید!</p>} */}

        </FormControl> 
{/* ************************************************************* */}
        <TextField name="inventor" inputProps={{...register("inventor",{required:" تعداد  را وارد کنید"})}}  label="موجودی" sx={{width:1}} onChange={(value)=>handlePriceChange(value)}
/>     
   {errors.inventory && <p className="text-red-500 text-xs pb-5">  تعداد را وارد کنید!</p>}

        <TextField name="price" inputProps={{...register("price",{required:" قیمت  را وارد کنید"})}}  label="قیمت" sx={{width:1}} onChange={(e)=>handlequantityChange(e)}/>
        {errors.price && <p className="text-red-500 text-xs pb-5">  قیمت را وارد کنید!</p>}


        <Box className="reletive w-full mt-10">
        {/* <Editor            
        value={editor}
        onChange={onchange}
     /> */}

<ReactQuill
     theme="snow"
      value={editor}
      placeholder="ـوضیحات"
      onChange={
        onchange
      }
    />
   {/* {errors.description && <p className="text-red-500 text-xs p-3"> توضیحات را به درستی وارد کنید!</p>} */}

        </Box>
    

        <DialogActions>
          <Button onClick={handleClose}>لغو</Button>
          <Button type="submit" >ذخیره</Button>
        </DialogActions>
    </Box>

        </DialogContent>

      </Dialog>
    </div>
  );
}
