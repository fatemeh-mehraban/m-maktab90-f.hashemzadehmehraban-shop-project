// import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
// import { themeRegisterButton } from '../../services/styleMui';
// import { GlobalContext } from "@/pages/context/GlobalContext";
import { useContext,useState } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import { themeRegisterButton } from "@/lib/services/styleMui";

export default function MaxWidthDialog() {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("sm");

// const { adminLogin } = useContext(GlobalContext)
const [admins ,setAdmins]=useState({
  username:"",
  password:""
})
const onChangeHandler=(e:any)=>{
// e.preventDefault()
setAdmins({...admins , [e.target.name]:e.target.value})
}
const login =(e:any)=>{
  e.preventDefault()
  const data={
    username:admins.username,
    password:admins.password
  }
  // adminLogin(data)
  
}



  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
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
          <Button className="bg-[#28a745] text-white hover:bg-[#28a745]" type="submit" onClick={handleClose}><LoginIcon className="ml-1"/> ورود</Button>
          <Button className="bg-[#f8f9fa] text-black mr-2" onClick={handleClose}>لغو</Button>
        </DialogActions>
    </Box>



      </Dialog>
      </>
  )
}
