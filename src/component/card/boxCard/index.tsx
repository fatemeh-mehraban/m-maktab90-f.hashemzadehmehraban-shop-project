import React, { useState, useContext, useEffect } from 'react';
import { getCategory } from '@/lib/services/axios';
import axios from 'axios';
import Image from 'next/image';
import MiniCardProduct2 from '../cardHomePage';
import { useRouter } from 'next/router';

export default function BoxCategory() {
  const [products, setProducts] = useState([]);
  const [categoryHome, setCategoryHome] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCategory().then(res => setCategoryHome(res.data.data.categories));

    const res = axios
      .get(`http://localhost:8000/api/products?sort=createdAt`)
      .then(res => {
        setProducts(res.data.data.products);
      });
  }, []);
console.log(products)
  return categoryHome.slice(0, 4).map(category => (
    <div key={category._id} className="w-full py-7">
      <h3 className="px-10 text-xl">{category.name}</h3>
      <div className="flex gap-7 w-full px-40 mt-10">
        {products
          .filter(product => product.category._id === category._id)
          .slice(0, 5)
          .map(product => {
            // Format price with comma after every three digits
            const formattedPrice = Intl.NumberFormat('fa-IR').format(product.price);
            const handleCardClick = (productId) => {
                console.log("1")
                router.push(`/products/${productId}`);
              };
            return (
              <div
                key={product._id}
                className="bg-white rounded-xl w-44 flex flex-col justify-center items-center gap-8 border border-gray-200 shadow p-2"
              >
                <Image
                  src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                  alt={product.name}
                  width={150}
                  height={150}
                />
                <p className="font-semibold">{product.name}</p>
                <p className="mb-2">{formattedPrice} تومان</p>

                <button onClick={()=>handleCardClick(product._id)} className="mini-card-button font-semibold bg-[rgb(42,20,83)] text-white mb-3 rounded-3xl p-2 px-4">
                  مشاهده کالا
                </button>
              </div>
            );
          })}
      </div>
    </div>
  ));
}
