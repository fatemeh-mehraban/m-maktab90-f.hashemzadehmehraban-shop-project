import axios from "axios"

// *********************************categpry**************************
export const getCategory = async ()=>{
    const res = await axios.get('http://localhost:8000/api/categories?limit=1000')
  return res
  }
  export const getSubCategory = async ()=>{
    const res = await axios.get('http://localhost:8000/api/subcategories?limit=1000')
  return res
  }
  // *****************************************************
  export const getProduct = (page:number)=>{
    const res = axios.get(`http://localhost:8000/api/products?page=${page}&limit=3&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8`)
  return res
}
// getProduct().then(res=>console.log(res.data.total_pages))