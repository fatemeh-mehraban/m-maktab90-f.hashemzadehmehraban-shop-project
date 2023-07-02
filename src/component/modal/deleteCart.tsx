import * as React from 'react';
import Button from '@mui/material/Button';
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
export default function AlertDialogDelete({product}) {
    const deleteCart = usestore((state) => state.deleteCart)
  const [open, setOpen] = React.useState(false);
  const reload = usestore((state) => state.reload)
  const setReload = usestore((state) => state.setReload)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handledelete =(id)=>{
    deleteCart(id)
      setReload(!reload)
       swal("حذف شد!","","error")
        setOpen(false);
}
 
  return (
    <div>
        <DeleteOutlineIcon color="error" fontSize="large" onClick={handleClickOpen}/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
از حذف کالا مطمئن هستید؟
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>خیر</Button>
          <Button onClick={()=>handledelete(product._id)} autoFocus>بله </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}