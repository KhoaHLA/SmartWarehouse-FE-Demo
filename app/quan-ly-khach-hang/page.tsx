'use client'

import { useState, useEffect } from 'react'

interface Customer {
  id: string
  name: string
  phone: string
  email: string
  type: 'Cá nhân' | 'Doanh nghiệp'
}

export default function QuanLyKhachHang() {
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 'KH001', name: 'Công ty TNHH ABC', phone: '0123456789', email: 'abc@company.com', type: 'Doanh nghiệp' },
    { id: 'KH002', name: 'Nguyễn Văn A', phone: '0987654321', email: 'nguyenvana@email.com', type: 'Cá nhân' },
    { id: 'KH003', name: 'Công ty CP XYZ', phone: '0123456788', email: 'xyz@company.com', type: 'Doanh nghiệp' },
    { id: 'KH004', name: 'Trần Thị B', phone: '0987654322', email: 'tranthib@email.com', type: 'Cá nhân' },
    { id: 'KH005', name: 'Công ty TNHH DEF', phone: '0123456787', email: 'def@company.com', type: 'Doanh nghiệp' },
    { id: 'KH006', name: 'Lê Văn C', phone: '0987654323', email: 'levanc@email.com', type: 'Cá nhân' },
    { id: 'KH007', name: 'Công ty CP GHI', phone: '0123456786', email: 'ghi@company.com', type: 'Doanh nghiệp' },
    { id: 'KH008', name: 'Phạm Thị D', phone: '0987654324', email: 'phamthid@email.com', type: 'Cá nhân' },
    { id: 'KH009', name: 'Công ty TNHH JKL', phone: '0123456785', email: 'jkl@company.com', type: 'Doanh nghiệp' },
    { id: 'KH010', name: 'Hoàng Văn E', phone: '0987654325', email: 'hoangvane@email.com', type: 'Cá nhân' },
    { id: 'KH011', name: 'Công ty CP MNO', phone: '0123456784', email: 'mno@company.com', type: 'Doanh nghiệp' },
    { id: 'KH012', name: 'Vũ Thị F', phone: '0987654326', email: 'vuthif@email.com', type: 'Cá nhân' }
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const customersPerPage = 10

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage)
  const startIndex = (currentPage - 1) * customersPerPage
  const endIndex = startIndex + customersPerPage
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex)

  const openAddForm = () => {
    setEditingCustomer(null)
    setShowForm(true)
  }

  const editCustomer = (id: string) => {
    const customer = customers.find(c => c.id === id)
    if (customer) {
      setEditingCustomer(customer)
      setShowForm(true)
    }
  }

  const deleteCustomer = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xoá khách hàng này?')) {
      setCustomers(customers.filter(c => c.id !== id))
    }
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingCustomer(null)
  }

  const saveCustomer = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    
    const customerData: Customer = {
      id: formData.get('id') as string,
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      type: formData.get('type') as 'Cá nhân' | 'Doanh nghiệp'
    }

    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? customerData : c))
    } else {
      const newId = 'KH' + String(customers.length + 1).padStart(3, '0')
      setCustomers([...customers, { ...customerData, id: newId }])
    }

    closeForm()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý khách hàng</h1>
          <p className="text-gray-600 dark:text-gray-300">Quản lý thông tin khách hàng trong hệ thống</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"></i>
          </div>

          <button
            onClick={openAddForm}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
          >
            <i className="fas fa-plus mr-2"></i> Thêm khách hàng
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-4 md:p-6">
          <div className="p-0 md:p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Danh sách khách hàng</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full break-words divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      STT <i className="fa fa-sort text-gray-500 dark:text-gray-400"></i>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Mã khách hàng <i className="fa fa-sort text-gray-500 dark:text-gray-400"></i>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Họ và tên <i className="fa fa-sort text-gray-500 dark:text-gray-400"></i>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Số điện thoại <i className="fa fa-sort text-gray-500 dark:text-gray-400"></i>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email <i className="fa fa-sort text-gray-500 dark:text-gray-400"></i>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Loại khách hàng <i className="fa fa-sort text-gray-500 dark:text-gray-400"></i>
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
                  {currentCustomers.map((customer, index) => (
                    <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {customer.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 dark:text-blue-400">
                        {customer.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 dark:text-blue-400">
                        {customer.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          customer.type === 'Cá nhân' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-orange-500 text-white'
                        }`}>
                          {customer.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white">
                          Hoạt động
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => editCustomer(customer.id)}
                          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                          title="Sửa"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => deleteCustomer(customer.id)}
                          className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                          title="Xoá"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <nav className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-white"
                  >
                    ‹
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white ${
                        page === currentPage ? 'bg-blue-500 text-white' : ''
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-white"
                  >
                    ›
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    {editingCustomer ? 'Sửa khách hàng' : 'Thêm khách hàng'}
                  </h3>
                  <form onSubmit={saveCustomer} className="space-y-4">
                    <input type="hidden" name="id" value={editingCustomer?.id || ''} />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tên khách hàng
                      </label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={editingCustomer?.name || ''}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Số điện thoại
                      </label>
                      <input
                        type="text"
                        name="phone"
                        defaultValue={editingCustomer?.phone || ''}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        defaultValue={editingCustomer?.email || ''}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Loại khách hàng
                      </label>
                      <select
                        name="type"
                        defaultValue={editingCustomer?.type || 'Cá nhân'}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="Cá nhân">Cá nhân</option>
                        <option value="Doanh nghiệp">Doanh nghiệp</option>
                      </select>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={closeForm}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Lưu
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 