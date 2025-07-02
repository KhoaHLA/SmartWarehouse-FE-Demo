'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  ChevronRight
} from 'lucide-react'
import LoginModal from './LoginModal'
import ConfirmLogoutModal from './ConfirmLogoutModal'
import UserProfileModal from './UserProfileModal'

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
  const [showLogin, setShowLogin] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('tvl_logged_in'))
  }, [])

  const handleLogin = () => {
    setShowLogin(false)
    setLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('tvl_logged_in')
    setLoggedIn(false)
    setShowLogoutConfirm(false)
  }

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

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white h-screen">
      {/* Logo - Fixed at top */}
      <div className="flex-shrink-0 p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">Smart Warehouse</h1>
        <p className="text-sm text-gray-400">Phần mềm quản lý kho bãi</p>
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
                          onClick={() => toggleExpanded(item.title)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                            isSubActive 
                              ? 'bg-blue-600 text-white' 
                              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
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
                                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                  }`}
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
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
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

      {/* Footer - Fixed at bottom */}
      <div className="flex-shrink-0 p-4 border-t border-gray-800">
        <div className="text-center">
          <p className="text-sm text-gray-400">Phiên bản 1.0.0</p>
          <p className="text-xs text-gray-500 mt-1">© 2024 TVL Quản Lý Kho</p>
          {loggedIn && (
            <div className="flex flex-col items-center gap-2 mt-4">
              <button
                className="flex items-center gap-2 focus:outline-none"
                onClick={() => setShowProfile(true)}
                title="Thông tin cá nhân"
              >
                <span className="inline-block w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.25a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.25z" />
                  </svg>
                </span>
                <span className="flex items-left justify-left text-base font-semibold text-white-800">Admin</span> 
              </button>
            </div>
          )}
          <div className="mt-4">
            {loggedIn ? (
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition"
              >
                Đăng xuất
              </button>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </div>
        <LoginModal open={showLogin} onLogin={handleLogin} onClose={() => setShowLogin(false)} />
        <ConfirmLogoutModal open={showLogoutConfirm} onConfirm={handleLogout} onCancel={() => setShowLogoutConfirm(false)} />
        <UserProfileModal open={showProfile} onClose={() => setShowProfile(false)} />
      </div>
    </div>
  )
} 