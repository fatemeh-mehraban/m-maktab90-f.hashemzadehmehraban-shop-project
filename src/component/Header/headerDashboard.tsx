import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

export default function  ButtonAppBar(handleDrawerOpen:any , open:any) {
  return (
    <Box sx={{ flexGrow: 1 }} dir="rtl">
    <AppBar position="fixed" open={open} >
    <Toolbar className="z-40">
      <IconButton
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
            color:"red",
          marginLeft:10,
          ...(open && { display: 'none' }),
        }}
      >
        <MenuIcon />
      </IconButton>
      
      <Typography variant="h6" noWrap component="div">
        Mini variant drawer
      </Typography>
    </Toolbar>
  </AppBar>
  </Box>
  )
}




    {/* <AppBar position="static" sx={{bgcolor: "grey.200",boxShadow: 0}}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2,color:"black" }}
          onClick={()=>{handleDrawerOpen}}
            // onClick={}
        >
          <MenuIcon />
        </IconButton>
        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography> */}
        // <Box sx={{ flexGrow: 1 ,display:"flex", justifyContent: 'end',gap:2}}>
        // <Button className="hover:bg-gray-400 text-black" ><BookmarkBorderOutlinedIcon className="ml-2 text-gray-300"/> بوکمارک </Button>
        // <Button className="hover:bg-gray-400 text-black" ><PersonOutlineOutlinedIcon className="ml-2 text-gray-300"/> barishow <KeyboardArrowDownSharpIcon className="mr-1 text-gray-300"/> </Button>
        // </Box>

    //   </Toolbar>
    // </AppBar>} */
