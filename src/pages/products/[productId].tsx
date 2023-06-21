import { useRouter } from 'next/router';
import Layout from '@/layout/layout';
import { GlobalContext } from '../../pages/api/context/GlobalContext';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
// {products.category.name}
const ProductPage = () => {
    const router = useRouter();
    const [products, setProducts]= useState([])

    const {productId} = router.query;
useEffect(()=>{
    axios.get("http://localhost:8000/api/products?limit=1000").then(res=>{
        const newProduct= res.data.data.products.find(item=> item._id === productId )
        setProducts(newProduct)
        })
},[])
        console.log(products)
  return (
    <>
      <Layout>
        <div className=" mt-10 mb-10">
        <div className="flex p-4 mt-10">
          <div className="ml-5">
{          products&& <Image
              src={`http://localhost:8000/images/products/images/${products.images}`}
              width={150}
              height={200}
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
{             products &&  <h1 className="font-semibold text-gray-700 text-xl mb-6">
              {products.name}
            </h1>}

            <div className="mb-6">
              <span className="font-semibold text-gray-700 ">قیمت :</span>
            { products &&  <span>{products.price} تومان</span>}
            </div>
            <div className="mb-6">
              <span className="font-semibold text-gray-700">
                درباره ی محصول:
              </span>
             { products && <span className="mb-6"> {products.description}</span>}
            </div>
          </div>
        </div>
        <div className="p-4   flex  mr-52 gap-4">
          <input
            type="number"
            className="w-24 border px-2 text center"
            min="1"
            max={products.quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
            }}
          />
          <button
            className="bg-green-500 rounded p-2"
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
      </Layout>
    </>
  );
};
export default ProductPage;
