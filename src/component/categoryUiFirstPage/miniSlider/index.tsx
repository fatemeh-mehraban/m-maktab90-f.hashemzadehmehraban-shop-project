import Image from "next/image";


export default function MiniSlider() {
  return (
    <div className="grid grid-cols-2 justify-items-center mt-16">
       <Image src="/mini-slider/banner3-min.png" width={800} height={300} alt="category"/>
       <Image src="/mini-slider/lemon-min.png" width={800} height={300} alt="category"/>

    </div>
  )
}
