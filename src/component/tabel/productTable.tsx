// // جدول کالاها

import {useState,useEffect } from "react"
import axios from "axios"
import DataTable , { Direction } from 'react-data-table-Component';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
const ProductTable = () => {
  const [paginationPerPage, setPaginationPerPage] = useState(5);
    const [data, setData] = useState([]);

  const columns = [
                {
                    name:"عنوان",
                    selector:row=>row.name
                },
                {
                    name:"دسته",
                    selector:row=>row.category
                },
                {
                    name:"امکانات",
                    selector:row=>row.action
//             <>
//             <div className='rounded-md border border-1 border-green-400'>
// <EditOutlinedIcon sx={{color:"green" ,mr:1, ml:1  }} />
// <ContentCopyOutlinedIcon sx={{color:"green",pr:1 , pl:1 , borderRight: 1, borderLeft: 1, fontSize:'40px',borderColor:'green'}}/>
// <DeleteOutlineIcon sx={{color:"green", mr:1 , ml:1}} />
// </div>
//             </>
                }
            ]


// const row = [

// ]
  
// const data 
    useEffect(() => {
        axios.get("http://localhost:8000/api/products")
          .then((response) => setData(response.data.data.products))
          .catch((error) => console.log(error));
      }, [])
    //   console.log(data)

  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationRowsPerPageOptions={[3,5,10]}
        fixedHeader
        direction={Direction.RTL}
        // paginationComponentOptions={ {rowsPerPageText: ' انتخاب صفحه: ', rangeSeparatorText: 'of', noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: 'All'} }
      />
    </div>
  );
};

export default ProductTable;