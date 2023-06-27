import axios from 'axios'
import { create } from 'zustand'
import Cookies from "universal-cookie";

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
basket:any[]
setBasket: (x: any) => void
DeleteBasket: (x: any) => void
deleteCart:(id:string)=> void
counter:number,
setCounter:(x:number)=> void
increase: () => void;
decrease: () => void;

CartUser:any[]
ChangeCartUser:(x:any)=>void
}
const getInitialLoggedIn = () => {
if (typeof window !== 'undefined') {
const basket = localStorage.getItem('data')
if(basket){
return JSON.parse(basket);
}
return [];
}
return [];
};
export const usestore = create((set, get) => ({
basket:getInitialLoggedIn(),
counter:1,
setCounter: (x) => set(() => ({ counter: x })),
increase: () => {
set(state => ({ counter: state.counter + 1 }))
},
decrease: () => {
set(state => ({ counter: state.counter - 1}))
},


setBasket:  (x) =>{
  const basket = get().basket
  localStorage.setItem('data', JSON.stringify([...basket, x]))
  set(() => ({ basket:[...basket, x]} ))
},
DeleteBasket:  (x) =>{
  const basket = get().basket
  const data = localStorage.getItem('data')
  localStorage.setItem('lastCartUser', data)
  localStorage.setItem('data', JSON.stringify([]))
  set((x) => ({ basket:[x]} ))
},
deleteCart:(id)=>{
  const basket= get().basket
  const deleteone = basket.filter(item=>item._id!== id)
  localStorage.setItem('data', JSON.stringify(deleteone))
  set(() => ({ basket:deleteone} ))
},

CartUser:[],
ChangeCartUser:(x) => set((state) => ({ CartUser: x })),



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