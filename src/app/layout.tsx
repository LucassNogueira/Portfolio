import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@/components/ThemeProvider'
import Header from '@/components/Header'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Lucas Nogueira - Software Developer',
  description: 'Portfolio of Lucas Nogueira, Software Developer and BBM Graduate',
  keywords: 'software developer, react, nextjs, portfolio, lucas nogueira',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider>
          <CssBaseline />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
