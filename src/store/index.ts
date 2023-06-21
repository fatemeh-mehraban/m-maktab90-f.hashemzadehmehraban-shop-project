import axios from 'axios'
import { create } from 'zustand'

interface Iusestore {
  isCategories: boolean
  setIsCategories: (x: any) => void
  isPay: string
  setIsPay: (x: any) => void
  category: any[]
  setCategory: (x: any) => void
  subCategory: any[]
  setSubCategory: (x: any) => void
  deletfilter: boolean
  setDeletfilter: (x: any) => void
  reload: boolean
  setReload: (x: any) => void
}

export const usestore = create<Iusestore>((set, get) => ({
  isCategories: false,
  setIsCategories: () =>
    set((state) => ({ isCategories: !state.isCategories })),

  isPay: "",
  setIsPay: (x) => set((state) => ({ isPay: x })),

  deletfilter: true,
  setDeletfilter: () =>
    set((state) => ({ deletfilter: !state.deletfilter })),

  reload: true,
  setReload: () => set((state) => ({ reload: !state.reload })),

  category: [],
  setCategory: (x) => set((state) => ({ category: x })),

  subCategory: [],
  setSubCategory: (x) => set((state) => ({ subCategory: x })),
}))

export default usestore