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
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>لغو</Button>
          <Button onClick={()=>handledelete(row._id)} autoFocus>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}