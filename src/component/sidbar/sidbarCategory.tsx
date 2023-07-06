// import CardCategoryPage from "@/component/card/cardCategoryPage"
// import SidbarCategoryPage from "@/component/sidbar/sidbarCategory"

import usestore from "@/store"
// import { names } from './../../../.next/server/src/middleware';
import { getCategory , getSubCategory } from "@/lib/services/axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ChooseCategory from "../kit/categoryCheckBox";
export default function SidbarCategoryPage() {

  const setSubCategory = usestore((state) => state.setSubCategory)
  const subCategory = usestore((state) => state.subCategory)
  const category = usestore((state) => state.category)
  const setCategory = usestore((state) => state.setCategory)



  return (
      <div className="shadow-[0px_35px_60px_-15px_rgba(0,0,0,0.3)] h-full pb-10 w-1/3 text-right flex flex-col rounded-xl gap-5">
        <div className="flex gap-6 items-center text-xl font-bold py-5 bg-[rgb(233,233,233)] rounded-xl px-5">
            <FilterAltIcon sx={{color:"#120052" , fontSize:"35px"}}/>
            <h3 className="text-[#120052]">فیلتر</h3>
        </div>
        <div className="flex flex-col gap-7 justify-center  py-4 pb-7 rounded-xl border-b-2 border-dashed border-[#F3BDA0] mx-5">
          <div className="flex gap-6 font-bold">
          <SearchIcon sx={{color:"#120052" , fontSize:"35px"}}/>
            <h3 className="text-[#120052] text-xl">جستجو در نتایج</h3>
          </div>

            <input type="search"  placeholder="جستجو در نام محصول" className="rounded-xl p-4 px-5 border border-gray-500 outline-none"/>
        </div>
        <div className="flex flex-col gap-4 justify-center py-4 pb-7 rounded-xl border-b-2 border-dashed border-[#F3BDA0] mx-5">
          <h3 className="text-[#120052] text-xl">دسته بندی</h3>
          <ChooseCategory/>
        </div>
        </div>
  )
}
