// app/layout.tsx
import type { Metadata } from 'next'
import { Annie_Use_Your_Telescope } from 'next/font/google'
import NavBar from './NavBar'
import './globals.css'

const annie = Annie_Use_Your_Telescope({
  subsets: ['latin'],
  variable: '--font-annie',
  weight: '400'
})

export const metadata: Metadata = {
  title: 'NYT-Bestseller',
  description: 'Bestsellet book list by NY-Times'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${annie.variable} antialiased`}>
        <NavBar />
        <main className='main'>{children}</main>
      </body>
    </html>
  )
}
