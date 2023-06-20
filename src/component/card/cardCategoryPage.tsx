import Image from 'next/image'

export default function CardCategoryPage({name, price,img,id}) {
  return (
    <div key={id}  className="shadow-2xl flex p-3 items-center justify-between">
    
    <div className="px-2">
        <h3 className="text-right py-2">{name}</h3>
        <p> {price}تومان</p>
    </div>
    <Image  src={img}
      width={100}
      height={100}
      alt="Picture"/>
    </div>
  )
}
