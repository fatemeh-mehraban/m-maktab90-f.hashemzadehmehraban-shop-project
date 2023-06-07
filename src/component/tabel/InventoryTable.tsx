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

export default function InventoryTable({limit ,search}:{limit:number,search:string}) {
    const [products , setProducts] = useState([])
    let counter = products.length
    const [page,setPage] = useState(1)
    const [price,setPrice] = useState(true)
    const [quantity,setQuantity] = useState(true)
    const [searchTxt,setSearchTxt] = useState("")
    
    useEffect(()=>{    
        const res = axios.get(`http://localhost:8000/api/products?page=${page}&limit=${limit}&fields=-rating,-createdAt,-updatedAt,-__v&sort=${price ? "price":"-price"}&quantity[gte]=8`)
        .then((res:any)=>{
            // newsearch=res.data.data.products.name.includes(search)
            // const c= res.data.data.products
            setProducts(res.data.data.products)
            counter = res.data.data.products.length
            // const d = c.filter(item=>{
            //    return item.name.includes(search)

            
            // })
            // // console.log("d",d )
            // setProducts(d)

       })
  
  },[page,limit,price])
    
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
    setQuantity(true)
    setPrice(!price)
}
const sortQuantity =()=>{
    setPrice(true)
    setQuantity(!quantity)
}

  return(
    <div className="w-full">
        <table className="w-full border " dir="rtl">
            <thead>
                <tr className="border-b">
                    <th className="p-5">تصویر</th>
                    <th className="p-5">عنوان</th>
                    <th className="p-5 curser-pointer" onClick={sortPrice}>قیمت {price ?<ArrowDropUpIcon />:<ArrowDropDownIcon/> }</th>
                    <th className="p-5" onClick={sortQuantity}>موجودی {quantity?<ArrowDropUpIcon/>:<ArrowDropDownIcon/> }</th>
                    <th className="p-5">امکانات</th>

                </tr>

            </thead>
            <tbody>
                {
        products.map((item:any)=>{

        return (

            <>
             
            <tr className="border-b hover:bg-gray-100 hover:border-red-500 hover:border">
                <th className=" w-32 p-2"><img src={`http://localhost:8000/images/products/images/${item.images[0]}`} alt="" /></th>
                <th className="">{item.name}</th>
                <th className="">{item.price}</th>
                <th className="">{item.quantity}</th>
                <th className="">5</th>

            </tr>
            
            </>
        )
        })
      }       

            </tbody>
        </table>

        <div className="text-center p-5">
        <IconButton aria-label="Example" onClick={nextpage}>
            <KeyboardArrowLeftIcon/>
        </IconButton> 
        <span> {page} </span>
        <IconButton aria-label="Example" onClick={beforpage}>
            <KeyboardArrowRightIcon/>
        </IconButton>    
   

        </div>
    </div>

)}