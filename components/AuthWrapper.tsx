'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from './Sidebar'

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const loggedIn = !!localStorage.getItem('tvl_logged_in')
    setIsLoggedIn(loggedIn)

    // Nếu chưa đăng nhập và không phải trang login, chuyển về trang login
    if (!loggedIn && pathname !== '/login') {
      router.push('/login')
    }
    // Nếu đã đăng nhập và đang ở trang login, chuyển về trang chủ
    else if (loggedIn && pathname === '/login') {
      router.push('/')
    }

    setIsLoading(false)
  }, [pathname, router])

  // Hiển thị loading khi đang kiểm tra
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Đang tải...</p>
        </div>
      </div>
    )
  }

  // Nếu đang ở trang login, không hiển thị sidebar
  if (pathname === '/login') {
    return <>{children}</>
  }

  // Nếu chưa đăng nhập, hiển thị loading (sẽ chuyển hướng)
  if (!isLoggedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chuyển hướng...</p>
        </div>
      </div>
    )
  }

  // Nếu đã đăng nhập, hiển thị layout bình thường với sidebar
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
} 