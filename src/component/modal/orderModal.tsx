// بررسی سفارشات یوزر ها توسط ادمین

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
export default function FormDialogOrdaer({row, setIsStatus, isStatus}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
// console.log(row)

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('fa-IR');
  return formattedDate;
  };

const handledeliveryStatus = (id:string)=>{
  console.log(row)

const deliveryStatus = "true"
const data={
  deliveryStatus:deliveryStatus,
  products : row.products.map((item:any)=>{

    return {
      product:item.product._id,
      // id:item._id,
      count:item.count
  }
  })
}
// console.log(data)
axios.patch(`http://localhost:8000/api/orders/${id}`,data)
setIsStatus(!isStatus)
console.log(data)
}
  return (
    <div >
      <Button variant="outlined" onClick={handleClickOpen} sx={{borderColor:"green" , color:"green" }}>
        بررسی سفارش
      </Button>
      <Dialog open={open} onClose={handleClose} dir="rtl">
        <Box sx={{display:"flex" , justifyContent: 'space-between'}}>
        <DialogTitle>نمایش سفارش</DialogTitle>
        <DialogActions>
          <CloseIcon onClick={handleClose} sx={{color:"red"}}/>
        </DialogActions>
        </Box>
        <DialogContent sx={{display:"flex" , flexDirection: 'column', gap:4}}>
          <DialogContentText>
                نام کاربری : { row.user.lastname}
          </DialogContentText>
          <DialogContentText>
                 آدرس : { row.user.address}
          </DialogContentText>
          <DialogContentText>
                 تلفن : {row.user.phoneNumber}
          </DialogContentText>
          <DialogContentText>
                 زمان سفارش : { formatDate(row.createdAt)}
          </DialogContentText>
          <table className="w-full border-2 border-green-500 overflow-x-scroll mt-5" dir="rtl">
            <thead>
                <tr className="border-b-2 border-green-500">
                    <th className="p-5">عنوان</th>
                    <th className="p-5 curser-pointer">قیمت  </th>
                    <th className="p-5" >موجودی </th>
                </tr>

            </thead>
            <tbody>
            <tr className="border-b hover:bg-gray-100 hover:border-red-500 hover:border">
                <th className=" w-32 p-2">{row.products.length >0 && row.products[0].product && row.products[0].product.name}</th>
                <th className="">{row.totalPrice}</th>
                <th className="">{row.products.length >0 && row.products[0].count}</th>
            </tr>
            </tbody>
            </table>


          <DialogContentText sx={{bgcolor:'success.main',width:"auto",padding:1 , color:"white",mx: 'auto' }} onClick={()=>handledeliveryStatus(row._id)}>
                {row.deliveryStatus ? "تحویل داده شده": "در انتظار تحویل"}
          </DialogContentText>

        </DialogContent>

      </Dialog>
    </div>
  );
}