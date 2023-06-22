import BasicTable from "@/component/tabel/ordersTable"
import PersistentDrawerRight from "@/layout/layout2admin"
import MiniDrawer from "@/layout/layoutAdmin"
import { useState} from "react"


export function Order() {
  const [search , setsearch] = useState("")
  const searchfunction = (e:any)=>{
    setsearch(e.target.value)
  }
    return (

      <PersistentDrawerRight>
      <div className="text-white h-screen px-5 w-full flex items-end justify-center items-center flex-col">   

       <BasicTable limit={4} search={search}/>
      </div>
      </PersistentDrawerRight>

    )
  }
  
  export default Order
  