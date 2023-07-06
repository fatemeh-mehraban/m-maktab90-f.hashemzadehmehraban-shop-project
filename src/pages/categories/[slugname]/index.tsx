import { getCategory , getSubCategory } from "@/lib/services/axios"
import axios from "axios"
import CardCategoryPage from "@/component/card/cardCategoryPage"
import SidbarCategoryPage from "@/component/sidbar/sidbarCategory"
import FourOhFour from "@/component/404"
import Layout from '@/layout/layout'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

export default function Categorypage(){
    const [category, setCategory]=useState([])
    const [subCategory, setSubCategory]=useState([])
    const [issubCategory, setisSubCategory]=useState(false)
    const [products, setProducts]=useState([])
    const [page, setPage]=useState(1)
    const perPage = 6
    const [isSubCategoryMatched , setisSubCategoryMatched ]=useState([])
    const router= useRouter()
    const {slugname,asPath}= router.query





    useEffect(() => {
        getCategory().then(res => setCategory(res.data.data.categories.find(item => slugname && item.slugname === slugname)));
        getSubCategory().then(res => {
            const value = res.data.data.subcategories.filter(subcat => category && subcat.category === category._id)
            setSubCategory(value)
        });
        axios.get("http://localhost:8000/api/products?limit=all").then(res => {
            const x= res.data.data.products.filter(item=>item.category._id === category._id)
            setProducts(x)
        });
      
        
    }, [slugname,category]);
    // console.log(subCategory)
    // console.log(products)
    const handleChange=(event,value)=>{
    setPage(value)
}
const getPaginatedData=()=>{
    const startIndex=(page-1)*perPage
    const endIndex=startIndex + perPage
    return products.slice(startIndex,endIndex)
}
    return(
        <Layout>

        <div className="flex p-10 relative">
        <SidbarCategoryPage />
        <div className=" px-10 w-full ">
     {     category && <h1 className="text-right text-2xl pb-10 text-[#120052] font-bold">{category.name}</h1>}

        <div className="grid grid-cols-3 gap-10 pb-40">
        {
       products && category && getPaginatedData().map(product => (
             <CardCategoryPage  name={product.name} price={product.price} id={product._id} img={product.images[0]}/>
        ))
        }
        </div>
        </div>
<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
<Stack spacing={2} dir="ltr">
      <Typography>Page: {page}</Typography>
      <Pagination count={Math.ceil(products.length / perPage)} page={page} onChange={handleChange} />
    </Stack>
</div>

 



        </div>
        </Layout>

)
    
}


















// export async function getStaticProps({params}){
//     const slugname=params
//     const category = await getCategory().then(res => res.data.data.categories.find(cat => cat.slugname === slugname));
//     const subCategory= await getSubCategory().then(res=>res.data.data.subcategories.filter(cat => cat.category === category._id))

//     const products= await axios.get("http://localhost:8000/api/products").then(res=>res.data.data.products)
//     return{
//         props:{
//             category,
//             subCategory,
//             products
//         }
//     }
// }

// export async function getStaticPaths() {
//   const categories = await getCategory().then(res => res.data.data.categories);

//   return {
//     paths: categories.map(category => ({
//       params:{
//         slugname:category.slugname
//       }
//     })),
//     fallback: false,
//   };
// }

//   export default function Categorypage({category,products,subCategory}){
//     console.log(products)
//     return(
//         <div className="flex">
//         <div className="py-20 px-10">
//         <h1 className="text-right text-2xl pb-10">{category.name}</h1>
//         <p key={products.id}>{products.name}</p>
//         <div className="grid grid-cols-3 gap-10">
//             {products.map(product => (
//            product.category._id === category._id &&  <CardCategoryPage  name={product.name} price={product.price} id={product._id} img={`http://localhost:8000/images/products/images/${product.images}`}/>
//         ))}
//         </div>
//         </div>
//         <SidbarCategoryPage category={category} subCategory={subCategory}/>

//         </div>
//     )
// }
