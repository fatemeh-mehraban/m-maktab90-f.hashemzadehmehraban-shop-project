import MiniDrawer from "@/layout/layoutAdmin"
import InventoryTable from "@/component/tabel/InventoryTable"
import DataGridDemo from "@/component/tabel/InventoryT"
import { searchInput } from './../../component/kit/searchInput';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import {useState,useEffect } from "react"

export function Inventory() {
  const [search , setsearch] = useState("")
  const searchfunction = (e:any)=>{
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
      <InventoryTable search={search} limit={4}/>
      </MiniDrawer>
    )
  }
  
  export default Inventory