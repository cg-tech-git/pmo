import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PMO Application - Project Management Office',
  description: 'Comprehensive project management and portfolio oversight platform',
  keywords: ['PMO', 'Project Management', 'Portfolio', 'EVM', 'Dashboard'],
  authors: [{ name: 'PMO Development Team' }],
}

export const viewport = 'width=device-width, initial-scale=1'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} h-full`}>
        <div id="root" className="min-h-full">
          {children}
        </div>
      </body>
    </html>
  )
} 