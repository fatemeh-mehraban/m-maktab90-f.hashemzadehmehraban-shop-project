import BasicTable from "@/component/tabel/ordersTable"
import MiniDrawer from "@/layout/layoutAdmin"
import { useState} from "react"


export function Order() {
  const [search , setsearch] = useState("")
  const searchfunction = (e)=>{
    setsearch(e.target.value)
  }
    return (
      <MiniDrawer>
      <div className="text-white py-40 px-5 w-full h-screen flex items-center justify-center flex-col">   
       <BasicTable limit={4} search={search}/>
      </div>
      </MiniDrawer>

    )
  }
  
  export default Order
  