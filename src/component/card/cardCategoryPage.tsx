import Image from 'next/image'
import { useRouter } from "next/router";

export default function CardCategoryPage({name, price,img,id}) {
  const router = useRouter()

  const handleCardClick = (productId) => {
    router.push(`/products/${productId}`);
  };
  return (
    <div
    className=" bg-white rounded-xl flex flex-col justify-center items-center gap-8 border border-gray-200 shadow p-2"
  >
    <div className="relative w-full h-52">
    <Image
      src={`${img}`}
      alt={name}
      // width={150}
      // height={150}
      fill={true}
      position="absolute"

    />
    </div>

    <p className="font-semibold">{name}</p>
    <p className="mb-2">{price} تومان</p>

    <button onClick={()=>handleCardClick(id)} className="bg-[rgb(42,20,83)] text-white mb-3 rounded-full p-2 px-4" >
      مشاهده کالا
    </button>
  </div>


  )
}
