'use client'

import { useState } from 'react'
import { Search, Filter, Download, Eye, DollarSign, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const debtData = [
  {
    id: 1,
    customerCode: 'KH001',
    customerName: 'Công ty TNHH ABC',
    totalDebt: 50000000,
    paidAmount: 30000000,
    remainingDebt: 20000000,
    dueDate: '2024-03-15',
    status: 'partial',
    lastPayment: '2024-02-01'
  },
  {
    id: 2,
    customerCode: 'KH002',
    customerName: 'Công ty Cổ phần XYZ',
    totalDebt: 30000000,
    paidAmount: 30000000,
    remainingDebt: 0,
    dueDate: '2024-02-28',
    status: 'paid',
    lastPayment: '2024-02-28'
  },
  {
    id: 3,
    customerCode: 'KH003',
    customerName: 'Nguyễn Văn C',
    totalDebt: 15000000,
    paidAmount: 0,
    remainingDebt: 15000000,
    dueDate: '2024-02-15',
    status: 'overdue',
    lastPayment: '2024-01-15'
  },
  {
    id: 4,
    customerCode: 'KH004',
    customerName: 'Công ty TNHH DEF',
    totalDebt: 25000000,
    paidAmount: 10000000,
    remainingDebt: 15000000,
    dueDate: '2024-04-01',
    status: 'partial',
    lastPayment: '2024-02-15'
  },
  {
    id: 5,
    customerCode: 'KH005',
    customerName: 'Phạm Thị E',
    totalDebt: 20000000,
    paidAmount: 20000000,
    remainingDebt: 0,
    dueDate: '2024-03-01',
    status: 'paid',
    lastPayment: '2024-03-01'
  }
]

export default function DebtPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredData = debtData.filter(item => {
    const matchesSearch = item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.customerCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Đã thanh toán'
      case 'partial':
        return 'Thanh toán một phần'
      case 'overdue':
        return 'Quá hạn'
      default:
        return 'Không xác định'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4" />
      case 'partial':
        return <TrendingUp className="h-4 w-4" />
      case 'overdue':
        return <AlertTriangle className="h-4 w-4" />
      default:
        return null
    }
  }

  const totalDebt = debtData.reduce((sum, item) => sum + item.totalDebt, 0)
  const totalPaid = debtData.reduce((sum, item) => sum + item.paidAmount, 0)
  const totalRemaining = debtData.reduce((sum, item) => sum + item.remainingDebt, 0)
  const overdueCount = debtData.filter(item => item.status === 'overdue').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý công nợ</h1>
          <p className="text-gray-600 dark:text-gray-300">Theo dõi và quản lý công nợ khách hàng</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <DollarSign className="h-4 w-4 mr-2" />
            Ghi nhận thanh toán
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-blue-500">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Tổng công nợ</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{(totalDebt / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-green-500">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Đã thanh toán</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{(totalPaid / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-yellow-500">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Còn nợ</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{(totalRemaining / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-red-500">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Quá hạn</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{overdueCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Tìm kiếm khách hàng, mã khách hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="paid">Đã thanh toán</option>
              <option value="partial">Thanh toán một phần</option>
              <option value="overdue">Quá hạn</option>
            </select>
          </div>
        </div>
      </div>

      {/* Debt Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Danh sách công nợ</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tổng nợ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Đã trả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Còn nợ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Hạn thanh toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{item.customerName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{item.customerCode}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.totalDebt.toLocaleString()} VNĐ
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                      {item.paidAmount.toLocaleString()} VNĐ
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.remainingDebt.toLocaleString()} VNĐ
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{item.dueDate}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Lần cuối: {item.lastPayment}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1">{getStatusText(item.status)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                        <DollarSign className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">5</span> trong tổng số <span className="font-medium">24</span> kết quả
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Trước
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">2</button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">3</button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 