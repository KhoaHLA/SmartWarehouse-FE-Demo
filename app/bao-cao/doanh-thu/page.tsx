'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Users,
  ShoppingCart,
  ArrowLeft,
  Download,
  Filter,
  Calendar,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

export default function BaoCaoDoanhThuPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedYear, setSelectedYear] = useState('2024')

  const revenueData = [
    { month: 'T1', revenue: 2500000000, orders: 156, customers: 89 },
    { month: 'T2', revenue: 2800000000, orders: 178, customers: 102 },
    { month: 'T3', revenue: 3200000000, orders: 201, customers: 115 },
    { month: 'T4', revenue: 2900000000, orders: 167, customers: 98 },
    { month: 'T5', revenue: 3500000000, orders: 223, customers: 134 },
    { month: 'T6', revenue: 3800000000, orders: 245, customers: 156 },
    { month: 'T7', revenue: 4200000000, orders: 278, customers: 178 },
    { month: 'T8', revenue: 4500000000, orders: 301, customers: 201 },
    { month: 'T9', revenue: 4800000000, orders: 324, customers: 223 },
    { month: 'T10', revenue: 5200000000, orders: 356, customers: 245 },
    { month: 'T11', revenue: 5800000000, orders: 389, customers: 278 },
    { month: 'T12', revenue: 6500000000, orders: 423, customers: 301 }
  ]

  const topProducts = [
    { name: 'Laptop Dell XPS 13', revenue: 850000000, quantity: 34, growth: '+15%' },
    { name: 'iPhone 15 Pro', revenue: 720000000, quantity: 20, growth: '+12%' },
    { name: 'iPad Pro 12.9', revenue: 680000000, quantity: 24, growth: '+8%' },
    { name: 'MacBook Air M2', revenue: 640000000, quantity: 20, growth: '+20%' },
    { name: 'Samsung Galaxy S24', revenue: 580000000, quantity: 26, growth: '+5%' }
  ]

  const topCustomers = [
    { name: 'Công ty ABC', revenue: 450000000, orders: 23, lastOrder: '2024-01-15' },
    { name: 'Công ty XYZ', revenue: 380000000, orders: 18, lastOrder: '2024-01-14' },
    { name: 'Công ty DEF', revenue: 320000000, orders: 15, lastOrder: '2024-01-13' },
    { name: 'Công ty GHI', revenue: 280000000, orders: 12, lastOrder: '2024-01-12' },
    { name: 'Công ty JKL', revenue: 250000000, orders: 10, lastOrder: '2024-01-11' }
  ]

  const periods = [
    { value: 'week', label: 'Tuần này' },
    { value: 'month', label: 'Tháng này' },
    { value: 'quarter', label: 'Quý này' },
    { value: 'year', label: 'Năm nay' }
  ]

  const years = ['2024', '2023', '2022', '2021']

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalOrders = revenueData.reduce((sum, item) => sum + item.orders, 0)
  const totalCustomers = revenueData.reduce((sum, item) => sum + item.customers, 0)
  const avgOrderValue = totalRevenue / totalOrders

  const currentMonthRevenue = revenueData[11].revenue
  const previousMonthRevenue = revenueData[10].revenue
  const revenueGrowth = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Báo cáo doanh thu</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-3">Theo dõi doanh thu theo thời gian</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 w-full sm:w-auto">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center">
            <Download className="h-4 w-4 mr-2" />
            Xuất Excel
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:gap-6 md:p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng doanh thu</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(totalRevenue / 1000000000).toFixed(1)}B VNĐ
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
            <span className="text-sm text-green-600 dark:text-green-400">+{revenueGrowth.toFixed(1)}%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">so với tháng trước</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng đơn hàng</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalOrders.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
            <span className="text-sm text-green-600 dark:text-green-400">+12.5%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">so với tháng trước</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Khách hàng mới</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCustomers.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/20">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
            <span className="text-sm text-green-600 dark:text-green-400">+8.3%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">so với tháng trước</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Giá trị đơn hàng TB</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(avgOrderValue / 1000000).toFixed(1)}M VNĐ
              </p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/20">
              <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
            <span className="text-sm text-green-600 dark:text-green-400">+5.2%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">so với tháng trước</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Bộ lọc:</span>
            </div>
            
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

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

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Biểu đồ doanh thu theo tháng</h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Doanh thu (VNĐ)</span>
          </div>
        </div>
        
        <div className="h-64 flex items-end justify-between gap-2">
          {revenueData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="relative group">
                <div 
                  className="bg-blue-500 hover:bg-blue-600 transition-all duration-200 rounded-t"
                  style={{ 
                    height: `${(item.revenue / 6500000000) * 200}px`,
                    minHeight: '20px'
                  }}
                ></div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {(item.revenue / 1000000000).toFixed(1)}B VNĐ
                </div>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products and Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 md:gap-6 md:p-6">
        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sản phẩm bán chạy</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{product.quantity} đơn vị</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {(product.revenue / 1000000).toFixed(0)}M VNĐ
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">{product.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Khách hàng tiềm năng</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{customer.orders} đơn hàng</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {(customer.revenue / 1000000).toFixed(0)}M VNĐ
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(customer.lastOrder).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 