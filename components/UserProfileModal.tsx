"use client"
import { useState, useEffect } from "react"

interface UserProfileModalProps {
  open: boolean
  onClose: () => void
}

export default function UserProfileModal({ open, onClose }: UserProfileModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    // Lấy thông tin từ localStorage (giả lập)
    const saved = localStorage.getItem("tvl_login")
    if (saved) {
      const { email } = JSON.parse(saved)
      setEmail(email)
      setName("Admin")
    }
  }, [open])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // Giả lập lưu tên và đổi mật khẩu
    setSuccess("Cập nhật thành công!")
    setTimeout(() => setSuccess(""), 2000)
    setPassword("")
    setNewPassword("")
  }

  if (!open) return null

  // Đóng khi click overlay, không đóng khi click vào form
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" onClick={handleOverlayClick}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg mx-4 p-8 transform transition-all duration-200 scale-100" onClick={e => e.stopPropagation()}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Thông tin cá nhân</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Cập nhật thông tin tài khoản</p>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              value={email}
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tên hiển thị</label>
            <input
              type="text"
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Đổi mật khẩu</label>
            <input
              type="password"
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 mb-3 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Mật khẩu hiện tại"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>
          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
            </div>
          )}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 