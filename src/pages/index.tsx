import BoxCategory from '@/component/card/boxCard'
import Slideshow from '@/component/slider'
import Layout from '@/layout/layout'

// import MaxWidthDialog  from "../component/Form/formAdmin"
import {QueryClientProvider, QueryClient}from "react-query"
const settings = {
  lazyload: true,
  nav: false,
  mouseDrag: true
};
const queryClient = new QueryClient()
export default function Home() {
  return (

      <QueryClientProvider client={queryClient}>
    <Layout>
      <main className="h-screen w-full overflow-x-hidden">
      <Slideshow/>
      <BoxCategory/>
    </main>
    </Layout>
    </QueryClientProvider>

  )
}
