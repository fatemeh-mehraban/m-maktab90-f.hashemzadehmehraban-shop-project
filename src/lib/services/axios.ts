import axios from "axios"

// *********************************categpry**************************
export const getCategory = ()=>{
    const res = axios.get('http://localhost:8000/api/categories')
  return res
  }
  export const getSubCategory = ()=>{
    const res = axios.get('http://localhost:8000/api/subcategories')
  return res
  }
  // *****************************************************
  export const getProduct = (page:number)=>{
    const res = axios.get(`http://localhost:8000/api/products?page=${page}&limit=3&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8`)
  return res
 }