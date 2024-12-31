//'use client'

import '@styles/globals.css'
import { Inter } from 'next/font/google';
import type { Metadata } from 'next'
import CustomProvider from '@/redux/provider'
import NavBar from '@components/common/NavBar'
import Footer from '@components/common/Footer'

const inter = Inter({ subsets: ['latin'] });

import * as React from 'react';
//import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
//import { ThemeProvider } from '@mui/material/styles';
//import CssBaseline from '@mui/material/CssBaseline';
//import theme from '@styles/theme';


export const metadata: Metadata = {
  title: 'Resetlytics',
  description: 'Resetlytics application as part of RESETTING project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) 

{
  return (
    <html lang='en'>
      <body className={inter.className}>
         <CustomProvider>
            <NavBar />
            <div className='pt-5' style={{ height: '120%', minHeight: '100vh' }}>
              {children}
            </div>
            <Footer />
          </CustomProvider>
      </body>
    </html>
  )
}

/*
export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}> 
          <ThemeProvider theme={theme}>
            CssBaseline kickstart an elegant, consistent, and simple baseline to build upon.
            <CssBaseline />
            {props.children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
// template.tsx - entity file (top level)
// no 'use client'

import HeaderComponent from './components/Header';
import Slider from './components/Slider';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

export default async function Template({ children }: {
    children: React.ReactNode
  }) {

    return <div className="container-fluid">
        <Slider/>
        <HeaderComponent />
        {children}
        <Footer/>
  </div>;
  }

*/