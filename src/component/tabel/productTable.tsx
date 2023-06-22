// // جدول کالاها
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
import { Box, Button, IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Cookies from 'universal-cookie';
import { request } from '@/util/request';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import AddIcon from '@mui/icons-material/Add';
import FormDialog from "../modal/addProdact"
import FormDialogEdit from "../modal/EditModal"
import AlertDialogDelete from "../modal/delete"
import usestore from "../../store"
import Image from 'next/image'

const ProductTable = ({limit}:{limit:number}) => {
  const [data , setData] = useState([])
  const [page , setPage] = useState(1)
  const [category , setCategory] = useState([])
  const [isCategory , setIsCategory] = useState(true)
  const [counter , setCounter] = useState(0)
  const [copyData , setCopyData] = useState(data)
  const [pageData , setPageData] = useState([])
const reload = usestore((state) => state.reload)
const setReload = usestore((state) => state.setReload)
  useEffect(() => {
    axios.get(`http://localhost:8000/api/products`)
      .then((response) => {
        setCounter(response.data.data.products.length)
            // console.log(response.data.data.products.length)

    })
  }, [])
  // console.log(counter)
  useEffect(() => {
    axios.get(`http://localhost:8000/api/products?page=${page}&limit=${limit}&sort=-createdAt`)
      .then((response) => {
            setData(response.data.data.products)
            setCopyData(data)
    })
  }, [limit,page,reload])


  // useEffect(() => {
  //   axios.get(`http://localhost:8000/api/categories?sort=name`)
  //     .then((response) => console.log(response.data.data.categories))
  // }, [])
  
  

  // console.log(data)
      const nextpage=()=>{
        if( counter > limit ){        
          setPage(page + 1)
        }  
      }
      
      const beforpage =()=>{
        if( page > 1){
          setPage(page - 1)
        }
      }
      const handelSort =()=>{
        setIsCategory(!isCategory)
      }


  

  return (
    <TableContainer component={Paper} sx={{ direction:"rtl" , width:"65%"} }>
      <FormDialog/>
      <Table sx={{ minWidth: 650 ,border: 1,borderBottom: 0, borderColor: 'grey.300'}} aria-label="simple table" >
        <TableHead className="bg-[#120051] text-white">
          <TableRow >
            <TableCell align="center" sx={{color:"white"}}> تصویر</TableCell>
            <TableCell align="center" sx={{color:"white"}}> عنوان</TableCell>
            <TableCell align="center" sx={{color:"white"}} onClick={handelSort}> دسته بندی {isCategory ?<ArrowDropUpIcon />:<ArrowDropDownIcon/> }</TableCell>
            <TableCell align="center" sx={{color:"white"}}>امکانات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row:any) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >


              <TableCell component="th" scope="row" align="right" width="150px"><img src={`http://localhost:8000/images/products/images/${row.images[0]}`} alt="Picture of product" width={150} height={150}/></TableCell>
              <TableCell align="center"  width="300px">{row.name}</TableCell>

             
        <TableCell align="center" className="py-7">{row.category.name}</TableCell>
              {/* <TableCell align="center" className="py-7">  

                {
                 category.map((item:any) =>{
                  // console.log(item)
                  return item._id === row.category && <span key={item.id}>{item.name}</span>

                })
                }
                

                </TableCell> */}

              <TableCell Align="center" width={1}>
                <div className='rounded-md border border-1 border-green-400 w-32 flex justify-center items-center'>


                    <FormDialogEdit data={row}/>          
                    <ContentCopyOutlinedIcon sx={{color:"green",pr:1 , pl:1 , borderRight: 1, borderLeft: 1, fontSize:'40px',borderColor:'green'}}/>
                    <AlertDialogDelete row={row} setPage={setPage} setCounter={setCounter} counter={counter} data={data}/>
                    {/* <DeleteOutlineIcon sx={{color:"green", mr:1}} onClick={(e)=>handledelete(row._id)}/> */}
                </div>
                
               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center p-5 border">
            <div className='border border-[#120051]w-40 flex justify-between items-center rounded-md'>
            <IconButton aria-label="Example"  onClick={beforpage} >
                
                <KeyboardArrowRightIcon className='text-[#120051]'/>
            </IconButton> 
            <span className='border border-t-0 border-[#120051] border-b-0 h-full px-7 py-2 text-[#120051]0'> {page} </span>
            <IconButton aria-label="Example" onClick={nextpage}>
            <KeyboardArrowLeftIcon className='text-[#120051]'/>
            </IconButton>    
            </div>
       
    
            </div>
    </TableContainer>

  );
};

export default ProductTable;