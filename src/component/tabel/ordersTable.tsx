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
import FormDialog from '../modal/orderModal';


export default function BasicTable({limit ,search}:{limit:number,search:string}) {
  
  const [user , setUser] = useState([])
  const [rows , setRows] = useState([])
  const [userName , setUserName] = useState([])
  const [date , setDate] = useState(false)
  const [page,setPage] = useState(1)
  const isPay = usestore((state) => state.isPay)



  let counter = rows.length
  // console.log(isPay)
    useEffect(() => {
        const res = axios.get(`http://localhost:8000/api/orders?page=${page}&limit=${limit}&${isPay==="no" ?"deliveryStatus=false":isPay==="ok" ? "deliveryStatus=true":"" }`)
        .then((res: any) => {
          counter = res.data.data.orders.length
          setRows(res.data.data.orders) 
    })
}, [page,limit,isPay])

// console.log(rows)



      const handelSort =()=>{
        setDate(!date)
      }
      useEffect(() => {
        const getUser = request.get(`/users`).then(res=>setUserName(res.data.data.users))   
      }, [])
      const nextpage=()=>{
        if( counter >= limit ){        
          setPage(page + 1)
        }  
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

  return (
    <TableContainer Align="LEFT" component={Paper} sx={{ direction:"rtl"} } >


      <div className='border border-green-400 rounded-md mb-5 w-1/4 flex'>
            {/* <YoutubeSearchedForIcon className="bg-green-400 h-full text-6xl px-4 py-2"/> */}
            <div className="bg-green-400"> <DialogSelect/> </div>
            <input type="text" placeholder="جستجو ..." dir="rtl" className="p-2 outline-none" onChange={(e)=>console.log(1)}/>
        </div>
        


      <Table sx={{ minWidth: 650 ,border: 1,borderBottom: 0, borderColor: 'grey.300'}} aria-label="simple table" >
        <TableHead>
          <TableRow >
            <TableCell align="right">نام کاربر</TableCell>
            <TableCell align="right">مجموع مبلغ</TableCell>
            <TableCell align="right" onClick={handelSort}>زمان ثبت سفارش {date ?<ArrowDropUpIcon />:<ArrowDropDownIcon/> }</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:any) => (

            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="right">
                {
                 userName.map(item=>{
                  // console.log(item)
                  return item._id === row.user && <span>{item.username}</span>

                })
                }
              </TableCell>
              <TableCell align="right" className="py-7">{row.totalPrice}</TableCell>
              <TableCell align="right">{formatDate(row.createdAt)}</TableCell>
              <TableCell align="right"> <FormDialog row={row} userName={userName}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="text-center p-5">
            <IconButton aria-label="Example"  onClick={beforpage} >
                
                <KeyboardArrowRightIcon/>
            </IconButton> 
            <span> {page} </span>
            <IconButton aria-label="Example" onClick={nextpage}>
            <KeyboardArrowLeftIcon/>
            </IconButton>    
       
    
            </div>
    </TableContainer>

  );
}