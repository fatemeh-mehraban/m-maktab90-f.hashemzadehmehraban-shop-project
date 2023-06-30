import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState, useEffect } from 'react';
import usestore from '@/store';

export default function Quantity({counter}) {

// const counter = usestore((state) => state.counter)
const increase = usestore((state) => state.increase)
const decrease = usestore((state) => state.decrease)
//  useEffect(()=>{

//  },[counter])
// const decrease=()=>{
// 	counter>1 && decrease()
// }
// const increase=()=>{
// 	increase()
// 	console.log(counter)
// }
  return (
		    <div className=" border rounded-full w-36 h-10 flex justify-between items-center overflow-hidden">
		        <RemoveIcon className="px-4 text-5xl text-white bg-[#120051] rounded-r-full" onClick={()=>counter>1 && decrease()}/>
		    	<span>{counter}</span>
		        <AddIcon className="px-4 text-5xl text-white bg-[#120051] rounded-l-full" onClick={increase}/>
		    </div>
  )
}
