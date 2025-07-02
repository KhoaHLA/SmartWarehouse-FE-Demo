"use client"

interface ConfirmLogoutModalProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmLogoutModal({ open, onConfirm, onCancel }: ConfirmLogoutModalProps) {
  if (!open) return null

  // Đóng khi click overlay, không đóng khi click vào form
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={handleOverlayClick}>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xs p-6 text-center" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4 text-gray-800">Xác nhận đăng xuất</h2>
        <p className="mb-6 text-gray-700">Bạn có chắc chắn muốn đăng xuất không?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Đồng ý
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  )
} 