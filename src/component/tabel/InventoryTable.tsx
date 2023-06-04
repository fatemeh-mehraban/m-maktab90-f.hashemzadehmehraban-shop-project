// جدول موجودی های کالا
import { GlobalContext } from "@/context/GlobalContext"
import { useContext,useState,useEffect } from "react"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Button from "../kit/button"
import { IconButton } from "@mui/material";
import  axios  from 'axios';
import { Suspense } from 'react';
import LinearBuffer from "../loading";


export default function InventoryTable(limit:number) {
    const [products , setProducts] = useState([])
    
    let counter = products.length
    // const { getProduct } = useContext(GlobalContext)
    const [page,setPage] = useState(1)
    
    useEffect(()=>{    
        const res = axios.get(`http://localhost:8000/api/products?page=${page}&limit=${limit}&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8`)
        .then((res:any)=>{
            setProducts(res.data.data.products)
            counter = res.data.data.products.length
       })
  
  },[(page)])

const nextpage=()=>{
    if( counter>= +limit  ){        
        setPage(page + 1)
    }
    
}

const beforpage =()=>{
    if( page > 1 ){
    setPage(page - 1)
}
}

  return(
    <div className="w-full">
        <table className="w-full border " dir="rtl">
            <thead>
                <tr className="border-b">
                    <th className="p-5">تصویر</th>
                    <th className="p-5">عنوان</th>
                    <th className="p-5">قیمت</th>
                    <th className="p-5">موجودی</th>
                    <th className="p-5">امکانات</th>

                </tr>

            </thead>
            {/* <Suspense fallback={<div> Lodiiiiiiiiiiiiiiiiiiiiiiiiiiing ............</div>}> */}
            <tbody>
                {
        products.map((item:any)=>{
            // console.log(item)      

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
            {/* </Suspense> */}
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