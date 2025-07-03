'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Home, 
  Truck, 
  Warehouse, 
  Package, 
  Users, 
  FileText, 
  DollarSign,
  Settings,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Menu,
  Moon,
  Sun
} from 'lucide-react'
import { useModal } from './ModalContext'

const menuItems = [
  {
    title: 'Trang chủ',
    href: '/',
    icon: Home
  },
  {
    title: 'Đăng ký xe',
    href: '/dang-ky-xe',
    icon: Truck
  },
  {
    title: 'Quản lý kho',
    icon: Warehouse,
    submenu: [
      { title: 'Tổng quan', href: '/quan-ly-kho' },
      { title: 'Nhập kho', href: '/quan-ly-kho/nhap-kho' },
      { title: 'Xuất kho', href: '/quan-ly-kho/xuat-kho' },
      { title: 'Tồn kho', href: '/quan-ly-kho/ton-kho' },
      { title: 'Lịch sử', href: '/quan-ly-kho/lich-su' }
    ]
  },
  {
    title: 'Quản lý khách hàng',
    icon: Users,
    submenu: [
      { title: 'Danh sách khách hàng', href: '/quan-ly-khach-hang/danh-sach' },
      { title: 'Thêm khách hàng', href: '/quan-ly-khach-hang/them-khach-hang' }
    ]
  },
  {
    title: 'Quản lý hợp đồng',
    href: '/hop-dong',
    icon: FileText
  },
  {
    title: 'Quản lý công nợ',
    href: '/cong-no',
    icon: DollarSign
  },
  {
    title: 'Báo cáo',
    icon: BarChart3,
    submenu: [
      { title: 'Báo cáo tồn kho', href: '/bao-cao/ton-kho' },
      { title: 'Báo cáo doanh thu', href: '/bao-cao/doanh-thu' },
      { title: 'Báo cáo công nợ', href: '/bao-cao/cong-no' }
    ]
  },
  {
    title: 'Cài đặt hệ thống',
    icon: Settings,
    submenu: [
      { title: 'Cài đặt hệ thống', href: '/cai-dat/he-thong' },
      { title: 'Quản lý người dùng', href: '/cai-dat/nguoi-dung' }
    ]
  }
]

export default function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const { setShowLogin, setShowLogoutConfirm, setShowProfile } = useModal()

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('tvl_logged_in'))
    const dark = localStorage.getItem('tvl_dark_mode') === 'true'
    setDarkMode(dark)
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])



  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isActive = (href: string) => {
    return pathname === href
  }

  const isSubmenuActive = (submenu: any[]) => {
    return submenu.some(item => pathname === item.href)
  }

  const toggleDarkMode = () => {
    const newDark = !darkMode
    setDarkMode(newDark)
    localStorage.setItem('tvl_dark_mode', newDark.toString())
    if (newDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <>
      {/* Nút menu cho mobile */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-white p-2 rounded shadow focus:outline-none"
        onClick={() => setMobileOpen(true)}
        aria-label="Mở menu"
      >
        <Menu className="w-7 h-7" />
      </button>

      {/* Sidebar cho PC và mobile */}
      {/* PC: luôn hiển thị, Mobile: slide-in overlay */}
      <div>
        {/* Overlay cho mobile */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
        <div
          className={`
            fixed top-0 left-0 z-50 h-screen w-64 bg-gray-200 text-gray-900 flex flex-col
            dark:bg-gray-900 dark:text-white
            transition-transform duration-300
            md:static md:translate-x-0 md:flex
            ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
          `}
          style={{ maxWidth: '100vw' }}
        >
          {/* Logo - Fixed at top */}
          <div className="flex-shrink-0 p-6 border-b border-gray-300 dark:border-gray-800">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">SmartWarehouse</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Phần mềm quản lý kho hiện đại</p>
          </div>

          {/* Navigation - Scrollable */}
          {loggedIn && (
            <nav className="flex-1 overflow-y-auto hide-scrollbar">
              <div className="p-4">
                <ul className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    const hasSubmenu = item.submenu && item.submenu.length > 0
                    const isExpanded = expandedItems.includes(item.title)
                    const isSubActive = hasSubmenu && isSubmenuActive(item.submenu)

                    return (
                      <li key={item.title}>
                        {hasSubmenu ? (
                          <div>
                            <button
                              onClick={() => {
                                toggleExpanded(item.title)
                                if (mobileOpen) setMobileOpen(false)
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                                isSubActive 
                                  ? 'bg-blue-600 text-white' 
                                  : 'text-gray-700 hover:bg-gray-300 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                              }`}
                            >
                              <div className="flex items-center">
                                <Icon className="h-5 w-5 mr-3" />
                                <span>{item.title}</span>
                              </div>
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </button>
                            {isExpanded && (
                              <ul className="ml-8 mt-2 space-y-1">
                                {item.submenu.map((subItem) => (
                                  <li key={subItem.title}>
                                    <Link
                                      href={subItem.href}
                                      className={`block px-3 py-2 rounded-lg transition-colors ${
                                        isActive(subItem.href)
                                          ? 'bg-blue-600 text-white'
                                          : 'text-gray-600 hover:bg-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                                      }`}
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      {subItem.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={item.href || '#'}
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                              isActive(item.href || '')
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 hover:bg-gray-300 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                            }`}
                            onClick={() => setMobileOpen(false)}
                          >
                            <Icon className="h-5 w-5 mr-3" />
                            <span>{item.title}</span>
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </nav>
          )}

          {/* Nếu chưa đăng nhập, chỉ hiển thị nút đăng nhập */}
          {!loggedIn && (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setShowLogin(true)}
              >
                Đăng nhập
              </button>
            </div>
          )}

          {/* Footer - Fixed at bottom */}
          <div className="flex-shrink-0 border-t border-gray-300 dark:border-gray-800">
            {/* User Profile Section */}
            {loggedIn && (
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <button
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  onClick={() => setShowProfile(true)}
                  title="Thông tin cá nhân"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.25a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.25z" />
                      </svg>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Admin User
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Quản trị viên
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="p-4 space-y-2">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 transition-all duration-200 group"
                title="Chuyển chế độ sáng/tối"
              >
                <div className="flex items-center justify-center w-5 h-5">
                  {darkMode ? (
                    <Sun className="w-4 h-4 text-yellow-500 group-hover:scale-110 transition-transform" />
                  ) : (
                    <Moon className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                  )}
                </div>
                <span className="text-sm font-medium">
                  {darkMode ? 'Chế độ sáng' : 'Chế độ tối'}
                </span>
              </button>

              {/* Login/Logout Button */}
              {loggedIn ? (
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 transition-all duration-200 group"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="text-sm font-medium">Đăng xuất</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-400 transition-all duration-200 group"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span className="text-sm font-medium">Đăng nhập</span>
                </button>
              )}
            </div>

            {/* Version Info */}
            <div className="px-4 pb-4">
              <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Trực tuyến</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Phiên bản 1.0.0</p>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">© 2024 TVL Quản Lý Kho</p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  )
} 