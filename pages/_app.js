import "../styles/index.css"
import Navigation from "../components/navigation"
import { Analytics } from "@vercel/analytics/react"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default MyApp
