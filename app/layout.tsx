import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/models/RegisterModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import ToasterProvider from './providers/ToasterProviders'




export const metadata: Metadata = {
  title: 'Airbnb clone',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>

        <ClientOnly>
          <ToasterProvider/>
         <RegisterModal/>
        <Navbar/>
        </ClientOnly>

       
        
        {children}</body>
    </html>
  )
}
