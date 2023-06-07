import MiniDrawer from "@/layout/layoutAdmin"
import InventoryTable from "@/component/tabel/InventoryTable"
import DataGridDemo from "@/component/tabel/InventoryT"
import { searchInput } from './../../component/kit/searchInput';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import {useState,useEffect } from "react"

export function Inventory() {
  const [search , setsearch] = useState("")
  const searchfunction = (e)=>{
    setsearch(e.target.value)
  }

  // useEffect(()=>{    
  //   const res = axios.get(`http://localhost:8000/api/products?page=${page}&limit=${limit}&fields=-rating,-createdAt,-updatedAt,-__v&sort=${price ? "price":"-price"}&quantity[gte]=8`)
  //   .then((res:any)=>{
  //       setProducts(res.data.data.products)
  //       counter = res.data.data.products.length
  //  })

// },[page,limit,price])
  // addproduct()
    return (
      <MiniDrawer>
      <div className="py-40 mt-20  w-full h-screen flex flex-col justify-center items-start px-5"> 
      {/* <searchInput /> */}
      <div className='border border-green-400 rounded-md mb-5'>
        <YoutubeSearchedForIcon className="bg-green-400 h-full text-6xl px-4 py-2"/>
        <input type="text" placeholder="جستجو ..." dir="rtl" className="p-2 outline-none" onChange={(e)=>searchfunction(e)}/>
      </div>
  
      {/* <DataGridDemo /> */}
      <InventoryTable search={search} limit={4}/>
      </div>
      </MiniDrawer>
    )
  }
  
  export default Inventory