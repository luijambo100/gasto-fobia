import "./globals.css";

import { ThemeProvider } from "../components/providers/theme-provider";
import { FinanceProvider } from "../context/finance-context";
import { AuthProvider } from "../context/auth-context";
import { UIProvider } from "../context/ui-context";

export const metadata={
title: "GastoFobia",
description: "Control de gastos personales"
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <UIProvider>
            <AuthProvider>
              <FinanceProvider>{children}</FinanceProvider>
            </AuthProvider>
          </UIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
