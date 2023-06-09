import { GlobalContext } from '@/context/GlobalContext'
import { getCategory ,getSubCategory} from '@/lib/services/axios'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useContext ,useEffect , useState} from 'react'

export default function MegaMenu() {
    const [categories , setCategories]= useState([])
    const [subCategories , setSubCategories]= useState([])
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
  return (
    <div className="p-8 mt-2 bg-white rounded-xl flex justify-between w-full shadow-md">
    {categories.map(item=>{
        return<> <div key={item._id}>
            <h2 className=' relative text-xl font-bold after:content-[""] after:w-6 after:h-1 after:bg-[#eea37a] after:absolute after:-bottom-2 after:right-0 '>{item.name}</h2>
            <ul className='pt-6'>
{
    subCategories.map(sub=>{
        return item._id === sub.category && <li key={sub._id} className='p-2 hover:text-[#eea37a] cursor-pointer'>{sub.name}</li>
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
