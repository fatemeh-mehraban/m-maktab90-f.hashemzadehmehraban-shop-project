import * as React from "react";
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
import { themeRegisterButton } from './../services/styleMui';

export default function MaxWidthDialog() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("sm");

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
    <Box component="form" noValidate autoComplete="off" className="flex flex-col items-center gap-3 my-5" dir="rtl">
      <FormControl sx={{ width: '25ch' }}>
        <OutlinedInput placeholder="نام کاربری، ایمیل ویا شماره موبایل" />
        {/* <MyFormHelperText /> */}
      </FormControl>

      <FormControl sx={{ width: '25ch' }}>
        <OutlinedInput placeholder="کلمه عبور "/>
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
