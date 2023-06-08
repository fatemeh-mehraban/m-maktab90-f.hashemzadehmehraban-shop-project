import axios from 'axios'
import { create } from 'zustand'
interface Iusestore {
    isCategories:boolean
    setIsCategories:(x:any) => void
    isPay:string
    setIsPay:(x:any)=>void
    deletfilter:boolean
    setDeletfilter:(x:any)=>void
}
    

export const usestore = create<Iusestore>((set,get)=>({
    isCategories:false,
    setIsCategories:() => set((state) => ({ isCategories: !state.isCategories })),

    isPay:"",
    setIsPay:(x) => set((state) => ({ isPay: x })),

    deletfilter:true,
    setDeletfilter:() => set((state) => ({ deletfilter: !state.deletfilter }))
}))
export default usestore