import BoxCategory from '@/component/card/sectionSubCategiry'
import MiniCategory from '@/component/categoryUiFirstPage';
import MiniSlider from '@/component/categoryUiFirstPage/miniSlider';
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
      <main className="h-screen w-full overflow-x-hidden bg-[#f8f9fa] px-20 mb-20">
      <Slideshow/>
      <MiniCategory/>
      <MiniSlider/>
      <BoxCategory/>
    </main>
    </Layout>
    </QueryClientProvider>

  )
}
