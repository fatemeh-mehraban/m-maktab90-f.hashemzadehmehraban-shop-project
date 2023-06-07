import BasicTable from "@/component/tabel/ordersTable"
import MiniDrawer from "@/layout/layoutAdmin"
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import { useState} from "react"

export function Order() {
  const [search , setsearch] = useState("")
  const searchfunction = (e)=>{
    setsearch(e.target.value)
  }
    return (
      <MiniDrawer>
      <div className="text-white py-40 px-5 w-full h-screen flex items-start justify-center flex-col">   
      <div className='border border-green-400 rounded-md mb-5'>
        <YoutubeSearchedForIcon className="bg-green-400 h-full text-6xl px-4 py-2"/>
        <input type="text" placeholder="جستجو ..." dir="rtl" className="p-2 outline-none" onChange={(e)=>searchfunction(e)}/>
      </div>     
       <BasicTable limit={4} search={search}/>
      </div>
      </MiniDrawer>

    )
  }
  
  export default Order
  