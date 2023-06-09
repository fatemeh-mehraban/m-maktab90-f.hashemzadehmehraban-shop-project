import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

 const adminLogin = ({username,password})=>{
    // const router = useRouter()
    // const {username , password} = data;
    
    
    axios.post('http://localhost:8000/api/auth/login',{username,password}).then((res:any)=>{
        const cookies = new Cookies();
        // console.log(res.data);
        if(res.data.status === "success"){     
            localStorage.setItem("adminToken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzJmY2ZlMTY0YjE3YTE1OTg4ZWQzZiIsImlhdCI6MTY4NTQzNTg2MiwiZXhwIjoxNjg1NDM2NzYyfQ.d0uajm04ykbi6_UPo9Okir1lwZxcEzgds1XMoiOYd0M")
            cookies.set("adminToken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzJmY2ZlMTY0YjE3YTE1OTg4ZWQzZiIsImlhdCI6MTY4NTUxOTQ1MCwiZXhwIjoxNjg1NTIwMzUwfQ.IOg2EujMb9YEiNkmuAh0jnacNrWOJ-aRNpSXK3zoGTw")
    
            
        }else{
            alert(res.data.message)
        }
    })
   
}