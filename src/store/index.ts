import axios from 'axios'
import { create } from 'zustand'
import Cookies from "universal-cookie";

interface Iusestore {
isCategories: boolean
setIsCategories: (x: any) => void

delivery: string
setDelivery: (x: any) => void

order:any[],
setorder: (x: any) => void



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
// deleteBasket:(x: any) => void
deleteCart:(id:string)=> void
counter:number,
setCounter:(x:number)=> void
increase: () => void;
decrease: () => void;
quantityPrudact:Number
changeQuantityPrudact:() => void
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


  const update= basket.find(item=>item._id === x._id)
if(update){
  basket.forEach(item=>{
    if(item._id === update._id){
      item.quantityProduct = x.quantityProduct
      item.totalprice = item.quantityProduct*item.price
    }
  })
  
  set(() => ({basket:basket} ))
  localStorage.setItem('data', JSON.stringify(basket))

}else{
  set(() => ({  basket:[...basket, x]} ))
  localStorage.setItem('data', JSON.stringify([...basket, x]))
}
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
// deleteBasket:()=>{
//   const basket= get().basket
//   localStorage.setItem('data', JSON.stringify([]))
//   set(() => ({ basket:[]} ))
// },
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


delivery:"",
setDelivery: (x) => set((state) => ({ delivery: x })),


order:[],
setorder:(x) =>{
  const order = get().order
  localStorage.setItem('order', JSON.stringify([...order, x]))
  set(() => ({ order:[...order, x]} ))
},


quantityPrudact:1,
changeQuantityPrudact:(id)=>{
 const test=  get().basket
 const target = test.find(item=>item._id === id && item)
 set(() => ({ quantityPrudact:target.quantitypProduct} ))
}
}))

// export const productqun = function(id){
//  const test=  get().basket
//  const target = test.find(item=>{
//   return item._id == id
//  })
//  return target.quantitypProduct
// }
export default usestore