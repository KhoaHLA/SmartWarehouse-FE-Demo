"use client"
import { useEffect, useState } from "react"
import Dashboard from "../components/Dashboard"

export default function Home() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("tvl_logged_in"))
  }, [])

  if (loggedIn === null) {
    // Đợi kiểm tra trạng thái đăng nhập
    return null
  }

  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded shadow text-center">
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Vui lòng đăng nhập để truy cập trang chủ</h2>
          <p className="text-gray-600 dark:text-gray-300">Bạn cần đăng nhập để sử dụng hệ thống quản lý kho.</p>
        </div>
      </div>
    )
  }

  return <Dashboard />
} 