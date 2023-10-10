import '@styles/globals.css'
import NavBar from '@components/common/NavBar'
import Footer from '@components/common/Footer'
import Setup from '@components/utils/Setup'
import Provider from "@/redux/provider"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home - RESETTING',
  description: 'RESETTING Forecasting & Analytics Webapp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body >
        <main style={{
          display: 'flex-col',
          }}>
          <Provider>
            <Setup />
            <NavBar />
            <div className='pt-5' style={{ height: '120%', minHeight: '100vh' }}>
              {children}
            </div>
            <Footer />
          </Provider>
        </main>
      </body>
    </html>
  )
}
