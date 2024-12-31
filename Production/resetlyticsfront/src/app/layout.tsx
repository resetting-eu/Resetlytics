
'use client' // because I want to use or not NavBar due to answering surveys

import '@/styles/globals.css';
import NavBar from '../components/ui/common/NavBar';
import Footer from '../components/ui/common/Footer';
import { usePathname } from 'next/navigation'
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/styles/theme";
function simplepage(pathname:string){
  return pathname.includes('/r/')
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const pathname = usePathname()
  return (
    <html lang="en">
      <body>
        {simplepage(pathname) ? null : <NavBar />}
        <main>{children}</main>
        {simplepage(pathname) ? null : <Footer />}
      </body>
    </html>
  );
}

{/* 
const pathname = usePathname()
  return (
    <html lang="en">
      <body>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme} >
        {simplepage(pathname) ? null : <NavBar />}
        <main>{children}</main>
        {simplepage(pathname) ? null : <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}


const asPath = router.  usePathName
// const noNav = ['/login', 'tosurvey]
return {noNav.includes(asPath) ? null : <NavBar>}




 CssBaseline kickstart an elegant, consistent, 
and simple baseline to build upon. 

          
 export default function RootLayout(props: { children: any; }) {
   return (
     <html lang="en">
       <body>
        <AppRouterCacheProvider options={{ key: 'css' }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
           {props.children}
           </ThemeProvider>
        </AppRouterCacheProvider>
       </body>
     </html>
   );
 }
 */}