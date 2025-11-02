'use client'

import { useState } from 'react'
import { Phone, Package, TruckIcon, Search, Calendar, DollarSign, MapPin, Clock } from 'lucide-react'
import PhoneAgent from './components/PhoneAgent'
import ShipmentTracker from './components/ShipmentTracker'
import QuoteManager from './components/QuoteManager'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'agent' | 'quotes' | 'tracking'>('agent')

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TruckIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FreightAgent AI</h1>
                <p className="text-sm text-gray-500">Intelligent Logistics Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">Demo TMS Connected</p>
                <p className="text-xs text-green-600 flex items-center justify-end">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                  Online
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-lg shadow-sm p-1 inline-flex space-x-1">
          <button
            onClick={() => setActiveTab('agent')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all ${
              activeTab === 'agent'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Phone className="h-5 w-5" />
            <span>AI Phone Agent</span>
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all ${
              activeTab === 'quotes'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <DollarSign className="h-5 w-5" />
            <span>Quote Manager</span>
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all ${
              activeTab === 'tracking'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Package className="h-5 w-5" />
            <span>Track Shipments</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'agent' && <PhoneAgent />}
        {activeTab === 'quotes' && <QuoteManager />}
        {activeTab === 'tracking' && <ShipmentTracker />}
      </div>

      {/* Stats Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">247</div>
              <div className="text-sm text-gray-600 mt-1">Active Shipments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">94%</div>
              <div className="text-sm text-gray-600 mt-1">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">1,342</div>
              <div className="text-sm text-gray-600 mt-1">Quotes Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">3.2min</div>
              <div className="text-sm text-gray-600 mt-1">Avg Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
