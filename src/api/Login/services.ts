import  axios  from 'axios';

export const LoginAdmin=async()=>{
    const res = await axios.get("http://localhost:8000/api/auth/login")
    return res.data
}