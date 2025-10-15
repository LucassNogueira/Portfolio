import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@/components/ThemeProvider'
import { ThemeModeProvider } from '@/lib/themeContext'
import { QueryProvider } from '@/lib/queryClient'
import Header from '@/components/Header'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Lucas Nogueira - Web Engineer & Software Developer',
  description: 'Portfolio of Lucas Nogueira, Web Engineer at Veryable specializing in React, Next.js, and TypeScript. Building scalable solutions for marketplace and workforce management.',
  keywords: 'web engineer, software developer, react, nextjs, typescript, veryable, dallas, lucas nogueira',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <QueryProvider>
          <ThemeModeProvider>
            <ThemeProvider>
              <CssBaseline />
              <Header />
              {children}
            </ThemeProvider>
          </ThemeModeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
