import React, { useState, useContext, useEffect } from 'react';
import { getCategory } from '@/lib/services/axios';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
const categoryName = [ 
    {

        name: 'بذریجات' ,
        bgColor:"#4D6AE4",
        id:"1"
      },
    {
 
        name: 'حبوبات' ,
        bgColor:"#9F0C0E",
        id:"2"
      },

];

export default function BoxCategory() {
  const [products, setProducts] = useState([]);
  const [categoryHome, setCategoryHome] = useState([]);
  const [categorysection, setCategorySection] = useState([]);

  const router = useRouter();


  useEffect(() => {
    getCategory().then(res => setCategoryHome(res.data.data.categories))
    const res = axios
    .get(`http://localhost:8000/api/products?limit=all`)
    .then(res => {
        setProducts(res.data.data.products);
    });
    
    
}, []);

useEffect(() => {
    categoryHome.map(category=>{
        if(categoryName[0].name===category.name) setCategorySection(prev=>[category])
        else if(categoryName[1].name===category.name) setCategorySection(prev=>[...prev,category])
    })
}, [])
const handleCardClick = (productId) => {
    // console.log("1")
    router.push(`/products/${productId}`);
  };

// console.log(router.asPath)

return (
    <>
        {
        categorysection.map(category=>(
            <div key={category._id} className={`w-full flex flex-col gap-5 justify-center py-7 ${category.name === categoryName[0].name ? `bg-[${categoryName[0].bgColor}] `:  `bg-red-900`} my-10`}>
            <h3 className="text-center text-xl font-bold text-white">{category.name}</h3>
            <div className="flex justify-center gap-5">
            {
                products 
                .filter(product => product.category._id === category._id)
                .slice(0, 5)
                .map(product=> (
                        <div
                        key={product._id}
                        className="bg-white  rounded-xl w-60 flex flex-col justify-center items-center gap-8 border border-gray-200 shadow p-2"
                        onClick={()=>handleCardClick(product._id)}
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
        ))
        }
   </>
  )
}
