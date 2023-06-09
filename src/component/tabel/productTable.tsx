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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';

const ProductTable = ({limit}:{limit:number}) => {
  const [data , setData] = useState([])
  const [page , setPage] = useState(1)
  const [category , setCategory] = useState([])
  const [isCategory , setIsCategory] = useState(true)

  let counter = data.length

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products?page=${page}&limit=${limit}`)
      .then((response) => {
            setData(response.data.data.products)
            counter = response.data.data.products.length
    })
  }, [limit,page])

  useEffect(() => {
    axios.get(`http://localhost:8000/api/categories?sort=name`)
      .then((response) => setCategory(response.data.data.categories))
  }, [])
console.log(data)
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
      const handelSort =()=>{
        setIsCategory(!isCategory)
      }

  return (
    <TableContainer component={Paper} sx={{ direction:"rtl"} }>
      <Box>
          <Button sx={{bgcolor: 'success.main', color:"gray",paddingY:"20px"}}>
            <AddIcon className='text-green-600'/>
            اضافه کردن محصول
          </Button>   
      </Box>
      <Table sx={{ minWidth: 650 ,border: 1,borderBottom: 0, borderColor: 'grey.300'}} aria-label="simple table" >
        <TableHead>
          <TableRow >
            <TableCell align="center"> تصویر</TableCell>
            <TableCell align="center"> عنوان</TableCell>
            <TableCell align="center" onClick={handelSort}> دسته بندی {isCategory ?<ArrowDropUpIcon />:<ArrowDropDownIcon/> }</TableCell>
            <TableCell align="center">امکانات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >


              <TableCell component="th" scope="row" align="right" width="150px"><img src={`http://localhost:8000/images/products/images/${row.images[0]}`} alt="" /></TableCell>
              <TableCell align="center"  width="300px">{row.name}</TableCell>
              <TableCell align="center" className="py-7">  
                {
                 category.map((item) =>{
                  // console.log(item)
                  return item._id === row.category && <span key={item.id}>{item.name}</span>

                })
                }
                
                </TableCell>
              <TableCell align="right" width="100px">
                <div className='rounded-md border border-1 border-green-400 w-100 flex justify-center items-center'>
                    <EditOutlinedIcon sx={{color:"green", ml:1  }} />
                    <ContentCopyOutlinedIcon sx={{color:"green",pr:1 , pl:1 , borderRight: 1, borderLeft: 1, fontSize:'40px',borderColor:'green'}}/>
                    <DeleteOutlineIcon sx={{color:"green", mr:1}} />
                </div>
                
               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center p-5 border">
            <div className='border border-green-500 w-40 flex justify-between items-center rounded-md'>
            <IconButton aria-label="Example"  onClick={beforpage} >
                
                <KeyboardArrowRightIcon className='text-green-600'/>
            </IconButton> 
            <span className='border border-t-0 border-green-500 border-b-0 h-full px-7 py-2 text-green-600'> {page} </span>
            <IconButton aria-label="Example" onClick={nextpage}>
            <KeyboardArrowLeftIcon className='text-green-600'/>
            </IconButton>    
            </div>
       
    
            </div>
    </TableContainer>

  );
};

export default ProductTable;