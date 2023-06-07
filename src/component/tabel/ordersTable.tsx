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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}


export default function BasicTable({limit ,search}:{limit:number,search:string}) {
  
  const [user , setUser] = useState([])
  const [rows , setRows] = useState([])
  const [userName , setUserName] = useState([])
  const [date , setDate] = useState(false)
  const [page,setPage] = useState(1)
  // const [searchTxt,setSearchTxt] = useState("")
  let counter = rows.length
  
    useEffect(() => {
        const res = axios.get(`http://localhost:8000/api/orders?page=${page}&limit=${limit}`)
        .then((res: any) => {
          counter = res.data.data.orders.length

            // console.log(res.data.data.orders.length)
          setRows(res.data.data.orders) 

      // const newUser = res.data.data.orders.map(item=>{
      //   return {
      //       item
      //     }
    // })
    
    })
}, [page,limit])

      const handelSort =()=>{
        setDate(!date)
      }
// console.log(rows)
useEffect(() => {
  const cookie = new Cookies();

  const accessToken = cookie.get('accessToken');
  accessToken && axios.get(`http://localhost:8000/api/users`)
  .then((res: any) => console.log(res.data))
// setUserName(newUser) 
}, [])
// console.log(userName)
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
  return (
    <TableContainer component={Paper} sx={{ direction:"rtl"} }>
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
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="right">
                {row.user}
              </TableCell>
              <TableCell align="right" className="py-7">{row.totalPrice}</TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
              <TableCell align="right">بررسی سفارش</TableCell>
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