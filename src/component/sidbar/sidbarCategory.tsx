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
  router.push(`/categories/${category.slugname}/subcategories/${value.slugname}`)
}
const hanlecategory = async (name)=>{
  
  const category= await getCategory()
  const value = category.data.data.categories.find(item =>item.name === name)

  setCategory(value)
  router.push(`/categories/${value.slugname}`)
}

useEffect(() => {
  getCategory().then(res => setAllCategory(res.data.data.categories.filter(item => slugname && item.slugname !== slugname)));
  // getSubCategory().then(res => {
  //     const value = res.data.data.subcategories.filter(subcat => category && subcat.category === category._id)
  //     setSubCategory(value)
  // });
})
// console.log(subCategory)
    // console.log(AllsubCategory)
  return (
      <div className="bg-[rgb(42,20,83)] text-white h-screen w-40 py-10 px-4 w-96 text-right">
    { category && <h2 className="text-xl">{category.name}</h2>}
        <ul className="py-5 text-right">
        {
         AllsubCategory &&  AllsubCategory.map(item=>{
               return category && item.category === category._id && <li key={item._id} className="py-3 px-2 hover:bg-white hover:text-[rgb(42,20,83)]" onClick={()=>hanlesubcategory(item.name)}> {item.name} </li>
            })
        } 
        </ul>
        <ul className="mt-10">
{
          AllCategory &&  AllCategory.map(item=>{
              return  <li key={item._id} className="py-3 px-2 hover:bg-white hover:text-[rgb(42,20,83)]" onClick={()=>hanlecategory(item.name)}>
                 <span>
                  {item.name}
                 </span>


               </li>
            })
}
        </ul>
      </div>
  )
}
