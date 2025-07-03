'use client'

import { useState, useEffect } from 'react'
import { 
  Package, 
  TrendingUp, 
  TrendingDown, 
  Filter,
  Download,
  Search,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'
import Link from 'next/link'

export default function BaoCaoTonKhoPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const inventoryData = [
    {
      id: 'SP001',
      name: 'Laptop Dell XPS 13',
      category: 'Máy tính',
      quantity: 45,
      unit: 'cái',
      unitPrice: 25000000,
      totalValue: 1125000000,
      location: 'Khu A - Kệ 1',
      status: 'normal',
      lastUpdated: '2024-01-15',
      minStock: 10,
      maxStock: 100
    },
    {
      id: 'SP002',
      name: 'iPhone 15 Pro',
      category: 'Điện thoại',
      quantity: 23,
      unit: 'cái',
      unitPrice: 35000000,
      totalValue: 805000000,
      location: 'Khu B - Kệ 3',
      status: 'low',
      lastUpdated: '2024-01-14',
      minStock: 20,
      maxStock: 80
    },
    {
      id: 'SP003',
      name: 'iPad Pro 12.9',
      category: 'Máy tính bảng',
      quantity: 67,
      unit: 'cái',
      unitPrice: 28000000,
      totalValue: 1876000000,
      location: 'Khu A - Kệ 2',
      status: 'normal',
      lastUpdated: '2024-01-13',
      minStock: 15,
      maxStock: 120
    },
    {
      id: 'SP004',
      name: 'MacBook Air M2',
      category: 'Máy tính',
      quantity: 8,
      unit: 'cái',
      unitPrice: 32000000,
      totalValue: 256000000,
      location: 'Khu C - Kệ 1',
      status: 'critical',
      lastUpdated: '2024-01-12',
      minStock: 10,
      maxStock: 50
    },
    {
      id: 'SP005',
      name: 'Samsung Galaxy S24',
      category: 'Điện thoại',
      quantity: 34,
      unit: 'cái',
      unitPrice: 22000000,
      totalValue: 748000000,
      location: 'Khu B - Kệ 2',
      status: 'normal',
      lastUpdated: '2024-01-11',
      minStock: 15,
      maxStock: 60
    }
  ]

  const categories = ['Tất cả', 'Máy tính', 'Điện thoại', 'Máy tính bảng', 'Phụ kiện']
  const periods = [
    { value: 'week', label: 'Tuần này' },
    { value: 'month', label: 'Tháng này' },
    { value: 'quarter', label: 'Quý này' },
    { value: 'year', label: 'Năm nay' }
  ]

  const totalItems = inventoryData.reduce((sum, item) => sum + item.quantity, 0)
  const totalValue = inventoryData.reduce((sum, item) => sum + item.totalValue, 0)
  const lowStockItems = inventoryData.filter(item => item.status === 'low' || item.status === 'critical').length
  const criticalItems = inventoryData.filter(item => item.status === 'critical').length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 dark:text-red-400'
      case 'low': return 'text-orange-600 dark:text-orange-400'
      case 'normal': return 'text-green-600 dark:text-green-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />
      case 'low': return <Clock className="w-4 h-4" />
      case 'normal': return <CheckCircle className="w-4 h-4" />
      default: return <Package className="w-4 h-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'critical': return 'Thiếu hụt'
      case 'low': return 'Sắp hết'
      case 'normal': return 'Bình thường'
      default: return 'Không xác định'
    }
  }

  const filteredData = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Báo cáo tồn kho</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-3">Theo dõi tồn kho hàng hóa</p>
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng sản phẩm</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalItems.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
            <span className="text-sm text-green-600 dark:text-green-400">+12%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">so với tháng trước</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng giá trị</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(totalValue / 1000000).toFixed(1)}M VNĐ
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
            <span className="text-sm text-green-600 dark:text-green-400">+8.5%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">so với tháng trước</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sắp hết hàng</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{lowStockItems}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/20">
              <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400 mr-1" />
            <span className="text-sm text-red-600 dark:text-red-400">-3</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">so với tháng trước</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Thiếu hụt</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{criticalItems}</p>
            </div>
            <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400 mr-1" />
            <span className="text-sm text-red-600 dark:text-red-400">+1</span>
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
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white w-full sm:w-auto"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white w-full sm:w-auto"
            >
              {categories.map(category => (
                <option key={category} value={category === 'Tất cả' ? 'all' : category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white w-full"
            />
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Danh sách tồn kho ({filteredData.length} sản phẩm)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full break-words">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Số lượng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Đơn giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tổng giá trị
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Vị trí
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {item.quantity.toLocaleString()} {item.unit}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Min: {item.minStock} | Max: {item.maxStock}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {(item.unitPrice / 1000000).toFixed(1)}M VNĐ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {(item.totalValue / 1000000).toFixed(1)}M VNĐ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center gap-2 ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span className="text-sm font-medium">
                        {getStatusText(item.status)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 