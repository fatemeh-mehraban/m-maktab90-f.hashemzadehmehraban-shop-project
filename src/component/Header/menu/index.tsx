import { GlobalContext } from '@/context/GlobalContext'
import { useContext ,useEffect , useState} from 'react'

export default function MegaMenu() {
    const { getCategory,getSubCategory } = useContext(GlobalContext)
    const [categories , setCategories]= useState([])
    const [subCategories , setSubCategories]= useState([])
    useEffect(()=>{    
        getCategory().then((res:any)=>{
            setCategories(res.data.data.categories)
            // console.log(categories)
       })
  
  },[])

  useEffect(()=>{    
    getSubCategory().then((res:any)=>{
        setSubCategories(res.data.data.subcategories)
        console.log(res.data.data)
   })

},[])
  return (
    <div className="border border-red-400 p-8 flex justify-between w-full">
    {categories.map(item=>{
        return<> <div key={item._id}>
            {item.name}
            <ul>
{
    subCategories.map(sub=>{
        return item._id === sub.category && <li key={sub._id}>{sub.name}</li>
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
