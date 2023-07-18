// import * as React from "react";
import Box from "@mui/material/Box";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import { useState ,useEffect} from "react";
import { themeRegisterButton } from "@/lib/services/styleMui";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import usestore from "@/store";
import axios from "axios";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "Zod";
import Button from '@/component/kit/button';
import swal from 'sweetalert';
import GoShaparak from "@/component/modal/shaparak";

export default function MaxWidthDialog() {

  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("sm");
  const [user, setUser] = useState();
const [date,setDate]= useState()
const DeleteBasket = usestore((state) => state.DeleteBasket)
const setDelivery = usestore((state) => state.setDelivery)
// const router = useRouter()


  const cookies = new Cookies();

  useEffect(()=>{
    const id = cookies.get("id");
    id && axios.get(`http://localhost:8000/api/users/${id}`).then(res=>setUser(res.data.data.user))

},[])

  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false)
  }

//   const handlePay = () => {
//     router.push("/")
//   swal(" عملیات با موفقیت ثبت شد!","","success")
//   DeleteBasket([])
//   setOpen(false);
// };

  return (
    <>

        <Box dir="rtl">
            <Typography  className="p-5 border-b w-full"> تایید اطلاعات</Typography >
        </Box>



    <Box component="form" noValidate autoComplete="off" className="flex flex-col items-center gap-3 my-5 " dir="rtl"  >
        <Box className="flex gap-3 mt-10">
        <TextField placeholder="نام کاربری و یا ایمیل "  id="username" value={user && user.firstname} disabled="disable" sx={{"& .MuiInputBase-input.Mui-disabled": {WebkitTextFillColor: "#000000"}}}/>
        <TextField   placeholder=" نام خانوادگی " id="password"  value={user && user.lastname} disabled="disabled" sx={{"& .MuiInputBase-input.Mui-disabled": {WebkitTextFillColor: "#000000"}}}/>
        </Box>
        <Box className="flex gap-3 my-10">
        <TextField  placeholder=" آدرس " id="َAddress"  value={user && user.address} disabled="disabled" sx={{"& .MuiInputBase-input.Mui-disabled": {WebkitTextFillColor: "#000000"}}}/>
        <TextField  placeholder=" شماره تلفن " id="َAddress"  value={user && user.phoneNumber} disabled="disabled" sx={{"& .MuiInputBase-input.Mui-disabled": {WebkitTextFillColor: "#000000"}}}/>
        </Box>

        <label className="mb-8 ml-4">
                تاریخ تحویل:{' '}
                <input
                  type="date"
                  className="p-3 border border-gray-200 rounded"
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e)=>setDelivery(e.target.value)}
                />
              </label>

        <DialogActions className="flex gap-2">
        <GoShaparak />
          {/* <Button varients="pay" text=" پرداخت " onClick={handlePay}/> */}
          <Button varients="pay" text=" لغو " onClick={handleClose}/>
        </DialogActions>
    </Box>



      </>
  )
}
