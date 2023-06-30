import Quantity from "@/component/kit/quantity"
import Image from 'next/image'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoneyIcon from '@mui/icons-material/Money';
import { useState, useEffect } from 'react';
import usestore from '@/store';
import { useRouter } from "next/router";

export default function CardCart({product}) {
    // const[counter,setCounter]=useState(1)
    const setBasket = usestore((state) => state.setBasket)
    const basket = usestore((state) => state.basket)
    const deleteCart = usestore((state) => state.deleteCart)
    const counter = usestore((state) => state.counter)
    const setCounter = usestore((state) => state.setCounter)
    const router = useRouter()

    useEffect(()=>{
        basket.find(item=> item._id === product._id && setCounter(item.quantityProduct))
      
      },[basket.quantityProduct])

      const handleCardClick = (productId) => {
        router.push(`/products/${productId}`);
      };
    return (
    <div className="container mt-5 pb-5  px-5 border-b border-[#120051] flex justify-between items-center">
            <div className="flex gap-7">
{                 product && <Image src={`http://localhost:8000/images/products/images/${product.images && product.images[0]}`} width={200} height={200} onClick={()=>handleCardClick(product._id)}/>}
                    <div className="flex flex-col justify-between">
                        {product && <h3 className="text-xl font-bold">{product.name} </h3>}
                        <div className="mb-3 text-lg">
                            <span>قیمت : </span>
                            { product && product.price}
                        </div>
                    </div>
  
        </div>
                       <div className="flex flex-col gap-5">
                        <div className="flex gap-5">
{                       product && <DeleteOutlineIcon color="error" fontSize="large" onClick={()=>deleteCart(product._id)}/>
}                        <Quantity counter={product.quantityProduct} />
                        </div>
                        <span className=" text-left p-2 px-7  text-xl text-white bg-[#120051] rounded-xl  flex justify-between"><MoneyIcon/> {product.quantityProduct * product.price}  </span>
                        </div> 
     </div>
    )
  }
  