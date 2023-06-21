import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';

const MiniCardProduct2 = ({Products}) => {
  const router = useRouter();

  const handleCardClick = (productId) => {
    console.log("1")
    // router.push(`/products/${productId}`);
  };
  return (
    <>
              <div
            className=" bg-white rounded-xl w-44 flex flex-col justify-center items-center gap-8 border border-gray-200 shadow p-2"
          >
            <Image
              src={`http://localhost:8000/images/products/images/${Products.images[0]}`}
              alt={Products.name}
              width={150}
              height={150}
            />
            <p className="font-semibold">{Products.name}</p>
            <p className="mb-2">{Products.price} تومان</p>

            <button onClick={()=>handleCardClick(Products._id)} className="bg-[rgb(42,20,83)] text-white mb-3 rounded-full p-2 px-4" >
              مشاهده کالا
            </button>
          </div>
        

    </>
  );
};

export default MiniCardProduct2;
