import axios from "axios";

export const getProduct = ()=>{
    const res = axios.get('http://localhost:8000/api/products?page=1&limit=4&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8')
  return res
 }