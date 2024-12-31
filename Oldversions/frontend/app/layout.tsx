import '@styles/globals.css'
import { Inter } from 'next/font/google';
import type { Metadata } from 'next'
import CustomProvider from '@/redux/provider'
import NavBar from '@components/common/NavBar'
import Footer from '@components/common/Footer'
import Setup from '@components/utils/Setup'

const inter = Inter({ subsets: ['latin'] });

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
            <Setup />
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
<body>
<main style={{
          display: 'flex-col',
          }}>
*/