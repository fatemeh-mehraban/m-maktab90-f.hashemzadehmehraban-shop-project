// import MiniDrawer from "@/layout/layoutAdmin"
import InventoryTable from "@/component/tabel/InventoryTable"
import DataGridDemo from "@/component/tabel/InventoryT"
import { searchInput } from './../../component/kit/searchInput';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import {useState,useEffect } from "react"
import PersistentDrawerRight from "@/layout/layout2admin"

export function Inventory() {
  const [search , setsearch] = useState("")
  const searchfunction = (e:any)=>{
    setsearch(e.target.value)
  }


    return (


      <PersistentDrawerRight>
      <div className="py-40 mt-20  w-full flex flex-col justify-center items-end px-5"> 

      <div className='border border-green-400 rounded-md mb-5'>
        <YoutubeSearchedForIcon className="bg-green-400 h-full text-6xl px-4 py-2"/>
        <input type="text" placeholder="جستجو ..." dir="rtl" className="p-2 outline-none" onChange={(e)=>searchfunction(e)}/>
      </div>
  
      <InventoryTable search={search} limit={4}/>
      </div>
      </PersistentDrawerRight>
    )
  }
  
  export default Inventory