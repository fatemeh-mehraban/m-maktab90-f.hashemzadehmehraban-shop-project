import CardCategoryPage from "@/component/card/cardCategoryPage"
import SidbarCategoryPage from "@/component/sidbar/sidbarCategory"
import { useRouter } from "next/router"
import { getCategory , getSubCategory } from "@/lib/services/axios"
import { useEffect, useState } from "react"// catgory/[category]/subcategory/[subcategory].tsx
import axios from "axios"
import usestore from "@/store"
import Layout from '@/layout/layout'

const SubcategoryDynamicPage = () => {
  const router = useRouter();
  const {slugnamesub,slugname} = router.query;
  
  // const [category, setCategory]=useState([])
  const category = usestore((state) => state.category)
  const setCategory = usestore((state) => state.setCategory)
  const subCategory = usestore((state) => state.subCategory)
  const setSubCategory = usestore((state) => state.setSubCategory)
  // const [subCategory, setSubCategory]=useState([])
  const [AllsubCategory, setAllSubCategory]=useState([])
  const [products, setProducts]= useState([])



  useEffect(() => {
    Promise.all([
      getSubCategory(),
      getCategory()
    ]).then(([subRes, catRes]) => {
      const sub = subRes.data.data.subcategories.find(item => item.slugname === slugnamesub)
      const cat = catRes.data.data.categories.find(item => sub && item._id === sub.category)
      setSubCategory(sub)
      setCategory(cat)
      // const value = subRes.data.data.subcategories.filter(subcat => cat && subcat.category === cat._id && subcat.slugname !== slugnamesub)
      // setAllSubCategory(value)
    }).catch(error => {
      console.log(error)
    })
  }, [slugnamesub])




useEffect(()=>{
  const cate= getCategory().then(res => (res.data.data.categories.find(item => slugname && item.slugname === slugname)));
  // res.data.data.categories.find(item => slugname && item.slugname === slugname)
  getSubCategory().then(res => {
    const value = res.data.data.subcategories.filter(subcat => cate && subcat.category._id === cate._id )
    setAllSubCategory(value)
    console.log(value)
   
});
  axios.get("http://localhost:8000/api/products?limit=1000").then(res=>{
    const newProduct= res.data.data.products.filter(item=>subCategory && item.subcategory._id === subCategory._id )
      setProducts(newProduct)
    })
},[subCategory,slugnamesub])





console.log(products)
// console.log(subCategory)
  return (    
    <Layout>

      <div className="flex min-w-full	p-10">
        <SidbarCategoryPage AllsubCategory={AllsubCategory}/>
      <div className="pb-20 px-10 w-full">
   {     category && <h1 className="text-right text-2xl pb-10">{category.name}</h1>}

      <div className="grid grid-cols-3 gap-10 ">
      {
     products && category && products.map(product => (
          product.category._id === category._id &&  <CardCategoryPage  name={product.name} price={product.price} id={product._id} img={`http://localhost:8000/images/products/images/${product.images}`}/>
      ))
      }
      </div>
      </div>


      </div>
      </Layout>

  )
}
export default SubcategoryDynamicPage;














//   useEffect( ()=>{
//       getSubCategory().then(res=>setSubCategory(res.data.data.subcategories.find(item =>item.slugname === slugname)))
//       getCategory().then(res => setCategory(res.data.data.categories.find(item =>item._id === subCategory.category)));
//     axios.get("http://localhost:8000/api/products").then(res=>setProducts(res.data.data.productsfilter(subcat => subcat.filter(subcat => subcat.filter(subcat => subcat.subcategory === subCategory._id) === category._id) === category._id)))

// },[])

// import { getCategory , getSubCategory } from "@/lib/services/axios"
// import axios from "axios"
// import CardCategoryPage from "@/component/card/cardCategoryPage"
// import SidbarCategoryPage from "@/component/sidbar/sidbarCategory"

// export async function getStaticProps({params}){
//     const {slugname}=params
//     const category = await getCategory().then(res => res.data.data.categories);
//     const subCategory= await getSubCategory().then(res=>res.data.data.subcategories.find(cat => cat.slugname === slugname))
//     const AllsubCategory= await getSubCategory().then(res=>res.data.data.subcategories.filter(cat2 =>{
//      return category.map(item=>{
//       item._id === subCategory.category && item

//       })
      
//     }) )


//     const products= await axios.get("http://localhost:8000/api/products").then(res=>res.data.data.products.filter(cat => cat.subcategory._id === subCategory._id))
//     return{
//         props:{
//             category,
//             subCategory,
//             products,
//             AllsubCategory
//         }
//     }
// }

// export async function getStaticPaths() {
//   const categories = await getCategory().then(res => res.data.data.categories);
//   const subCategories = await getSubCategory().then(res => res.data.data.subcategories);

//   const paths = [];

//   categories.forEach(category => {
//     const filteredSubCategories = subCategories.filter(sub => sub.category === category._id);
//     filteredSubCategories.forEach(sub => {
//       paths.push({ params: { slugname: sub.slugname } });
//     });
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// }

//   export default function Categorypage({category,products,subCategory,AllsubCategory}){
//     console.log(subCategory)
//     return(
//         <div className="flex">
//         <div className="py-20 px-10">
//         <h1 className="text-right text-2xl pb-10">{subCategory.name}</h1>
//         <div className="grid grid-cols-3 gap-10">
//             {products.map(product => (
//            product.subcategory._id === subCategory._id &&  <CardCategoryPage name={product.name} price={product.price} id={product._id} img={`http://localhost:8000/images/products/images/${product.images}`}/>
//         ))}
//         </div>
//         </div>
//         <SidbarCategoryPage category={category} subCategory={AllsubCategory}/>

//         </div>
//     )
// }
