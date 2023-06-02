
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HorizontalSplitOutlinedIcon from '@mui/icons-material/HorizontalSplitOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import {useRouter } from "next/router"
import Link from 'next/link';
import  { useState } from 'react'
import { ThemeProvider } from '@emotion/react';


// import {Typography} from "@material-ui/core";
const drawerWidth = 240;
const THEME = createTheme({
  typography: {
   fontFamily: "iransans"
  }
})
const openedMixin = (theme: Theme): CSSObject => ({

  width: drawerWidth,

  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);








export default function MiniDrawer({children}:any) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter()


 const handleRoute = (index:number)=>{
//  console.log(e.target.innerText  )
 if( index === 0 ){
  router.push("/")
 }else if(index === 1){
  router.push("/Dashboard")
 }
 
}
const handleRouteAdmin = (index:any)=>{


  if( index=== 0 ){
    router.push("/products")
    
   }else if(index=== 1){
    router.push("/Dashboard/order")

   }else if(index=== 2){
    router.push("/Dashboard/Inventory")

   }

   
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
//   onClick={handleDrawerOpen}
{/* <ButtonAppBar handleDrawerOpen={handleDrawerOpen}/> */}

  return (
    <ThemeProvider theme={THEME}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar className="bg-gray-200 text-gray-900" position="fixed" open={open} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
            <Box className="w-full text-right">
          <Typography variant="h6" noWrap component="div">
            خوش آمدید
          </Typography>
          <Typography variant="h6" noWrap component="div">
            barishow
          </Typography>
            </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader className="bg-gray-100 text-gray-900">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className="bg-gray-100 text-gray-900 font-sans" >
          {['مشاهده سایت', 'میز کار'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}  onClick={()=>{handleRoute(index)}}  className="font-sans">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                className="font-sans"
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                  className="font-sans"
                  // id={index} 
                >
                  {index % 2 === 0 ? <HomeOutlinedIcon /> : <PersonalVideoIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List className="bg-gray-100 text-gray-900 h-full font-sans">
          {['کالاها', 'سفارش ها', 'موجودی کالا'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}  onClick={()=>handleRouteAdmin(index)} className="font-sans">
              {/* <Link href="/"> */}
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  
                }}
                className="font-sans"
                // onClick={handleRouteAdmin(index)}             
                 >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                  className="font-sans"
                >
                  {index === 0 && <HorizontalSplitOutlinedIcon/> || index === 1 && <ShoppingCartOutlinedIcon /> || index === 2 && <Inventory2OutlinedIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              {/* </Link> */}
            </ListItem>
          ))}
        </List>
      </Drawer>
      {children}
    </Box>
     </ThemeProvider>
  );
}