import axios from "axios";

export function AthLogin({username,password}:any){
    axios.post('http://localhost:8000/api/auth/login',{username,password})
}