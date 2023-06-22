import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import usestore from "../../store"
import FilterListIcon from '@mui/icons-material/FilterList';


 export default function DialogSelect() {
  const [open, setOpen] = React.useState(false);
  const [pay, setPay] = React.useState<"ok"|"no"|"All"|"">("All");
  const setIsPay = usestore((state) => state.setIsPay)
  const isPay = usestore((state) => state.isPay)
  const setDeletfilter = usestore((state) => state.setDeletfilter)


  const handleChange = (event: SelectChangeEvent<typeof pay>) => {
    setPay(event.target.value || "")
    //  pay === "ok" ? setIsPay("true") : pay === "no"? setIsPay("false"): pay === "All" && setIsPay("All")
  };
  setIsPay(pay)
    // console.log(isPay)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
// console.log(pay)
  return (
    <div>
      <Button onClick={handleClickOpen} className=" text-white"><FilterListIcon/></Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle Align="RIGHT">وضعیت سفارش </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap'}}>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="demo-dialog-select-label" InputLabelProps={{ style: { backgroundColor: "white" }}}
             className="bg-white">پرداخت</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={pay}
                onChange={handleChange}
                input={<OutlinedInput label="Age" />}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                <MenuItem value={"All"}>تمام سفارش ها</MenuItem>
                <MenuItem value={"ok"}>پرداخت شده</MenuItem>
                <MenuItem value={"no"}>در انتظار پرداخت</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}