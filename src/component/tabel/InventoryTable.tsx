// جدول موجودی های کالا
import { GlobalContext } from "@/context/GlobalContext"
import { useContext,useState,useEffect } from "react"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Button from "../kit/button"
import { IconButton } from "@mui/material";
import  axios  from 'axios';
import { Suspense } from 'react';
import LinearBuffer from "../loading";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import  { Component } from 'react';
import EasyEdit from 'react-easy-edit';
import { searchInput } from './../../component/kit/searchInput';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
export default function InventoryTable({limit ,search}:{limit:number,search:string}) {
    const [products , setProducts] = useState([])
    let counter = products.length
    const [page,setPage] = useState(1)
    const [price,setPrice] = useState(true)
    const [quantity,setQuantity] = useState(true)
    const [searchTxt,setSearchTxt] = useState("")
    // const [search , setsearch] = useState("")

    useEffect(()=>{    
        const res = axios.get(`http://localhost:8000/api/products?page=${page}&limit=${limit}&fields=-rating,-createdAt,-updatedAt,-__v&sort=${price ? "price":"-price"}}`)
        .then((res:any)=>{
            // newsearch=res.data.data.products.name.includes(search)
            // const c= res.data.data.products
            setProducts(res.data.data.products)
            counter = res.data.data.products.length
            // const d = c.filter(item=>{
            //    return item.name.includes(search)

            
            // })
            // setProducts(d)
            
            // console.log(res.data.data.products)
        })
  
  },[page,limit,price,quantity])
    
useEffect(()=>{    
       const res = axios.get(`http://localhost:8000/api/products?name=${searchTxt}`)
        .then((res:any)=>{
            const c = res.data.data.products
            const d = c.filter(item=>{
                   return item.name.includes(search)
    
                
                })
            console.log("d",d )
            setSearchTxt(...d)
            search && setProducts(d)

       })
  
  },[search])


const nextpage=()=>{
    if( counter>= limit  ){        
        setPage(page + 1)
    }
    
}

const beforpage =()=>{
    if( page > 1 ){
    setPage(page - 1)
}
}
const sortPrice =()=>{
    // setQuantity(true)
    setPrice(!price)
}
const sortQuantity =()=>{
    // setPrice(true)
    setQuantity(!quantity)
}
// const handleEsc =(e)=>{
//     if(e.key === 'Esc'){
//         console.log('enter press here! ')
//       }
    
// }
const save = (value,fieldName,item) => {
    // alert(value)
    console.log(fieldName)

    const data = {
        [fieldName]:value
 }
    axios.patch(`http://localhost:8000/api/products/${item}`, data)

}
const cancel = () => {alert("Cancelled")}

    const searchfunction = (e:any)=>{
        setSearchTxt(e.target.value)
    }
    
  return(
        <div className="py-40 mt-20  w-full flex flex-col justify-center items-center px-5"> 
        <div className="flex justify-left w-[65%]">
        <div className='border border-[#120051] rounded-md mb-5 w-auto'>
        <YoutubeSearchedForIcon className="bg-[#120051] text-white h-full pb-4 text-6xl px-4 py-2"/>
        <input type="text" placeholder="جستجو ..." dir="rtl" className="p-2 outline-none" onChange={(e)=>searchfunction(e)}/>
      </div>
        </div>
        <table className="w-[65%] border overflow-x-scroll" dir="rtl">
            <thead className="bg-[#120051] text-white">
                <tr className="border-b">
                    <th className="p-5">تصویر</th>
                    <th className="p-5 text-right px-5">عنوان</th>
                    <th className="py-5 curser-pointer text-right" onClick={sortPrice}>قیمت {price ?<ArrowDropUpIcon />:<ArrowDropDownIcon/> }</th>
                    <th className="py-5 curser-pointer text-right" onClick={sortQuantity}>موجودی {quantity?<ArrowDropUpIcon/>:<ArrowDropDownIcon/> }</th>

                </tr>

            </thead>
            <tbody>
                {
        products.map((item:any)=>{

        return (

            <>
             
            <tr className="border-b hover:bg-gray-100 hover:border-red-500 hover:border">
                <th className=" w-32 p-2"><img src={`http://localhost:8000/images/products/images/${item.images[0]}`} alt="" /></th>
                <th className="w-1/4 text-right px-5">{item.name}</th>
                <th className="w-1/4 text-right px-5" >
                <EasyEdit
                     type="text"
                     value={item.price}
                     attributes={{ name: "price", id: 1 , className:"w-20" }}
                     onSave={(value)=>save(value,'price',item._id)}
                     onCancel={cancel}
                     saveButtonLabel="ذخیره"
                     cancelButtonLabel="لغو"
                     onKeyPress={(e)=>handleEsc(e)}
                />
                </th>
                <th className="text-right px-5">
                <EasyEdit
                     type="text"
                     value={item.quantity}
                     onSave={(value)=>save(value,'quantity',item._id)}
                     onCancel={cancel}
                     saveButtonLabel="ذخیره"
                     cancelButtonLabel="لغو"
                     attributes={{ name: "quantity", id: 1, className:"w-20" }}
                     
                 />
                </th>

            </tr>
            
            </>
        )
        })
      }       

            </tbody>
        </table>


        <div className="flex justify-center p-5 " dir="rtl">
            <div className='border border-[#120051] w-40 flex justify-between items-center rounded-md'>
            <IconButton aria-label="Example"  onClick={beforpage} >
                
                <KeyboardArrowRightIcon className='text-[#120051]'/>
            </IconButton> 
            <span className='border border-t-0 border-[#120051] border-b-0 h-full px-7 py-2 text-[#120051]'> {page} </span>
            <IconButton aria-label="Example" onClick={nextpage}>
            <KeyboardArrowLeftIcon className='text-[#120051]'/>
            </IconButton>    
            </div>
       
    
            </div>
    </div>
)}