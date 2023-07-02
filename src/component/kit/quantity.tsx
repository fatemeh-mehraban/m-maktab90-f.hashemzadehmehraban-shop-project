import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState, useEffect } from 'react';
import usestore from '@/store';
// import {productqun} from '@/store';

export default function Quantity({product,quantity,setQuantity}) {

const setcounter = usestore((state) => state.setCounter)
const counter = usestore((state) => state.counter)
const increase = usestore((state) => state.increase)
const decrease = usestore((state) => state.decrease)
const setBasket = usestore((state) => state.setBasket)
const basket = usestore((state) => state.basket)
// basket.map(item=>{

// })
useEffect(()=>{
	setcounter(quantity)

 },[quantity])
// const decrease=()=>{
// 	counter>1 && decrease()
// }
// const increase=()=>{
// 	increase()
	// console.log(productqun(product._id))
// }
  return (
		    <div className=" border rounded-full w-36 h-10 flex justify-between items-center overflow-hidden">
		        <RemoveIcon className="px-4 text-5xl text-white bg-[#120051] rounded-r-full" onClick={()=>{
					counter>1 && decrease()
					setQuantity(quantity>1 ? quantity-1 : 1)
					setcounter(quantity)

				}}/>
		    	<span>{ quantity}</span>
		        <AddIcon className="px-4 text-5xl text-white bg-[#120051] rounded-l-full" onClick={()=>{
					increase()
					setQuantity(quantity + 1)
					setcounter(quantity)
					}}/>
		    </div>
  )
}
