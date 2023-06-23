// import CardCategoryPage from "@/component/card/cardCategoryPage"
// import SidbarCategoryPage from "@/component/sidbar/sidbarCategory"

import usestore from "@/store"
// import { names } from './../../../.next/server/src/middleware';
import { getCategory , getSubCategory } from "@/lib/services/axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function SidbarCategoryPage({AllsubCategory}) {

  const setSubCategory = usestore((state) => state.setSubCategory)
  const subCategory = usestore((state) => state.subCategory)
  const category = usestore((state) => state.category)
  const setCategory = usestore((state) => state.setCategory)

const [AllCategory,setAllCategory]=useState([])
const router = useRouter();
const {slugnamesub,slugname} = router.query;

const hanlesubcategory = (name)=>{
  const value= AllsubCategory.find(item =>item.name === name)
  setSubCategory(value)
  // const catvalue = subCategory.name === value
}
const hanlecategory = async (name:any)=>{
  
  const category= await getCategory()
  setCategory(category.data.data.categories.find(item =>item.name === name))
  router.push(`/categories/${category && category.slugname}`)
}


useEffect(() => {
  category && subCategory && router.push(`/categories/${category.slugname}/subcategories/${subCategory.slugname}`)
  
},[subCategory])


useEffect(() => {
  getCategory().then(res => setAllCategory(res.data.data.categories.filter(item => slugname && item.slugname !== slugname)));
    
  router.push(`/categories/${category && category.slugname}`)
  console.log(subCategory)
},[])

  return (
      <div className="bg-[rgb(42,20,83)] text-white h-screen w-40 py-10 px-4 w-96 text-right">
    { category && <h2 className="text-xl">{category.name}</h2>}
        <div className="py-5 text-right flex flex-col">
        {
         AllsubCategory ?  AllsubCategory.map((item:any)=>(
          category &&  item.category === category._id &&   <span key={item._id} className="py-3 px-2 hover:bg-white hover:text-[rgb(42,20,83)]" onClick={()=>hanlesubcategory(item.name)}> {item.name} </span>
            )): <span key={item._id} className="py-3 px-2 hover:bg-white hover:text-[rgb(42,20,83)]" onClick={()=>hanlesubcategory(item.name)}> {item.name} </span>
        } 
        </div>
        <div className="mt-10 flex flex-col">
{
          AllCategory &&  AllCategory.map((item:any)=>{
              return  <span key={item._id} className="py-3 px-2 hover:bg-white hover:text-[rgb(42,20,83)]" onClick={()=>hanlecategory(item.name)}>
                
                  {item.name}
                 


               </span>
            })
}
        </div>
      </div>
  )
}
