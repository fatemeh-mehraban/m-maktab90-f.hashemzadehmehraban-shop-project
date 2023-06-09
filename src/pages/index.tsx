import Layout from '@/layout/layout'
// import MaxWidthDialog  from "../component/Form/formAdmin"
import {QueryClientProvider, QueryClient}from "react-query"

const queryClient = new QueryClient()
export default function Home() {
  return (

      <QueryClientProvider client={queryClient}>
    <Layout>
      <main className="h-screen w-full overflow-x-hidden">
    </main>
    </Layout>
    </QueryClientProvider>

  )
}
