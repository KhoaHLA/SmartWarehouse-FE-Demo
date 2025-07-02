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
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-xl font-bold mb-2 text-gray-800">Vui lòng đăng nhập để truy cập trang chủ</h2>
          <p className="text-gray-600">Bạn cần đăng nhập để sử dụng hệ thống quản lý kho.</p>
        </div>
      </div>
    )
  }

  return <Dashboard />
} 