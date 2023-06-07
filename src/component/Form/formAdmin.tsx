// import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { themeRegisterButton } from "@/lib/services/styleMui";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import usestore from "@/store";
import axios from "axios";

export default function MaxWidthDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("sm");


const setToken = usestore(state=>state.setToken)


const [admins ,setAdmins]=useState({
  username:"",
  password:""
})
const onChangeHandler=(e:any)=>{
setAdmins({...admins , [e.target.name]:e.target.value})
}



  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleadminpanel = () => {
  }


  const handleClose = () => {
    setOpen(false)
  }

  // *******************************

 
const adminLogin = ({username,password}:any)=>{ 
  
  const cookies = new Cookies();
  axios.post('http://localhost:8000/api/auth/login',{username,password}).then((res:any)=>{
      if(res.data.status === "success"){     
          localStorage.setItem("accessToken","JWT_ACCESS_TOKEN_SECRET=c44715faa99ebc0970a03f15da0300da7936ddf09ebe7d9aa980bd4f5d5f6fcf ")
          cookies.set("accessToken",res.data.token.accessToken)
          cookies.set("refreshToken",res.data.token.accessToken)
          router.push("/Dashboard")
            

      }else{
          alert(res.data.message)
      }
    })
    const toket= cookies.get("accessToken")
}
// **********************************
const login =(e:any)=>{
  e.preventDefault()
   const username=admins.username
   const password=admins.password
   adminLogin({username,password})

}
  return (
    <>
      <AccountCircle onClick={handleClickOpen} />
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        className="flex flex-col"
      >
        <Box dir="rtl">
            <Typography  className="p-5 border-b w-full"> ورود</Typography >
        </Box>
        <DialogActions sx={{display:"flex" , justifyContent: 'center'}}>
          <Button className ="bg-[#28a745]" sx={themeRegisterButton} type="submit" onClick={handleClose}>عضویت در سایت </Button>
        </DialogActions>


    <Box component="form" noValidate autoComplete="off" className="flex flex-col items-center gap-3 my-5" dir="rtl" onSubmit={login}>
      <FormControl sx={{ width: '25ch' }}>
        <OutlinedInput placeholder="نام کاربری، ایمیل ویا شماره موبایل" name="username" onChange={onChangeHandler}  value={admins.username}/>
        {/* <MyFormHelperText /> */}
      </FormControl>

      <FormControl sx={{ width: '25ch' }}>
        <OutlinedInput placeholder="کلمه عبور " name="password" onChange={onChangeHandler} value={admins.password}/>
      </FormControl>
      
        <DialogActions>
          <Button className="bg-[#28a745] text-white hover:bg-[#28a745]" type="submit" onClick={handleadminpanel}><LoginIcon className="ml-1"/> ورود</Button>
          <Button className="bg-[#f8f9fa] text-black mr-2" onClick={handleClose}>لغو</Button>
        </DialogActions>
    </Box>



      </Dialog>
      </>
  )
}
