import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { GlobalProvider } from './contex/GlobalContext'
import dynamic from 'next/dynamic';
import LinearBuffer from '@/component/loading';
 

 


export default function App({ Component, pageProps }: AppProps) {
  return(
  <>  
   <GlobalProvider>
    <Component {...pageProps} />
    </GlobalProvider>
    </> 
    ) 
  
}
