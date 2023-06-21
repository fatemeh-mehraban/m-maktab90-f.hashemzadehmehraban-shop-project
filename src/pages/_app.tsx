import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic';
import LinearBuffer from '@/component/loading';
import {createTheme} from '@mui/material/styles'
import { ThemeProvider } from '@emotion/react';
import { GlobalProvider } from '@/context/GlobalContext';


 
const drawerWidth = 240;
const THEME = createTheme({
  typography: {
   fontFamily: "iransans"
  },
  // direction: 'rtl',
})

export default function App({ Component, pageProps }: AppProps) {
  return(
  <>  

  <ThemeProvider theme={THEME}>
    <Component {...pageProps} />
    </ThemeProvider>
    </> 
    ) 
  
}
