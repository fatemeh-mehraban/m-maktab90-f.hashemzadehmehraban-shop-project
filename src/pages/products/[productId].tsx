import { useRouter } from 'next/router';
import Layout from '@/layout/layout';
import { GlobalContext } from '../../pages/api/context/GlobalContext';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { getCategory } from '@/lib/services/axios';

// {products.category.name}
const ProductPage = () => {
    const router = useRouter();
    const [products, setProducts]= useState([])
    const [Allproducts, setAllProducts]= useState([])
    const [category, setCategory]= useState([])
    const [productcategory, setProductcategory]= useState([])

    const {productId} = router.query;
useEffect(()=>{
  axios.get("http://localhost:8000/api/products?limit=all").then(res=>{
    const newProduct= res.data.data.products.find(item=> item._id === productId )
    setAllProducts( res.data.data.products)
    setProducts(newProduct)
  })
  getCategory().then(res =>{ 
    setCategory(res.data.data.categories)
    setProductcategory(res.data.data.categories.find(item=> products && products.category && item._id === products.category._id ))
  })
},[])
const handleCardClick = (product) => {
  // console.log("1")
  router.push(`/products/${product._id}`);
  setProducts(product)

};
        // console.log(Allproducts)
  return (
    <>
      <Layout>
        <div className=" mt-10 mb-10">
        <div className="flex p-4 mt-10">
          <div className="ml-5">
{          products&& <Image
              src={`http://localhost:8000/images/products/images/${products.images}`}
              width={600}
              height={400}
              alt="images"
            />}
          </div>
          <div className="w-[40rem]">
            <div className="flex items-center gap-4 mb-6 text-gray-500">
           {products &&  products.category && <span>{products.category.name}</span>}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
                className="fill-gray-500"
              >
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
              {products && products.subcategory &&  <span>{products.subcategory.name}</span>}
            </div>
{             products &&  <h1 className="font-semibold relative text-gray-700 text-xl mb-6 border-b border-black  pb-5 after:content-['']  after:w-1/4 after:h-2 after:bg-[#EEA37A] after:absolute after:-bottom-1 after:right-0">
              {products.name}
            </h1>}

            <div className="mb-6">
            { products &&  <p><span className="text-2xl text-[rgb(42,20,83)] font-bold">{products.price}</span> تومان</p>}
            </div>
            <div className="mb-6">
              <span className="font-semibold text-gray-700">
                درباره ی محصول:
              </span>
             { products && <div className="mb-6" dangerouslySetInnerHTML={{ __html: products.description }}/>}
            </div>
          <input
            type="number"
            className="w-24 border px-2 text center"
            min="1"
            max={products && products.quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
            }}
          />
          <button
            className="bg-[rgb(42,20,83)]  text-white rounded p-5 px-10 block mt-10"
            // onClick={incrementQuantity}
          >
            <div className="flex gap-3">
              افزودن به سبد خرید{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                viewBox="0 0 512 512"
                className="fill-white"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
              </svg>
            </div>
          </button>
          </div>
        </div>
          <div className="flex flex-col justify-center items-center gap-5 w-full mt-60">
        <h3>محصولات مرتبط</h3>
          <div className=" mb-40 flex gap-5">
              
              {
              Allproducts &&  Allproducts.filter(item=> productcategory && item.category._id === productcategory._id && item.name !== products.name).slice(0, 5).map(product=> (
                  <div
                  key={product._id}
                  className="bg-white  rounded-xl w-60 flex flex-col justify-center items-center gap-8 border border-gray-200 shadow p-2"
                  onClick={()=>handleCardClick(product)}
                >
                  <Image
                    src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                    alt={product.name}
                    width={200}
                    height={150}
                  />
                  <p className="font-semibold">{product.name}</p>
       {product.quantity ? <p className="mb-2">{product.price} تومان</p>: <p >موجود نیست</p>} 
  
                  <button  className="mini-card-button font-semibold bg-[rgb(42,20,83)] text-white mb-3 rounded-3xl p-2 px-4">
                    مشاهده کالا
                  </button>
                </div>
              )
          )
              }
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default ProductPage;
