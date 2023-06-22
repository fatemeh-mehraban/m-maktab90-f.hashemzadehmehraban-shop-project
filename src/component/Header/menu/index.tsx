import { GlobalContext } from '@/context/GlobalContext'
import { getCategory ,getSubCategory} from '@/lib/services/axios'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useContext ,useEffect , useState} from 'react'
import { useRouter } from 'next/router';

export default function MegaMenu() {
    const [categories , setCategories]= useState([])
    const [subCategories , setSubCategories]= useState([])
    const router = useRouter();

    useEffect(()=>{    
        getCategory().then((res:any)=>{
            setCategories(res.data.data.categories)
       })
  
  },[])

  useEffect(()=>{    
    getSubCategory().then((res:any)=>{
        setSubCategories(res.data.data.subcategories)
        console.log(res.data.data)
   })

},[])
const handlecategoryClick = (productId) => {
    router.push(`/categories/${productId}`);
  };
const handlesubcategory = (category,subcat) => {
    router.push(`/categories/${category}/subcategories/${subcat}`);
  };
  return (
    <div className="p-8 bg-white rounded-xl flex justify-between w-full shadow-md absolute z-20">
    {categories.map((item:any)=>{
        return <>
         <div key={item._id}>
            <h2 onClick={()=>handlecategoryClick(item.slugname)} className='cursor-pointer relative text-xl font-bold after:content-[""] after:w-6 after:h-1 after:bg-[#eea37a] after:absolute after:-bottom-2 after:right-0 '>{item.name}</h2>
            <ul className='pt-6'>
{
    subCategories.map((sub:any)=>{
        return item._id === sub.category && <li key={sub._id} onClick={()=>handlesubcategory(item.slugname , sub.slugname)} className='p-2 hover:text-[#eea37a] cursor-pointer'>{sub.name}</li>
    })
}
            </ul>
        </div>
        </>
    })
    }
  </div>
  )
}


// export const getServerSideProps: GetServerSideProps<{
// }> = async ({params}) => {
//   const {data} = axios.get('http://localhost:8000/api/categories')
  
//   return { props: { data } };
// };
