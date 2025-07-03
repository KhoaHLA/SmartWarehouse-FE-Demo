'use client'

import { useState } from 'react'
import { Warehouse, Package, ArrowRight, ArrowLeft, Move, ClipboardList, BarChart3, Plus } from 'lucide-react'
import Link from 'next/link'

const mockWarehouseData = [
  {
    id: 1,
    warehouseName: 'Kho A1',
    capacity: 1000,
    used: 750,
    available: 250,
    percentage: 75,
    status: 'Hoạt động'
  },
  {
    id: 2,
    warehouseName: 'Kho A2',
    capacity: 800,
    used: 400,
    available: 400,
    percentage: 50,
    status: 'Hoạt động'
  },
  {
    id: 3,
    warehouseName: 'Kho B1',
    capacity: 1200,
    used: 1100,
    available: 100,
    percentage: 92,
    status: 'Gần đầy'
  },
  {
    id: 4,
    warehouseName: 'Kho B2',
    capacity: 600,
    used: 300,
    available: 300,
    percentage: 50,
    status: 'Hoạt động'
  }
]

const mockInventory = [
  {
    id: 1,
    productName: 'Gạo Jasmine',
    warehouse: 'Kho A1',
    quantity: 500,
    unit: 'tấn',
    customer: 'Công ty TNHH ABC',
    lastUpdated: '2024-01-15 10:30'
  },
  {
    id: 2,
    productName: 'Cà phê Robusta',
    warehouse: 'Kho A2',
    quantity: 300,
    unit: 'tấn',
    customer: 'Công ty CP XYZ',
    lastUpdated: '2024-01-14 15:45'
  },
  {
    id: 3,
    productName: 'Đường tinh luyện',
    warehouse: 'Kho B1',
    quantity: 800,
    unit: 'tấn',
    customer: 'Công ty TNHH DEF',
    lastUpdated: '2024-01-13 09:20'
  }
]

export default function WarehouseManagementPage() {
  const [selectedWarehouse, setSelectedWarehouse] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredInventory = mockInventory.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesWarehouse = selectedWarehouse === 'all' || item.warehouse === selectedWarehouse
    return matchesSearch && matchesWarehouse
  })

  const totalCapacity = mockWarehouseData.reduce((sum, warehouse) => sum + warehouse.capacity, 0)
  const totalUsed = mockWarehouseData.reduce((sum, warehouse) => sum + warehouse.used, 0)
  const totalAvailable = totalCapacity - totalUsed

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý kho</h1>
          <p className="text-gray-600 dark:text-gray-300">Quản lý nhập xuất kho và tồn kho</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/quan-ly-kho/nhap-kho" className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <ArrowRight className="h-4 w-4 mr-2" />
            Nhập kho
          </Link>
          <Link href="/quan-ly-kho/xuat-kho" className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Xuất kho
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Warehouse className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Tổng dung lượng</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCapacity.toLocaleString()} tấn</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Package className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Đã sử dụng</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalUsed.toLocaleString()} tấn</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Warehouse className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Còn trống</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalAvailable.toLocaleString()} tấn</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Tỷ lệ sử dụng</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round((totalUsed / totalCapacity) * 100)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Warehouse Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trạng thái các kho</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockWarehouseData.map((warehouse) => (
            <div key={warehouse.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white">{warehouse.warehouseName}</h4>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  warehouse.status === 'Hoạt động' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                }`}>
                  {warehouse.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Sử dụng:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{warehouse.used.toLocaleString()} / {warehouse.capacity.toLocaleString()} tấn</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      warehouse.percentage >= 90 ? 'bg-red-500' :
                      warehouse.percentage >= 75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${warehouse.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {warehouse.percentage}% sử dụng
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Management */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quản lý tồn kho</h3>
          <div className="flex space-x-3">
            <select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">Tất cả kho</option>
              {mockWarehouseData.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.warehouseName}>
                  {warehouse.warehouseName}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Tìm kiếm hàng hóa, khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Hàng hóa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Kho
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Số lượng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Cập nhật lần cuối
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{item.productName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {item.warehouse}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{item.quantity.toLocaleString()} {item.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{item.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">Xem</button>
                      <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">Sửa</button>
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Link href="/quan-ly-kho/nhap-kho" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <ArrowRight className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Nhập kho</h3>
              <p className="text-gray-600 dark:text-gray-300">Tự động nhập kho theo thông tin đăng ký xe</p>
            </div>
          </div>
        </Link>
        <Link href="/quan-ly-kho/xuat-kho" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <ArrowLeft className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Xuất kho</h3>
              <p className="text-gray-600 dark:text-gray-300">Xuất xá, bao, các loại hàng hóa</p>
            </div>
          </div>
        </Link>
        <Link href="/quan-ly-kho/chuyen-kho" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Move className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chuyển kho</h3>
              <p className="text-gray-600 dark:text-gray-300">Di chuyển hàng hóa giữa các kho</p>
            </div>
          </div>
        </Link>
        <Link href="/quan-ly-kho/kiem-ke" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <ClipboardList className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Kiểm kê kho</h3>
              <p className="text-gray-600 dark:text-gray-300">Kiểm tra tồn kho thực tế</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
} 