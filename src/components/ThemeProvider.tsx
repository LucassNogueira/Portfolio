'use client'

import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ReactNode, useMemo } from 'react'
import { useThemeMode } from '@/lib/themeContext'

const getTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: '#dc2626', // Red to match logo
      light: '#ef4444',
      dark: '#b91c1c',
    },
    secondary: {
      main: mode === 'light' ? '#1f2937' : '#e5e7eb',
    },
    background: {
      default: mode === 'light' ? '#f5f5f4' : '#0a0a0a', // Soft warm gray / Deep black
      paper: mode === 'light' ? '#ffffff' : '#1a1a1a', // White / Dark charcoal
    },
    text: {
      primary: mode === 'light' ? '#111827' : '#f9fafb', // Near black / Off-white
      secondary: mode === 'light' ? '#6b7280' : '#9ca3af', // Medium gray
    },
    divider: mode === 'light' ? '#d4d4d8' : '#374151', // Slightly darker for visibility on soft background
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      fontSize: '110px',
      fontWeight: 900,
      lineHeight: '90px',
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
  const { mode } = useThemeMode()
  const theme = useMemo(() => getTheme(mode), [mode])
  
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
