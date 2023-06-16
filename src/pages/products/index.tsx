import MiniDrawer from "@/layout/layoutAdmin"
import ProductTable from "@/component/tabel/productTable"
import PersistentDrawerRight from "@/layout/layout2admin"

function Product() {
    return (
      <PersistentDrawerRight>

      <div className=" mt-20 w-full flex flex-col justify-center items-start px-5">
        <ProductTable limit={4}/>        
      </div>
      </PersistentDrawerRight>

    )
  }
  
  export default Product