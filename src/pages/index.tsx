import BoxCategory from '@/component/card/boxCard'
import Layout from '@/layout/layout'
import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';
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
      {/* <TinySlider settings={settings}>
    {imgs.map((el, index) => (
      <div key={index} style={{ position: "relative" }}>
        <img
          className={`tns-lazy-img`}
          src={loadingImage}
          data-src={el}
          alt=""
          style={imgStyles}
        />
      </div>
    ))}
</TinySlider> */}
      <BoxCategory/>
    </main>
    </Layout>
    </QueryClientProvider>

  )
}
