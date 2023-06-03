import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Input } from 'postcss';
export default function Footer() {
  return (
    <div  className="p-20 fixed bottom-0 bg-blue-700 border-8 border-[#eea37a] border-b-0 rounded-t-[10%]">
       <div className='flex gap-5 text-white w-full border-b-2 border-[#eea37a] pb-14'>
       <div className='flex flex-col gap-7'>
            <img src="/mobile-logo.png" alt="logo"  className="w-40"/>
            <p>سایت ما همواره کنار شماست تا بهترین و مناسب ترین انتخاب را داشته باشید. پس با خیال راحت سفارش دهید.</p>
            <p>شماره پشتیبانی</p>
            <ul>
                <li>09127255043 </li>
                <li>021-22850280 021-26712210</li>
            </ul>
        </div>

        <div>
            <ul>
                <li>فروشگاه </li>
                <li>قوانین و مقررات</li>
                <li>ثبت شکایات در سایت</li>
                <li>تماس با ما</li>
                <li>پیگیری سفارش</li>
            </ul>
        </div>


        <div className='flex flex-col gap-7'>
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
                <input type="text" name="email" className='border-l border-black w-full ml-5'/>
                <ArrowBackIcon/>
                </div>
        </div>
       </div>
    </div>
  )
}
