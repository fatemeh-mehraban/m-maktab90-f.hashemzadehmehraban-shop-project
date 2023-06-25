import MiniDrawer from "@/layout/layoutAdmin"
import ProductTable from "@/component/tabel/productTable"
import PersistentDrawerRight from "@/layout/layout2admin"

function Product() {
    return (
      <PersistentDrawerRight path="products">

      <div className=" mt-20 w-full h-screen flex flex-col justify-center items-center px-5">

        <ProductTable limit={4}/>        
      </div>
      </PersistentDrawerRight>

    )
  }
  
  export default Product