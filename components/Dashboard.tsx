'use client'

import { useState, useEffect } from 'react'
import { 
  Truck, 
  Warehouse, 
  Users, 
  DollarSign, 
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import ClientOnly from './ClientOnly'

const stats = [
  {
    name: 'Tổng xe trong kho',
    value: '24',
    change: '+12%',
    changeType: 'positive',
    icon: Truck,
    color: 'bg-blue-500'
  },
  {
    name: 'Tồn kho hiện tại',
    value: '1,234 tấn',
    change: '+5.2%',
    changeType: 'positive',
    icon: Warehouse,
    color: 'bg-green-500'
  },
  {
    name: 'Khách hàng',
    value: '156',
    change: '+3.1%',
    changeType: 'positive',
    icon: Users,
    color: 'bg-purple-500'
  },
  {
    name: 'Doanh thu tháng',
    value: '2.4 tỷ VNĐ',
    change: '+8.7%',
    changeType: 'positive',
    icon: DollarSign,
    color: 'bg-yellow-500'
  }
]

const recentActivities = [
  {
    id: 1,
    type: 'Nhập kho',
    description: 'Xe BKS 51F-12345 nhập 5 tấn gạo',
    time: '2 phút trước',
    status: 'success'
  },
  {
    id: 2,
    type: 'Xuất kho',
    description: 'Xe BKS 30A-67890 xuất 3 tấn cà phê',
    time: '15 phút trước',
    status: 'success'
  },
  {
    id: 3,
    type: 'Cảnh báo',
    description: 'Kho A1 sắp đầy (95% dung lượng)',
    time: '1 giờ trước',
    status: 'warning'
  },
  {
    id: 4,
    type: 'Đăng ký xe',
    description: 'Xe mới BKS 29H-11111 đăng ký',
    time: '2 giờ trước',
    status: 'success'
  }
]

const warehouseData = [
  { name: 'Kho A1', capacity: 80, used: 65 },
  { name: 'Kho A2', capacity: 100, used: 45 },
  { name: 'Kho B1', capacity: 60, used: 55 },
  { name: 'Kho B2', capacity: 90, used: 30 },
  { name: 'Kho C1', capacity: 70, used: 70 }
]

const revenueData = [
  { month: 'T1', revenue: 1800, cost: 1200 },
  { month: 'T2', revenue: 2100, cost: 1400 },
  { month: 'T3', revenue: 1900, cost: 1300 },
  { month: 'T4', revenue: 2400, cost: 1600 },
  { month: 'T5', revenue: 2200, cost: 1500 },
  { month: 'T6', revenue: 2800, cost: 1800 }
]

const productTypes = [
  { name: 'Gạo', value: 35, color: '#3B82F6' },
  { name: 'Cà phê', value: 25, color: '#10B981' },
  { name: 'Đường', value: 20, color: '#F59E0B' },
  { name: 'Khác', value: 20, color: '#EF4444' }
]

function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString('vi-VN'))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return <span>Cập nhật lần cuối: {currentTime}</span>
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Tổng quan hệ thống quản lý kho</p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <ClientOnly fallback="Cập nhật lần cuối: ...">
            <TimeDisplay />
          </ClientOnly>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">so với tháng trước</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Warehouse Capacity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Dung lượng kho</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={warehouseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#F9FAFB' }} />
              <Bar dataKey="used" fill="#3B82F6" name="Đã sử dụng" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Doanh thu & Chi phí</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#F9FAFB' }} />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" name="Doanh thu" />
              <Line type="monotone" dataKey="cost" stroke="#EF4444" name="Chi phí" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Types & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Types */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Loại hàng hóa</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productTypes}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {productTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#F9FAFB' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Hoạt động gần đây</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {activity.status === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.type}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{activity.description}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Thao tác nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Truck className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Đăng ký xe</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Package className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Nhập kho</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Warehouse className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Xuất kho</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Users className="h-8 w-8 text-yellow-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Khách hàng</span>
          </button>
        </div>
      </div>
    </div>
  )
} 