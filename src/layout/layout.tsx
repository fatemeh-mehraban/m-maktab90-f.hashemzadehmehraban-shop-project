import Header from "@/component/Header/header";
import { ReactNode } from "react";

export default function Layout({children}:{children:ReactNode}) {
    return (
<div dir="rtl">
<Header/>
{children}
</div>
    )
  }