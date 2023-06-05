import { useAccessAdmin } from '@/api/Login/useRequests'
import axios from 'axios'
import { create } from 'zustand'
interface Iusestore {
    token:string
    setToken:(token:string)=>void
}


export const usestore = create<Iusestore>(set=>({
    token:"",
    setToken:(token:string)=>set((state)=>({
        token
    }))
}))
export default usestore