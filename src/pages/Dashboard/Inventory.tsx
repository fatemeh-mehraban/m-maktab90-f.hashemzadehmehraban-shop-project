import MiniDrawer from "@/layout/layoutAdmin"
import InventoryTable from "@/component/tabel/InventoryTable"

export function Inventory() {
 
  // addproduct()
    return (
      <MiniDrawer>
      <div className="py-40 mt-20  w-full h-screen flex justify-center items-center px-5"> 
      
      <InventoryTable limit={4}/>
      </div>
      </MiniDrawer>
    )
  }
  
  export default Inventory