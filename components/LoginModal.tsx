"use client"
import { useState, useEffect } from "react"

interface LoginModalProps {
  open: boolean
  onLogin: () => void
  onClose: () => void
}

export default function LoginModal({ open, onLogin, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Tự động điền nếu đã lưu
    const saved = localStorage.getItem("tvl_login")
    if (saved) {
      const { email, password } = JSON.parse(saved)
      setEmail(email)
      setPassword(password)
      setRemember(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Xác thực mock
    if (email === "admin@tvl.vn" && password === "123456") {
      if (remember) {
        localStorage.setItem(
          "tvl_login",
          JSON.stringify({ email, password })
        )
      } else {
        localStorage.removeItem("tvl_login")
      }
      localStorage.setItem("tvl_logged_in", "1")
      setError("")
      onLogin()
      window.location.reload()
    } else {
      setError("Email hoặc mật khẩu không đúng!")
    }
  }

  if (!open) return null

  // Đóng khi click overlay, không đóng khi click vào form
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={handleOverlayClick}>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Đăng nhập hệ thống</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 text-black"
              placeholder="Nhập email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 text-black"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="remember" className="text-gray-700">Lưu mật khẩu</label>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  )
} 