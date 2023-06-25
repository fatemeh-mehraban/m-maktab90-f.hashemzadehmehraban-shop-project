import { useState, useEffect ,useRef } from 'react';
import { getCategory } from '@/lib/services/axios'; 
import { useRouter } from 'next/router';

export default function ChooseCategory() {
    const [category, setCategory] = useState([]);
    const router = useRouter();
    const inputElement = useRef();
    useEffect(() => {
        getCategory().then(res => setCategory(res.data.data.categories))
        // console.log(inputElement.current.id)
        // inputElement.current && router.query.slugname === inputElement.current.id && console.log(router.query.slugname)
        inputElement &&inputElement.current && router.query.slugname === inputElement.current.id && inputElement.current.checked ===true
      }, []);
      const handleClick=(e)=>{
        console.log(e.target.id)
        console.log(router.query.slugname)
        // console.log(inputElement.current.id)

         router.push(`/categories/${e.target.id}`);
      }
  return (
    <div className="mr-2 max-w-sm">
 <div className="pl-12">
 
{
    category.map(item=>(
        <div key={item._id} className="flex gap-2 mt-3">
        <input id={item.slugname} type="radio" name="radio" className="" ref={inputElement} onClick={(e)=>handleClick(e)}/>
        <label htmlFor={item.slugname} className="flex items-center cursor-pointer text-xl">
         {item.name}</label>
       </div>
    ))
}
 </div>
</div>
  )
}
