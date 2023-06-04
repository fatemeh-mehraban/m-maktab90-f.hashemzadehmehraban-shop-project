import { create } from 'zustand'
interface Iusestore {
    accessAdmin:()=>void
}
const usestore = create<Iusestore>(set=>({
    accessAdmin:set(state=>({}))
}))