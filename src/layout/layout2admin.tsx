import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {useRouter } from "next/router"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HorizontalSplitOutlinedIcon from '@mui/icons-material/HorizontalSplitOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { grey } from '@mui/material/colors';
import {  useState } from "react"

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight({children , path}:any) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const router = useRouter()
const {pathname} = useRouter()


// ******************************
const handleRoute = (index:number)=>{
    //  console.log(e.target.innerText  )
     if( index === 0 ){
      router.push("/")
     }else if(index === 1){
      router.push("/Dashboard")
     }
     
    }
    const [ selectedIndex,setselectedIndex]=useState(3)
    const handleRouteAdmin = (e,index:any)=>{
    
    
      if( index=== 0 ){
        router.push("/products")
        setselectedIndex(0)
        
       }else if(index=== 1){
        router.push("/Dashboard/order")
        setselectedIndex(1)
       }else if(index=== 2){
        router.push("/Dashboard/Inventory")
        setselectedIndex(2)
       }
    
       
      }
// ****************************


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
 
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="bg-gray-200 text-gray-800 font-sans">
        <Toolbar>
        <IconButton
            color="black"
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
      <Main open={open} sx={{width:1}}>
        <DrawerHeader />
        {children}

      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader className="bg-gray-900 text-gray-100 font-sans">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon sx={{color:grey[300]}}/> : <ChevronRightIcon sx={{color:grey[300]}}/>}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className="bg-gray-900 text-gray-100 font-sans" >
          {['مشاهده سایت', 'میز کار'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}  onClick={()=>{handleRoute(index)}} >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                className="font-sans"
              >
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 ,pr:2}}  Align="right"/>

                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:grey[300]
                  }}
                  className="font-sans"
                  // id={index} 
                >
                  {index % 2 === 0 ? <HomeOutlinedIcon /> : <PersonalVideoIcon />}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List className="bg-gray-900 text-gray-100 h-full font-sans">
          {['کالاها', 'سفارش ها', 'موجودی کالا'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}  onClick={(e)=>handleRouteAdmin(e,index)} className={`font-sans ${pathname===`/${path}`&& index === selectedIndex? "bg-white text-black" : ""}`}>
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
                   <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 , pr:2}} Align="right"/>

                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:grey[300]
                  }}
                  className="font-sans"
                >
                  {index === 0 && <HorizontalSplitOutlinedIcon/> || index === 1 && <ShoppingCartOutlinedIcon /> || index === 2 && <Inventory2OutlinedIcon />}
                </ListItemIcon>
              </ListItemButton>
              {/* </Link> */}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}