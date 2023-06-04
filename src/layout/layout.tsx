import Header from "@/component/Header/header";
import Footer from "@/component/footer";
import { ReactNode } from "react";

export default function Layout({children}:{children:ReactNode}) {
    return (
<div dir="rtl" className="">
<Header/>
{children}
<Footer/>
</div>
    )
  }