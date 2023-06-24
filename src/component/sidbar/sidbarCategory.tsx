// import CardCategoryPage from "@/component/card/cardCategoryPage"
// import SidbarCategoryPage from "@/component/sidbar/sidbarCategory"

import usestore from "@/store"
// import { names } from './../../../.next/server/src/middleware';
import { getCategory , getSubCategory } from "@/lib/services/axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function SidbarCategoryPage() {

  const setSubCategory = usestore((state) => state.setSubCategory)
  const subCategory = usestore((state) => state.subCategory)
  const category = usestore((state) => state.category)
  const setCategory = usestore((state) => state.setCategory)



  return (
      <div className="bg-[rgb(42,20,83)] text-white h-screen w-40 py-10 px-4 w-96 text-right">
    { category && <h2 className="text-xl">{category.name}</h2>}
        <div className="py-5 text-right flex flex-col">
  
        </div>
      </div>
  )
}
