"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Dashboard from "../components/Dashboard"

export default function Home() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("tvl_logged_in")
    setLoggedIn(isLoggedIn)
    if (!isLoggedIn) {
      router.replace("/login")
    }
  }, [router])

  if (loggedIn === null) {
    // Đợi kiểm tra trạng thái đăng nhập
    return null
  }

  if (!loggedIn) {
    // Đã chuyển hướng, không render gì
    return null
  }

  return <Dashboard />
} 