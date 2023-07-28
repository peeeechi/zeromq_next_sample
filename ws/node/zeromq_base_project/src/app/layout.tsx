// import './globals.css';
// import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
// import ChecklistIcon from '@mui/icons-material/Checklist';
import SettingsIcon from '@mui/icons-material/Settings';
// import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'zeromq base project',
  description: 'Generated by create next app',
};

const DRAWER_WIDTH = 240;

const LINKS = [
  { text: 'Home', href: '/', icon: HomeIcon },
  { text: 'Logs', href: '/logs', icon: StarIcon },
  // { text: 'Tasks', href: '/tasks', icon: ChecklistIcon },
];

const PLACEHOLDER_LINKS = [
  { text: 'Settings', icon: SettingsIcon },
  // { text: 'Support', icon: SupportIcon },
  { text: 'Logout', icon: LogoutIcon },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <ThemeRegistry>
          {/* Appbar */}
          <AppBar position='fixed' sx={{ zIndex: 2000 }}>
            <Toolbar sx={{ backgroundColor: 'background.paper' }}>
              <DashboardIcon sx={{ color: '#444', mr: 2, transform: 'translateY(-2px)' }} />
              <Typography variant='h6' noWrap component='div' color='black'>
                PPR ZeroMQ Sample
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Side Nav */}

          <Drawer
            sx={{
              width: DRAWER_WIDTH,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
                top: ['48px', '56px', '64px'],
                height: 'auto',
                bottom: 0,
              },
            }}
            variant='permanent'
            anchor='left'>
            <Divider />
            <List>
              {LINKS.map(({ text, href, icon: Icon }) => (
                <ListItem key={href} disablePadding>
                  <ListItemButton component={Link} href={href}>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ mt: 'auto' }} />
            <List>
              {PLACEHOLDER_LINKS.map(({ text, icon: Icon }) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>

          {/* Content */}
          <Box
            component='main'
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              ml: `${DRAWER_WIDTH}px`,
              mt: ['48px', '56px', '64px'],
              p: 3,
            }}>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}