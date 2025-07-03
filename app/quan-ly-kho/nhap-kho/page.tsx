'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Truck, Package, Scale, Save, Printer, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import ClientOnly from '../../../components/ClientOnly'

export default function ImportWarehousePage() {
  const [formData, setFormData] = useState({
    licensePlate: '',
    driverName: '',
    customerName: '',
    productName: '',
    warehouse: '',
    weightIn: '',
    weightOut: '',
    netWeight: '',
    notes: ''
  })

  const [isConnected, setIsConnected] = useState(false)
  const [currentWeight, setCurrentWeight] = useState(0)

  // Mock scale connection
  useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected) {
        // Simulate weight reading from scale
        setCurrentWeight(Math.floor(Math.random() * 10000) + 5000)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isConnected])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Auto calculate net weight
    if (name === 'weightIn' || name === 'weightOut') {
      const weightIn = name === 'weightIn' ? parseFloat(value) || 0 : parseFloat(formData.weightIn) || 0
      const weightOut = name === 'weightOut' ? parseFloat(value) || 0 : parseFloat(formData.weightOut) || 0
      const netWeight = weightIn - weightOut
      setFormData(prev => ({
        ...prev,
        netWeight: netWeight > 0 ? netWeight.toString() : ''
      }))
    }
  }

  const connectScale = () => {
    setIsConnected(true)
    toast.success('Đã kết nối cân thành công!')
  }

  const disconnectScale = () => {
    setIsConnected(false)
    setCurrentWeight(0)
    toast.success('Đã ngắt kết nối cân!')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Đã lưu thông tin nhập kho!')
  }

  const handlePrint = () => {
    toast.success('Đang in phiếu cân...')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nhập kho</h1>
          <p className="text-gray-600 dark:text-gray-300">Tự động nhập kho theo thông tin đăng ký xe</p>
        </div>
        <Link href="/quan-ly-kho" className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Thông tin nhập kho</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Vehicle Information */}
              <div>
                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Thông tin xe
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Biển số xe *
                    </label>
                    <input
                      type="text"
                      name="licensePlate"
                      value={formData.licensePlate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tên tài xế *
                    </label>
                    <input
                      type="text"
                      name="driverName"
                      value={formData.driverName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Cargo Information */}
              <div>
                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Thong tin hang hoa
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Khach hang *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Ten hang *
                    </label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Kho nhap *
                    </label>
                    <select
                      name="warehouse"
                      value={formData.warehouse}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    >
                      <option value="">Chọn kho</option>
                      <option value="Kho A1">Kho A1</option>
                      <option value="Kho A2">Kho A2</option>
                      <option value="Kho B1">Kho B1</option>
                      <option value="Kho B2">Kho B2</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Weight Information */}
              <div>
                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <Scale className="h-5 w-5 mr-2" />
                  Thông tin cân
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cân xe vào (kg) *
                    </label>
                    <input
                      type="number"
                      name="weightIn"
                      value={formData.weightIn}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cân xe ra (kg) *
                    </label>
                    <input
                      type="number"
                      name="weightOut"
                      value={formData.weightOut}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Trọng lượng hàng (kg)
                    </label>
                    <input
                      type="number"
                      name="netWeight"
                      value={formData.netWeight}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ghi chú
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Ghi chú thêm về loại hàng..."
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  In phiếu cân
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thông tin
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Scale Connection Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Kết nối cân</h3>
            
            <div className="space-y-4">
              {/* Connection Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Trạng thái kết nối:</span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  isConnected ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {isConnected ? 'Đã kết nối' : 'Chưa kết nối'}
                </span>
              </div>

              {/* Current Weight Display */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  <ClientOnly fallback="0 kg">
                    {currentWeight.toLocaleString()} kg
                  </ClientOnly>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Trọng lượng hiện tại</div>
              </div>

              {/* Connection Controls */}
              <div className="space-y-2">
                {!isConnected ? (
                  <button
                    onClick={connectScale}
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Kết nối cân
                  </button>
                ) : (
                  <button
                    onClick={disconnectScale}
                    className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Ngắt kết nối
                  </button>
                )}
              </div>

              {/* Scale Settings */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cài đặt cân</h4>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-gray-400">Cổng COM</label>
                    <select className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option>COM1</option>
                      <option>COM2</option>
                      <option>COM3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-gray-400">Tốc độ baud</label>
                    <select className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option>9600</option>
                      <option>19200</option>
                      <option>38400</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Thao tác nhanh</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                Lấy thông tin từ đăng ký xe
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Tự động điện tử cân
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                Xem lịch sử nhập kho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 