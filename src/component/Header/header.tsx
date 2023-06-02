import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';


import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';


import MaxWidthDialog  from "../Form/formAdmin"

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));









export default function Header() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
      useState<null | HTMLElement>(null);
  
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      console.log("1")
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
  
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <p>درباره ما</p>
        </MenuItem>
        <MenuItem>

          <p>تماس با ما</p>
        </MenuItem>
       
      </Menu>
    );
  return (
    <header className="">

<Box className="hidden md:block" sx={{ flexGrow: 1 ,marginX:"10px"}}>
      <AppBar sx={{ backgroundColor:"white",boxShadow: 0,padding:"10px"}} position="static">
        <Toolbar>
          <Box><Image src="/barishow-fa-header.png"  alt='logo' width="100" height={500} /></Box>
          <Search  sx={{ display: { xs:'none' , md:'flex' },'&:hover':{bgcolor: "grey.200"},width:{sm:"75%" , md:'60%', border: 1 }, border: 1 , borderColor: 'grey.300', backgroundColor:"grey.200" , borderRadius:5, color:"grey.800",marginTop:"10px"}}>
            <SearchIconWrapper >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="جست و جوی محصول، دسته، برند…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{textAlign:"center", marginRight: "10%"}}
            />
          </Search>
          <Typography sx={{width:"30%",color:"gray" , textAlign:"left"}}> تیم پشیبانی  09199069952</Typography>

        </Toolbar>
      </AppBar>
    </Box>
      {/* ************************************* */}
 <Box className="md:hidden" sx={{ flexGrow: 1  ,  borderBottom: 1 , borderColor: 'grey.300',marginX:"10px"}}>
      <AppBar  sx={{ backgroundColor:"white",boxShadow: 0}} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{width:1, display:"flex", justifyContent:"center"}}><Image src="/mobile-logo.png"  alt='logo' width="150" height={500} /></Box>
        </Toolbar>
      </AppBar>
    </Box>

{/* ********************************************************************************************* */}
    <Box sx={{ flexGrow: 1 , width:1  }}>
      <AppBar position="static" sx={{ backgroundColor:"white" , color:"gray",boxShadow:"rgba(33, 35, 38, 0.1) 0px 10px 10px -10px"}}>
        <Toolbar sx={{justifyContent: 'space-between', paddingTop:"30px", pb:{xs: 2, md: 0}}}>

          <Box sx={{ display: { xs: 'none', md: 'flex',gap:20 } }}>
          <Typography className="bg-[#120051] p-3 px-10 rounded-t-xl text-white"><MenuIcon sx={{ml:1}}/>دسته بندی محصولات</Typography>
          <Typography sx={{marginY:1}}>درباره ما</Typography>
          <Typography sx={{marginY:1}}>تماس با ما</Typography>
          </Box>

          <Search className="w-auto" sx={{flexGrow: 1, display: { xs:'flex' , md:'none' },'&:hover':{bgcolor: "grey.200"}, border: 1 , borderColor: 'grey.300', backgroundColor:"grey.200" , borderRadius:5, color:"grey.800",}}>
            <SearchIconWrapper >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="جست و جوی محصول، برند…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{textAlign:"center", marginRight: "14%"}}
            />
          </Search>

        <Box>
            
          <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{mr:2}}
            >
              <Badge badgeContent={0} color="error">
                  <ShoppingCartIcon />

              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MaxWidthDialog/>

            </IconButton>
        </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    </header>
  )
}