'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Link as ScrollLink } from 'react-scroll'
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { styled } from '@mui/material/styles'
import { useThemeMode } from '@/lib/themeContext'
import { getImageUrl } from '@/lib/supabase'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: 'none',
  position: 'sticky',
}))

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 16px',
  minHeight: '64px',
  [theme.breakpoints.up('md')]: {
    padding: '12px 24px',
    minHeight: '72px',
  },
}))

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  position: 'relative',
  flexShrink: 0,
  '& img': {
    display: 'block',
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '160px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '140px',
  },
}))

const LogoImage = styled(Image)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  maxWidth: '203px',
  objectFit: 'contain',
  [theme.breakpoints.down('md')]: {
    maxWidth: '160px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '140px',
  },
}))

const NavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '40px',
  marginLeft: 'auto',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    gap: '60px',
  },
}))

const NavLink = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: '18px',
  fontWeight: 500,
  textTransform: 'none',
  padding: '10px',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    padding: '8px',
  },
}))

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}))

const DrawerContainer = styled(Box)({
  width: 250,
})

const DrawerLink = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: '16px',
  fontWeight: 500,
  textTransform: 'none',
  justifyContent: 'flex-start',
  padding: '12px 16px',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
}))

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const { mode, toggleTheme } = useThemeMode()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const navItems = [
    { label: 'Home', scrollId: 'home', href: '/' },
    { label: 'About', scrollId: 'about', href: '/about' },
    { label: 'Projects', scrollId: 'projects', href: '/projects' },
    { label: 'Writing', scrollId: 'blog', href: '/blog' },
    { label: 'Resume', scrollId: 'resume', href: '/resume' },
    { label: 'Contact', scrollId: 'contact', href: '/contact' },
  ]

  const drawer = (
    <DrawerContainer>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton>
              {isHomePage && item.href !== '/' ? (
                <ScrollLink
                  to={item.scrollId}
                  smooth={true}
                  duration={800}
                  onClick={() => setMobileOpen(false)}
                  style={{ width: '100%', cursor: 'pointer' }}
                >
                  <DrawerLink>{item.label}</DrawerLink>
                </ScrollLink>
              ) : (
                <Link href={item.href} style={{ width: '100%', textDecoration: 'none' }}>
                  <DrawerLink onClick={() => setMobileOpen(false)}>{item.label}</DrawerLink>
                </Link>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </DrawerContainer>
  )

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <StyledToolbar>
          <LogoContainer>
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <LogoImage
                src={getImageUrl('images/capture.png')}
                alt="Lucas Nogueira Logo"
                width={203}
                height={60}
                priority
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>
          </LogoContainer>
          
          <NavContainer>
            {navItems.map((item) => (
              isHomePage && item.href !== '/' ? (
                <ScrollLink
                  key={item.label}
                  to={item.scrollId}
                  smooth={true}
                  duration={800}
                  style={{ cursor: 'pointer' }}
                >
                  <NavLink>{item.label}</NavLink>
                </ScrollLink>
              ) : (
                <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
                  <NavLink>{item.label}</NavLink>
                </Link>
              )
            ))}
            <IconButton
              onClick={toggleTheme}
              color="inherit"
              aria-label="toggle theme"
              sx={{ ml: 2, color: 'text.primary' }}
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </NavContainer>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton
              onClick={toggleTheme}
              color="inherit"
              aria-label="toggle theme"
              sx={{ color: 'text.primary' }}
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <MobileMenuButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </MobileMenuButton>
          </Box>
        </StyledToolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </StyledAppBar>
  )
}

export default Header
