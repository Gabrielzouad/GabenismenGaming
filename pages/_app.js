import { ThemeProvider } from "next-themes"
import "../styles/index.css"
import Navigation from "../components/navigation"
import { Analytics } from "@vercel/analytics/react"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class'>
      <Navigation />
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  )
}

export default MyApp
