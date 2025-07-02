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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={handleOverlayClick}>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Thông tin cá nhân</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 bg-gray-100 text-black"
              value={email}
              disabled
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Tên hiển thị</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-black"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="border-t pt-4">
            <label className="block text-gray-700 mb-1">Đổi mật khẩu</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 text-black mb-2"
              placeholder="Mật khẩu hiện tại"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="w-full border rounded px-3 py-2 text-black"
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 