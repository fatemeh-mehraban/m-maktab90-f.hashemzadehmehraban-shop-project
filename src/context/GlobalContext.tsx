import { createContext, useState } from "react";
import  axios  from 'axios';
import { useRouter } from "next/router";
import Cookies from 'universal-cookie';

export const GlobalContext = createContext({})
const ISSERVER = typeof window === "undifind";

export const GlobalProvider=({children}:any)=>{
  const [adminToken, setAdminToken] = useState(
    !ISSERVER && typeof localStorage !== 'undefined'
      ? localStorage.getItem('adminToken') || false
      : ''
  );
  
  const router =useRouter()
 const adminLogin = (data:any)=>{
const {username , password} = data;


axios.post('http://localhost:8000/api/auth/login',{username,password}).then((res:any)=>{
    const cookies = new Cookies();
    // console.log(res.data);
    if(res.data.status === "success"){     
        localStorage.setItem("adminToken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzJmY2ZlMTY0YjE3YTE1OTg4ZWQzZiIsImlhdCI6MTY4NTQzNTg2MiwiZXhwIjoxNjg1NDM2NzYyfQ.d0uajm04ykbi6_UPo9Okir1lwZxcEzgds1XMoiOYd0M")
        cookies.set("adminToken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzJmY2ZlMTY0YjE3YTE1OTg4ZWQzZiIsImlhdCI6MTY4NTUxOTQ1MCwiZXhwIjoxNjg1NTIwMzUwfQ.IOg2EujMb9YEiNkmuAh0jnacNrWOJ-aRNpSXK3zoGTw")

        router.push("/Dashboard")
    }else{
        alert(res.data.message)
    }
})}




 
return(
    <GlobalContext.Provider value={{adminToken,adminLogin}}>
            {children}
    </GlobalContext.Provider>

)
}
