import CardCart from '@/component/card/cardCart';
import Layout from '@/layout/layout';
import Button from '@/component/kit/button';
import MaxWidthDialog from '@/component/modal/userModal';
import Link from 'next/link';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Image from 'next/image'
import MiniCardProduct2 from '@/component/card/cardHomePage';
import { useState, useEffect } from 'react';
import axios from "axios"
import usestore from '@/store';
import Cookies from "universal-cookie";
import { useRouter } from "next/router";

export default function cart() {
const[products,setProducts]=useState([])
const[totalPrice,setTotalPrice]=useState(0)
const[updateBasket,setupdateBasket]=useState([])
        const basket = usestore((state) => state.basket)
        const counter = usestore((state) => state.counter)
        const cookies = new Cookies();
        const router = useRouter()

    useEffect(()=>{
    axios.get("http://localhost:8000/api/products").then(res =>{

        setProducts(res.data.data.products.sort(() => Math.random() - 0.5).slice(0,5))
    })

},[basket])

    useEffect(()=>{

        const initialValue = 0;
        setTotalPrice(basket.reduce((accumulator,current) => accumulator + current.price*counter, initialValue)) 

        // console.log(basket)
        // console.log(totalPrice)
},[counter,basket])

console.log(updateBasket)
console.log(basket)

    useEffect(()=>{
        const id = cookies.get("id");
        let data={
            user: id,
            products: [
              {
                product:products._id,
                count:counter
              }
            ],
            "deliveryStatus": false
          }
},[counter])

const handleClickShaparak=()=>{
    router.push("/cart/information")

}

  return (
    <Layout>
    <div className="p-10">
        <div className=" flex gap-5 items-center">
            <h3 className="border-b-2 text-red-500  pb-3 relative after:content-[''] after:rounded-full after:w-20 after:h-2 after:bg-red-500 after:absolute after:-bottom-1 after:right-0">سبد خرید </h3>
            <span className="font-bold bg-red-500 px-5 py-3 text-white rounded-full">{basket.length}</span>
        </div>
        <div className="flex gap-5 w-full mt-5">
            <div className="border-2 w-full min-h-[400px] border-[#120051] rounded-xl">
           {basket && basket.length > 0 ? basket.map(item=>(
            <CardCart key={item._id} product={item}/>
           )):<p className="text-xl text-center mt-20">سبد شما خالی است</p>}
            </div>
            <div className="border-2 w-1/2 p-5 flex flex-col gap-5 justify-center border-[#120051] rounded-xl">
                <div className="flex justify-between py-5 border-b border-[#120051]">
                    <p>قیمت کالا : </p>
                    <p>{totalPrice} تومان</p>
                </div>

                <div className="flex justify-between py-5 border-b border-[#120051]">
                    <p> هزینه ارسال : </p>
                    <p>محاسبه نشده </p>
                </div>


                <div className="flex justify-between py-5 border-b border-[#120051]">
                    <p>  مبلغ قابل پرداخت : </p>
                    <p> {totalPrice} تومان </p>
                </div>

                <Button varients="pay" text=" پرداخت و خرید"  onClick={handleClickShaparak}/>

                {/* <MaxWidthDialog/> */}
                 </div>
                <div className="w-72 h-96 border bg-[#120051] flex flex-col gap-6 text-white items-center rounded-xl py-3">
                    <Image src="/barishow-footer (1).png" width={150} height={150}/>
                    <Link href="/" className="mt-10">تماس با ما <CallIcon sx={{mr:"10px"}}/></Link>
                    <Link href="/">  پشتیبانی<SupportAgentIcon sx={{mr:"16px"}}/></Link>
                    <Link href="/">  واتساپ<WhatsAppIcon sx={{mr:"16px"}}/></Link>

                </div>



        </div>
        <div className=" w-full h-96 mt-40 flex justify-center gap-5 px-20">
        {
        products.map(product=>(
            <MiniCardProduct2 key={product._id} Products={product}/>
            ))
        }
        </div>
    </div>
    </Layout>
  )
}
