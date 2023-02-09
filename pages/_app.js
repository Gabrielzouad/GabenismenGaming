import { ThemeProvider } from "next-themes"
import "../styles/index.css"
import Navigation from "../components/navigation"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class'>
      <Navigation />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
