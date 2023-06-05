import axios from 'axios'
import { create } from 'zustand'
interface Iusestore {
    isCategories:boolean
    setIsCategories:(x:any) => void
}


export const usestore = create<Iusestore>(set=>({
    isCategories:false,
    setIsCategories:() => set((state) => ({ isCategories: !state.isCategories })),
}))
export default usestore