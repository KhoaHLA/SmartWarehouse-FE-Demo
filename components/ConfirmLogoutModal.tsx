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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" onClick={handleOverlayClick}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6 text-center transform transition-all duration-200 scale-100" onClick={e => e.stopPropagation()}>
        <div className="mb-4">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Xác nhận đăng xuất</h2>
        </div>
        <p className="mb-6 text-gray-600 dark:text-gray-400">Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  )
} 