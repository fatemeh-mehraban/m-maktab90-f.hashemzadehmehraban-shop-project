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




      <PersistentDrawerRight path="Dashboard/Inventory">
      <div className=" w-full flex justify-center items-csnter px-5"> 
  
      <InventoryTable search={search} limit={4}/>
      </div>
      </PersistentDrawerRight>
    )
  }
  
  export default Inventory