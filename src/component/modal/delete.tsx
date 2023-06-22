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
export default function AlertDialogDelete({row , setCounter , setPage , counter,data}) {
  const [open, setOpen] = React.useState(false);
  const reload = usestore((state) => state.reload)
  const setReload = usestore((state) => state.setReload)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handledelete =(id:string)=>{
    axios.delete(`http://localhost:8000/api/products/${id}`).then(res=>{

      setReload(!reload)
return swal("حذف شد!", "error")

    })
    setCounter(counter-1)
    
    if(data.length<= 1){
      setPage(prev=>prev - 1)
      
    }
  }
  return (
    <div>
        <DeleteOutlineIcon  sx={{color:"green", mr:1}} onClick={handleClickOpen}/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
از حذف کالا مطمئن هستید؟
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>خیر</Button>
          <Button onClick={()=>handledelete(row._id)} autoFocus>
بله          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}