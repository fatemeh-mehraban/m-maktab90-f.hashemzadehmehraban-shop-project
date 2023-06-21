import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Input } from 'postcss';
export default function Footer() {
  return (
    <div  className="bg-[rgb(42,20,83)] rounded-t-[8%] md:rounded-none reletive w-full ">
       <div className=' flex flex-col justify-around text-white p-20 w-full md:flex-row gap-5 md:items-center'>
       <div className='flex flex-col gap-10'>
            <img src="/barishow-footer (1).png" alt="logo"  className="w-40"/>
            <p>سایت ما همواره کنار شماست تا بهترین و مناسب ترین انتخاب را داشته باشید. پس با خیال راحت سفارش دهید.</p>
            <p>شماره پشتیبانی</p>
            <ul>
                <li>09127255043 </li>
                <li>021-22850280 021-26712210</li>
            </ul>
        </div>

        <div>
            <ul  className='flex flex-col gap-5'>
                <li>فروشگاه </li>
                <li>قوانین و مقررات</li>
                <li>ثبت شکایات در سایت</li>
                <li>تماس با ما</li>
                <li>پیگیری سفارش</li>
            </ul>
        </div>


        <div className='flex flex-col gap-10'>
            <div className='flex justify-between'>
                <p>ما را در شبکه های اجتماعی دنبال کنید</p>
                <div className='flex gap-5'>
                <InstagramIcon />
               <WhatsAppIcon/>
               <MailOutlineIcon/>
                </div>
            </div>
                <p>تهران-خیابان 15 خرداد-پله نوروزخان-سرای عزیزیان-طبقه دوم-پلاک 80</p>
                <p>جهت عضویت در خبرنامه و اطلاع از آخرین تخفیف ها ایمیل خود را وارد کنید</p>
                <div className='flex p-5 justify-between bg-white text-black rounded-full'>
                <input type="text" name="email" className='border-l border-black w-full ml-5 outline-none'/>
                <ArrowBackIcon/>
                </div>
        </div>
       </div>
       <div className="px-10 flex jusrify-center">
        <p className="w-full p-10 border-t-4 border-[#eea37a] text-white">©.1399 استفاده از سایت به معنی پذیرش کلیه قوانین و مقررات سایت است و انتقال و استفاده ازمطالب سایت با ذکر منبع و لینک به منبع مجاز خواهد بود</p>
       </div>
    </div>
  )
}
