// جدول سفارشات
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect ,useState} from 'react';
import axios from 'axios';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Cookies from 'universal-cookie';
import { request } from '@/util/request';
import  DialogSelect from "@/component/kit/selectOption"
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import usestore from "../../store"
import FormDialogOrdaer from '../modal/orderModal';

export default function BasicTable({limit ,search}:{limit:number,search:string}) {
  
  const [user , setUser] = useState([])
  const [rows , setRows] = useState([])
  const [userName , setUserName] = useState([])
  const [date , setDate] = useState(false)
  const [page,setPage] = useState(1)
  const [isStatus, setIsStatus] = useState(false);
    const isPay = usestore((state:unknown) => state.isPay)



  let counter = rows.length
  // console.log(isPay)
    useEffect(() => {
        const res = axios.get(`http://localhost:8000/api/orders?page=${page}&limit=${limit}&${date?"sort=createdAt":"sort=-createdAt"}&${isPay==="no" ?"deliveryStatus=false":isPay==="ok" ? "deliveryStatus=true":"" }`)
        .then((res: any) => {
          counter = res.data.data.orders.length
          setRows(res.data.data.orders) 
    })

}, [page,limit,isPay,date,isStatus])
isPay && console.log(rows)
      const handelSort =()=>{
        setDate(!date)
      }








      const nextpage=()=>{
        if( counter >= limit ){        
          setPage(page + 1)
        }  
        // console.log(rows)
      }
      
      const beforpage =()=>{
        if( page > 1 ){
          setPage(page - 1)
        }
      }

      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('fa-IR');
        return formattedDate;
        };
console.log(rows)
  return (
    <TableContainer  component={Paper} sx={{ direction:"rtl" , width:"70%",align:"LEFT"} } >

  


      <div className="flex gap-5 items-center justify-end">
      <div className='shadow-xl	 rounded-md mb-5 ml-2 w-1/4 flex items-center'>
            {/* <YoutubeSearchedForIcon className="bg-green-400 h-full text-6xl px-4 py-2"/> */}
             <div className="bg-[#120051] text-white"> <DialogSelect/> </div> 
            
            <input type="text" placeholder="جستجو ..." dir="rtl" className="p-2 outline-none" onChange={(e)=>console.log(1)}/>
        </div>
        {/* <div>فیلتر</div> */}
      </div>
        
        

      <Table sx={{ minWidth: 650 ,border: 1,borderBottom: 0, borderColor: 'grey.300'}} aria-label="simple table" >
        
        <TableHead className="bg-[#120051] text-white">
          <TableRow >
            <TableCell align="right" sx={{color:"white"}}>نام کاربر</TableCell>
            <TableCell align="right" sx={{color:"white"}}>مجموع مبلغ</TableCell>
            <TableCell align="right" onClick={handelSort} sx={{color:"white"}}>زمان ثبت سفارش {date ?<ArrowDropUpIcon />:<ArrowDropDownIcon/> }</TableCell>
            <TableCell align="right" sx={{color:"white"}}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:any) => (

            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="right">
                
                  <span>{row.user.lastname}</span>

              

              </TableCell>
              <TableCell align="right" className="py-7">{row.totalPrice}</TableCell>
              <TableCell align="right">{formatDate(row.createdAt)}</TableCell>
              <TableCell align="right"> <FormDialogOrdaer row={row} setIsStatus={setIsStatus} isStatus={isStatus} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center p-5 border">
            <div className='border border-[#120051] w-40 flex justify-between items-center rounded-md'>
            <IconButton aria-label="Example"  onClick={beforpage} >
                
                <KeyboardArrowRightIcon className='text-[#120051]'/>
            </IconButton> 
            <span className='border border-t-0 border-[#120051] border-b-0 h-full px-7 py-2 text-[#120051]'> {page} </span>
            <IconButton aria-label="Example" onClick={nextpage}>
            <KeyboardArrowLeftIcon className='text-[#120051]'/>
            </IconButton>    
            </div>
       
    
            </div>
    </TableContainer>

  );
}