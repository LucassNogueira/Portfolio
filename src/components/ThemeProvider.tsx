'use client'

import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ReactNode } from 'react'

const theme = createTheme({
  palette: {
    primary: {
      main: '#d42a2a',
    },
    secondary: {
      main: '#1f1f25',
    },
    background: {
      default: '#faf8dd',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      fontSize: '110px',
      fontWeight: 900,
      lineHeight: '90px',
      color: '#1f1f25',
    },
    h2: {
      fontSize: '62px',
      fontWeight: 700,
    },
    h3: {
      fontSize: '35px',
      fontWeight: 600,
    },
    h4: {
      fontSize: '40px',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '4px',
    },
    body1: {
      fontSize: '18px',
      lineHeight: '30px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '18px',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          maxWidth: 345,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
})

interface ThemeProviderProps {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
