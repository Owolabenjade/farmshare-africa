'use client'

import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Divider,
  Badge
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard,
  Agriculture,
  AccountBalance,
  Person,
  Logout,
  Notifications,
  Settings,
  Help,
  TrendingUp
} from '@mui/icons-material'
import { useWallet } from '@/providers/WalletProvider'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export function Navbar() {
  const { isConnected, account, balance, disconnect, connect, isLoading, chainId } = useWallet()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null)
  
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()
  const pathname = usePathname()

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget)
  }

  const handleNotificationMenuClose = () => {
    setNotificationAnchor(null)
  }

  const handleDisconnect = () => {
    disconnect()
    handleProfileMenuClose()
    router.push('/')
  }

  const navigationItems = [
    { text: 'Dashboard', icon: <Dashboard />, href: '/dashboard' },
    { text: 'Farms', icon: <Agriculture />, href: '/farms' },
    { text: 'Portfolio', icon: <AccountBalance />, href: '/portfolio' },
    { text: 'Analytics', icon: <TrendingUp />, href: '/analytics' },
  ]

  const getNetworkChip = () => {
    if (!chainId) return null
    
    const isTestnet = chainId === 296
    const isMainnet = chainId === 295
    
    if (isTestnet) {
      return <Chip label="Testnet" color="warning" size="small" sx={{ ml: 1 }} />
    }
    if (isMainnet) {
      return <Chip label="Mainnet" color="success" size="small" sx={{ ml: 1 }} />
    }
    
    return <Chip label="Wrong Network" color="error" size="small" sx={{ ml: 1 }} />
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatBalance = (balance: string) => {
    return `${parseFloat(balance).toFixed(4)} HBAR`
  }

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'white',
          color: 'text.primary',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          borderBottom: '1px solid',
          borderBottomColor: 'divider'
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setMobileDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: isMobile ? 1 : 0 }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                🌾 FarmShare Africa
              </Typography>
            </Link>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 4, flexGrow: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  href={item.href}
                  startIcon={item.icon}
                  sx={{
                    mx: 1,
                    color: pathname === item.href ? 'primary.main' : 'text.primary',
                    fontWeight: pathname === item.href ? 600 : 400,
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'primary.dark',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isConnected && !isMobile && (
              <>
                <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
                  <Badge badgeContent={3} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>

                {getNetworkChip()}

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mx: 2 }}>
                  <Typography variant="body2" fontWeight={500}>
                    {formatBalance(balance)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatAddress(account!)}
                  </Typography>
                </Box>

                <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
                  <Avatar
                    sx={{ 
                      width: 40, 
                      height: 40,
                      backgroundColor: 'primary.main',
                      fontSize: '14px',
                      fontWeight: 600
                    }}
                  >
                    {account?.slice(2, 4).toUpperCase()}
                  </Avatar>
                </IconButton>
              </>
            )}

            {!isConnected && (
              <Button
                variant="contained"
                onClick={connect}
                disabled={isLoading}
                sx={{ fontWeight: 600, px: 3, py: 1 }}
              >
                {isLoading ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem component={Link} href="/profile" onClick={handleProfileMenuClose}>
          <ListItemIcon><Person fontSize="small" /></ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem component={Link} href="/settings" onClick={handleProfileMenuClose}>
          <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDisconnect}>
          <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
          <ListItemText>Disconnect Wallet</ListItemText>
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: 280, boxSizing: 'border-box' } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
            🌾 FarmShare Africa
          </Typography>
        </Box>
        <Divider />
        
        <List>
          {navigationItems.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              href={item.href}
              onClick={() => setMobileDrawerOpen(false)}
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                backgroundColor: pathname === item.href ? 'primary.main' : 'transparent',
                color: pathname === item.href ? 'white' : 'inherit',
              }}
            >
              <ListItemIcon sx={{ color: pathname === item.href ? 'white' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

        {isConnected && (
          <>
            <Divider sx={{ mt: 'auto' }} />
            <Box sx={{ p: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Connected Account
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {formatAddress(account!)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatBalance(balance)}
              </Typography>
              {getNetworkChip()}
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Logout />}
                onClick={handleDisconnect}
                sx={{ mt: 2 }}
              >
                Disconnect
              </Button>
            </Box>
          </>
        )}
      </Drawer>
    </>
  )
}
