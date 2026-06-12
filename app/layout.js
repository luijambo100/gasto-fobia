import "./globals.css"
import { ThemeProvider } from "../components/providers/theme-provider"
import { FinanceProvider } from "../context/finance-context"

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>

        <ThemeProvider attribute="class" defaultTheme="dark">
          
          <FinanceProvider>
            {children}
          </FinanceProvider>

        </ThemeProvider>

      </body>
    </html>
  )
}