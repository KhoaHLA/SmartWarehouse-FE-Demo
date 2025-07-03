'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Settings, 
  Users, 
  Database, 
  Shield, 
  Bell, 
  Palette,
  ArrowRight,
  Calendar,
  FileText,
  Globe
} from 'lucide-react'

export default function CaiDatPage() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const dark = localStorage.getItem('tvl_dark_mode') === 'true'
    setDarkMode(dark)
  }, [])

  const settingCards = [
    {
      title: 'Cài đặt hệ thống',
      description: 'Cấu hình thông tin công ty, đơn vị tiền tệ, ngôn ngữ',
      icon: Settings,
      href: '/cai-dat/he-thong',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      features: ['Thông tin công ty', 'Đơn vị tiền tệ', 'Ngôn ngữ', 'Múi giờ']
    },
    {
      title: 'Quản lý người dùng',
      description: 'Thêm, sửa, xóa người dùng và phân quyền truy cập',
      icon: Users,
      href: '/cai-dat/nguoi-dung',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      features: ['Danh sách người dùng', 'Phân quyền', 'Vai trò', 'Bảo mật']
    },
    {
      title: 'Cài đặt bảo mật',
      description: 'Cấu hình mật khẩu, xác thực 2 yếu tố, lịch sử đăng nhập',
      icon: Shield,
      href: '/cai-dat/bao-mat',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      features: ['Mật khẩu', 'Xác thực 2FA', 'Lịch sử đăng nhập', 'IP Whitelist']
    },
    {
      title: 'Cài đặt thông báo',
      description: 'Cấu hình email, SMS và thông báo trong hệ thống',
      icon: Bell,
      href: '/cai-dat/thong-bao',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      features: ['Email', 'SMS', 'Push notification', 'Lịch trình']
    },
    {
      title: 'Sao lưu & Khôi phục',
      description: 'Sao lưu dữ liệu, khôi phục và xuất báo cáo',
      icon: Database,
      href: '/cai-dat/sao-luu',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      features: ['Sao lưu tự động', 'Khôi phục dữ liệu', 'Xuất báo cáo', 'Lịch sử']
    },
    {
      title: 'Giao diện & Hiển thị',
      description: 'Tùy chỉnh giao diện, theme và bố cục hiển thị',
      icon: Palette,
      href: '/cai-dat/giao-dien',
      color: 'bg-pink-500',
      hoverColor: 'hover:bg-pink-600',
      features: ['Theme', 'Bố cục', 'Màu sắc', 'Font chữ']
    }
  ]

  const systemInfo = {
    version: '1.0.0',
    lastUpdate: '2024-01-15',
    databaseSize: '2.5 GB',
    activeUsers: 12,
    totalProducts: 1234,
    systemStatus: 'Hoạt động bình thường'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cài đặt hệ thống</h1>
          <p className="text-gray-600 dark:text-gray-400">Quản lý cấu hình và thiết lập hệ thống</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {new Date().toLocaleDateString('vi-VN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Thông tin hệ thống</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Phiên bản</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{systemInfo.version}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Cập nhật cuối</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {new Date(systemInfo.lastUpdate).toLocaleDateString('vi-VN')}
            </p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Dung lượng DB</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{systemInfo.databaseSize}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Người dùng</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{systemInfo.activeUsers}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Sản phẩm</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{systemInfo.totalProducts}</p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Trạng thái</p>
            <p className="text-sm font-semibold text-green-600 dark:text-green-400">{systemInfo.systemStatus}</p>
          </div>
        </div>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingCards.map((setting, index) => (
          <Link key={index} href={setting.href} className="group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${setting.color} text-white`}>
                  <setting.icon className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {setting.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {setting.description}
              </p>
              
              <div className="space-y-2">
                {setting.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thao tác nhanh</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Sao lưu ngay</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Tạo bản sao lưu</p>
              </div>
            </button>
            
            <button className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Xuất báo cáo</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Tất cả dữ liệu</p>
              </div>
            </button>
            
            <button className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Cập nhật hệ thống</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Kiểm tra phiên bản mới</p>
              </div>
            </button>
            
            <button className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Quét bảo mật</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Kiểm tra lỗ hổng</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 