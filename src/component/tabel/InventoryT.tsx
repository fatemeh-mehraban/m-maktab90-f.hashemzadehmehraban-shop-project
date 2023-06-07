import * as React from 'react';
import { Typography,Box ,Avatar} from '@mui/material'
import {useState,useEffect } from "react"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { Pagination } from '@mui/material';
// import {option} from '../kit/option';
import { ArrowBackIcon } from '@mui/icons-material/ArrowBack';

const columns: GridColDef[] = [
  {field: 'images', headerName: 'تصویر', width: 90, renderCell:(params)=> <Avatar src={`http://localhost:8000/images/products/images/${params.row.images[0]}`}/>,sortable:false,filterable:false} ,
  {field: 'name',headerName: 'عنوان',width: 450},
  {field: 'price',headerName: 'قیمت',width: 250,editable: true,},
  {field: 'quantity',headerName: 'موجودی',type: 'string',width: 200},
  {field: 'action',headerName: 'امکانات',width: 210,    renderCell: (params) => (
    <div className='rounded-md border border-1 border-green-400'>
      <EditOutlinedIcon sx={{color:"green" ,mr:1, ml:1  }} />
      <ContentCopyOutlinedIcon sx={{color:"green",pr:1 , pl:1 , borderRight: 1, borderLeft: 1, fontSize:'40px',borderColor:'green'}}/>
      <DeleteOutlineIcon sx={{color:"green", mr:1 , ml:1}} />
    </div>
  ),sortable:false , filterable:false},

];



export default function DataGridDemo() {
    const [products , setProducts] = useState([])
    const [pageSize,setPageSize] = useState(1)
    const [page,setPage] = useState(1)
    const [row,setRow] = useState([])

  //   useEffect(()=>{    
  //       const res = axios.get(`http://localhost:8000/api/products?page=${pageSize}&limit=4&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8`)
  //       .then((res:any)=>{
  //               const newproduct= res.data.data.products.map(item=>{
  //                return {  id:item._id,
  //                 // option:<option/>,
  //                   ...item
  //               }
  //               })
  //           setRow(newproduct)
  //      })
  
  // },[pageSize])

  
useEffect(() => {
  const res = axios.get(`http://localhost:8000/api/products?page=${page}&limit=${pageSize}&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8`)
    .then((res: any) => {
      const newProduct = res.data.data.products.map(item => {
        return {
          id: item._id,
          ...item
        }
      })
      setRow(newProduct)

    })
}, [page, pageSize])

// function handlePageChange (){
//   setPage(page + 1)
// }
function handlePageChange() {
  console.log("525");
  
  setPage(page + 1);
}

  return (
    <Box sx={{ width: '100%' }} dir="rtl">
        <Typography
        variant="h5"
        component="h3"
        sx={{mt:3,mb:3}}
        >
            مدیریت محصول
        </Typography>
{row && <DataGrid
        rows={row}
        columns={columns} 
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        // pageSizeOptions={[100]}
        // checkboxSelection
        
        // pageSizeOptions={[4, 10, 25]}
        // onStateChange={}
        // onPageChange={(Page) => handlePageChange(Page)}
                disableRowSelectionOnClick
      />}
    </Box>
  );
}
