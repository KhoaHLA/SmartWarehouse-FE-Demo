'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Package, 
  DollarSign, 
  TrendingUp, 
  BarChart3,
  ArrowRight,
  Calendar,
  FileText
} from 'lucide-react'

export default function BaoCaoPage() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const dark = localStorage.getItem('tvl_dark_mode') === 'true'
    setDarkMode(dark)
  }, [])

  const reportCards = [
    {
      title: 'Báo cáo tồn kho',
      description: 'Thống kê hàng tồn kho theo danh mục, vị trí và giá trị',
      icon: Package,
      href: '/bao-cao/ton-kho',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      stats: {
        total: '1,234',
        unit: 'sản phẩm',
        change: '+12%',
        changeType: 'positive'
      }
    },
    {
      title: 'Báo cáo doanh thu',
      description: 'Phân tích doanh thu theo thời gian, khách hàng và sản phẩm',
      icon: TrendingUp,
      href: '/bao-cao/doanh-thu',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      stats: {
        total: '2.5B',
        unit: 'VNĐ',
        change: '+8.5%',
        changeType: 'positive'
      }
    },
    {
      title: 'Báo cáo công nợ',
      description: 'Theo dõi công nợ phải thu, phải trả và tuổi nợ',
      icon: DollarSign,
      href: '/bao-cao/cong-no',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      stats: {
        total: '450M',
        unit: 'VNĐ',
        change: '-5.2%',
        changeType: 'negative'
      }
    }
  ]

  const quickStats = [
    {
      title: 'Tổng sản phẩm',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: Package,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Doanh thu tháng',
      value: '2.5B VNĐ',
      change: '+8.5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Công nợ hiện tại',
      value: '450M VNĐ',
      change: '-5.2%',
      changeType: 'negative',
      icon: DollarSign,
      color: 'text-orange-600 dark:text-orange-400'
    },
    {
      title: 'Đơn hàng mới',
      value: '89',
      change: '+15%',
      changeType: 'positive',
      icon: FileText,
      color: 'text-purple-600 dark:text-purple-400'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Báo cáo & Thống kê</h1>
          <p className="text-gray-600 dark:text-gray-400">Tổng quan và phân tích dữ liệu hệ thống</p>
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">so với tháng trước</span>
            </div>
          </div>
        ))}
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {reportCards.map((report, index) => (
          <Link key={index} href={report.href} className="group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${report.color} text-white`}>
                  <report.icon className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {report.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {report.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {report.stats.total}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {report.stats.unit}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    report.stats.changeType === 'positive' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {report.stats.change}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">tháng này</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Hoạt động gần đây</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { action: 'Nhập kho', item: 'Laptop Dell XPS 13', time: '2 giờ trước', type: 'import' },
              { action: 'Xuất kho', item: 'iPhone 15 Pro', time: '4 giờ trước', type: 'export' },
              { action: 'Thanh toán', item: 'Công ty ABC', time: '6 giờ trước', type: 'payment' },
              { action: 'Đặt hàng', item: 'Công ty XYZ', time: '8 giờ trước', type: 'order' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'import' ? 'bg-green-500' :
                  activity.type === 'export' ? 'bg-blue-500' :
                  activity.type === 'payment' ? 'bg-purple-500' : 'bg-orange-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}: {activity.item}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 