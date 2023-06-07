import MiniDrawer from "@/layout/layoutAdmin"
import ProductTable from "@/component/tabel/productTable"

function Product() {
    return (
      <MiniDrawer>

      <div className=" mt-20 w-full h-screen flex flex-col justify-center items-start px-5">
        <ProductTable/>        
      </div>
      </MiniDrawer>

    )
  }
  
  export default Product