'use client'

import { useState, useEffect } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  ArrowLeft,
  Download,
  Filter,
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle,
  User,
  Building,
  Search
} from 'lucide-react'
import Link from 'next/link'

export default function BaoCaoCongNoPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedType, setSelectedType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const debtData = {
    totalReceivable: 850000000,
    totalPayable: 420000000,
    overdueReceivable: 180000000,
    overduePayable: 65000000,
    newReceivable: 120000000,
    newPayable: 45000000
  }

  const receivableData = [
    {
      id: 'KH001',
      name: 'Công ty ABC',
      type: 'company',
      amount: 150000000,
      dueDate: '2024-01-20',
      daysOverdue: 5,
      status: 'overdue',
      lastPayment: '2024-01-10',
      contact: 'Nguyễn Văn A',
      phone: '0901234567'
    },
    {
      id: 'KH002',
      name: 'Công ty XYZ',
      type: 'company',
      amount: 200000000,
      dueDate: '2024-01-25',
      daysOverdue: 0,
      status: 'current',
      lastPayment: '2024-01-15',
      contact: 'Trần Thị B',
      phone: '0901234568'
    },
    {
      id: 'KH003',
      name: 'Công ty DEF',
      type: 'company',
      amount: 80000000,
      dueDate: '2024-01-15',
      daysOverdue: 10,
      status: 'overdue',
      lastPayment: '2024-01-05',
      contact: 'Lê Văn C',
      phone: '0901234569'
    },
    {
      id: 'KH004',
      name: 'Nguyễn Văn D',
      type: 'individual',
      amount: 45000000,
      dueDate: '2024-01-30',
      daysOverdue: 0,
      status: 'current',
      lastPayment: '2024-01-18',
      contact: 'Nguyễn Văn D',
      phone: '0901234570'
    },
    {
      id: 'KH005',
      name: 'Công ty GHI',
      type: 'company',
      amount: 120000000,
      dueDate: '2024-01-10',
      daysOverdue: 15,
      status: 'critical',
      lastPayment: '2023-12-20',
      contact: 'Phạm Thị E',
      phone: '0901234571'
    }
  ]

  const payableData = [
    {
      id: 'NCC001',
      name: 'Công ty cung cấp A',
      amount: 80000000,
      dueDate: '2024-01-22',
      daysOverdue: 2,
      status: 'overdue',
      lastPayment: '2024-01-08',
      contact: 'Vũ Văn F',
      phone: '0901234572'
    },
    {
      id: 'NCC002',
      name: 'Công ty cung cấp B',
      amount: 120000000,
      dueDate: '2024-01-28',
      daysOverdue: 0,
      status: 'current',
      lastPayment: '2024-01-12',
      contact: 'Hoàng Thị G',
      phone: '0901234573'
    },
    {
      id: 'NCC003',
      name: 'Công ty cung cấp C',
      amount: 95000000,
      dueDate: '2024-01-18',
      daysOverdue: 7,
      status: 'overdue',
      lastPayment: '2024-01-03',
      contact: 'Đỗ Văn H',
      phone: '0901234574'
    }
  ]

  const periods = [
    { value: 'week', label: 'Tuần này' },
    { value: 'month', label: 'Tháng này' },
    { value: 'quarter', label: 'Quý này' },
    { value: 'year', label: 'Năm nay' }
  ]

  const debtTypes = [
    { value: 'all', label: 'Tất cả' },
    { value: 'receivable', label: 'Phải thu' },
    { value: 'payable', label: 'Phải trả' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 dark:text-red-400'
      case 'overdue': return 'text-orange-600 dark:text-orange-400'
      case 'current': return 'text-green-600 dark:text-green-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />
      case 'overdue': return <Clock className="w-4 h-4" />
      case 'current': return <CheckCircle className="w-4 h-4" />
      default: return <DollarSign className="w-4 h-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'critical': return 'Quá hạn nghiêm trọng'
      case 'overdue': return 'Quá hạn'
      case 'current': return 'Đúng hạn'
      default: return 'Không xác định'
    }
  }

  const filteredReceivable = receivableData.filter(item => {
    if (selectedType === 'payable') return false
    return true
  })

  const filteredPayable = payableData.filter(item => {
    if (selectedType === 'receivable') return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Báo cáo công nợ</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-3">Theo dõi công nợ khách hàng và nhà cung cấp</p>
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng phải thu</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(debtData.totalReceivable / 1000000).toFixed(0)}M VNĐ
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
            <span className="text-sm text-green-600 dark:text-green-400">+{((debtData.newReceivable / debtData.totalReceivable) * 100).toFixed(1)}%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">tháng này</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng phải trả</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(debtData.totalPayable / 1000000).toFixed(0)}M VNĐ
              </p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/20">
              <TrendingDown className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
            <span className="text-sm text-green-600 dark:text-green-400">+{((debtData.newPayable / debtData.totalPayable) * 100).toFixed(1)}%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">tháng này</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Quá hạn phải thu</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(debtData.overdueReceivable / 1000000).toFixed(0)}M VNĐ
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400 mr-1" />
            <span className="text-sm text-red-600 dark:text-red-400">-5.2%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">so với tháng trước</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Quá hạn phải trả</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(debtData.overduePayable / 1000000).toFixed(0)}M VNĐ
              </p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 text-red-600 dark:text-red-400 mr-1" />
            <span className="text-sm text-red-600 dark:text-red-400">+2.1%</span>
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
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white w-full sm:w-auto"
            >
              {debtTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white w-full"
            />
          </div>
        </div>
      </div>

      {/* Debt Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Receivable Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Công nợ phải thu ({filteredReceivable.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full break-words">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Số tiền
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Hạn thanh toán
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredReceivable.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {item.type === 'company' ? (
                          <Building className="w-4 h-4 text-gray-400" />
                        ) : (
                          <User className="w-4 h-4 text-gray-400" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {item.contact}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {(item.amount / 1000000).toFixed(0)}M VNĐ
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {new Date(item.dueDate).toLocaleDateString('vi-VN')}
                      </div>
                      {item.daysOverdue > 0 && (
                        <div className="text-xs text-red-600 dark:text-red-400">
                          Quá hạn {item.daysOverdue} ngày
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
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

        {/* Payable Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Công nợ phải trả ({filteredPayable.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full break-words">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Nhà cung cấp
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Số tiền
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Hạn thanh toán
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPayable.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {item.contact}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {(item.amount / 1000000).toFixed(0)}M VNĐ
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {new Date(item.dueDate).toLocaleDateString('vi-VN')}
                      </div>
                      {item.daysOverdue > 0 && (
                        <div className="text-xs text-red-600 dark:text-red-400">
                          Quá hạn {item.daysOverdue} ngày
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
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
    </div>
  )
} 