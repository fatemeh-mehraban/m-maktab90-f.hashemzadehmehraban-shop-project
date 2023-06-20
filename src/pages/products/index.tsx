import MiniDrawer from "@/layout/layoutAdmin"
import ProductTable from "@/component/tabel/productTable"

function Product() {
    return (
      <MiniDrawer>

      <div className=" mt-20 w-full h-screen flex flex-col justify-center items-center px-5">
        <ProductTable limit={4}/>        
      </div>
      </MiniDrawer>

    )
  }
  
  export default Product