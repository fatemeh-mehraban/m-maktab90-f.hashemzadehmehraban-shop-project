import Image from "next/image";
import { useRouter } from "next/router";


export default function MiniSlider() {
  const router = useRouter()

  return (
    <div className="grid grid-cols-2 justify-items-center mt-16">
       <Image src="/mini-slider/banner3-min.png" width={800} height={300} alt="category" className="cursor-pointer" onClick={()=>{
              router.push(`/categories/lwazm-qnady/subcategories/pwdrnargyl`)
            }}/>
       <Image src="/mini-slider/lemon-min.png" width={800} height={300} alt="category" className="cursor-pointer" onClick={()=>{
              router.push(`/categories/lwazm-qnady`)
            }}/>

    </div>
  )
}
