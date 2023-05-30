import MiniDrawer from "@/layout/layoutAdmin"
import { useContext,useState,useEffect } from "react"
import { GlobalContext } from "./contex/GlobalContext"

export function Inventory() {
  const [products , setProducts] = useState([])
  const { InventoryProduct } = useContext(GlobalContext)

  useEffect(()=>{
    InventoryProduct().then((res:any)=>{
      setProducts(res.data.data.products)  
      console.log(products)      
     })

},[InventoryProduct])
  // addproduct()
    return (
      <MiniDrawer>
      <div className="bg-pink-700 text-white py-40 mt-20  w-full h-screen"> 
      {
        products.map((item:any)=>{
        return  <p key={item._id}>{item.name}</p>
        })
      }       
      </div>
      </MiniDrawer>
    )
  }
  
  export default Inventory