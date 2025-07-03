import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthWrapper from '@/components/AuthWrapper'
import { ModalProvider } from '@/components/ModalContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart Warehouse',
  description: 'Hệ thống quản lý kho bãi Smart Warehouse',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100`}>
        <ModalProvider>
          <AuthWrapper>
            <div className="pt-16 md:pt-0">
              {children}
            </div>
          </AuthWrapper>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#f3f4f6',
                color: '#111827',
              },
              className: 'dark:!bg-gray-800 dark:!text-gray-100',
            }}
          />
        </ModalProvider>
      </body>
    </html>
  )
} 