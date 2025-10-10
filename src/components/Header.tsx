'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
import { styled } from '@mui/material/styles'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: 'none',
  position: 'sticky',
}))

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
  padding: '0 16px',
  height: '60px',
  [theme.breakpoints.up('md')]: {
    padding: '0 24px',
  },
}))

const LogoContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '2%',
  top: '12%',
  [theme.breakpoints.down('sm')]: {
    left: '4%',
    top: '8%',
  },
}))

const LogoImage = styled(Image)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: 150,
    height: 45,
  },
}))

const NavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '60px',
  marginLeft: 'auto',
  [theme.breakpoints.down('md')]: {
    display: 'none',
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const navItems = [
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Resume', href: 'https://docs.google.com/document/d/17vuFMQnbQmFx5oOxSw7bTVmCltWY7zM_h4YgiClB77Q/edit?usp=sharing', external: true },
    { label: 'Contact', href: 'mailto:howdy@lucasnogueira.dev', external: true },
  ]

  const drawer = (
    <DrawerContainer>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton>
              {item.external ? (
                <DrawerLink
                  href={item.href}
                  rel="noopener noreferrer"
                >
                  {item.label}
                </DrawerLink>
              ) : (
                <Link href={item.href} passHref>
                  <DrawerLink>{item.label}</DrawerLink>
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
            <Link href="/">
              <LogoImage
                src="/images/capture.png"
                alt="logo"
                width={203}
                height={60}
                priority
              />
            </Link>
          </LogoContainer>
          
          <NavContainer>
            {navItems.map((item) => (
              item.external ? (
                <NavLink
                  key={item.label}
                  href={item.href}
                  rel="noopener noreferrer"
                >
                  {item.label}
                </NavLink>
              ) : (
                <Link key={item.label} href={item.href} passHref>
                  <NavLink>{item.label}</NavLink>
                </Link>
              )
            ))}
          </NavContainer>

          <MobileMenuButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </MobileMenuButton>
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
