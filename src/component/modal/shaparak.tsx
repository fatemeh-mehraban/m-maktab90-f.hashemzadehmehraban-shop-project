import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import usestore from "../../store"
import { renderToStaticMarkup } from 'react-dom/server';
import swal from 'sweetalert';
// import swal from '@sweetalert/with-react'
import { Component } from 'react';
import Button from '@/component/kit/button';
import RtlProvider from '../kit/RtlProvider';
import { useRouter } from "next/router";

export default function GoShaparak() {
  const [open, setOpen] = React.useState(false);
  const reload = usestore((state) => state.reload)
  const setReload = usestore((state) => state.setReload)
  const router = useRouter()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    swal(" عملیات پرداخت لغو شد!","","error")
    router.push("/cart")
    setOpen(false);
  };
  const handlePay = () => {
      router.push("/")
    swal(" عملیات با موفقیت ثبت شد!","","success")
    setOpen(false);
  };
  const handledelete =(id:string)=>{
    axios.delete(`http://localhost:8000/api/products/${id}`).then(res=>{

      setReload(!reload)
      return swal("حذف شد!","","error")

    })
  }
  return (
    <div>
        <Button varients="pay" text=" پرداخت " type="submit" onClick={handleClickOpen}/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
             <Typography variant="h6" gutterBottom  paddingX={10} paddingY={5}  sx={{width:1,textAlign: 'right', backgroundColor: "#120051" ,color:"white"}}>
        پرداخت
      </Typography>
      <Grid container spacing={5}  padding={10} sx={{direction: 'rtl'}}>
        <Grid item xs={12} md={6}>
        {/* <RtlProvider> */}
            <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            sx={{direction: 'rtl'}}

             />
         {/* </RtlProvider> */}


        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
        <DialogActions className="flex gap-2 justify-center w-full">
        <Button varients="pay" text=" پرداخت " type="submit" onClick={handlePay} />
        <Button varients="pay" text=" انصراف " type="submit"  onClick={handleClose}/>
        </DialogActions>
      </Grid>
      </Dialog>
    </div>
  );
}