'use client'

import { useState } from 'react'
import { DollarSign, MapPin, Package, Calendar, TruckIcon, Clock, FileText, CheckCircle, XCircle } from 'lucide-react'

interface Quote {
  id: string
  customer: string
  origin: string
  destination: string
  weight: string
  pallets: number
  shipmentType: 'LTL' | 'FTL' | 'Refrigerated' | 'Expedited'
  amount: number
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: Date
  validUntil: Date
  transitDays: string
  specialRequirements: string[]
}

export default function QuoteManager() {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all')

  const quotes: Quote[] = [
    {
      id: 'QT-2024-1001',
      customer: 'Acme Electronics Inc.',
      origin: 'Chicago, IL',
      destination: 'New York, NY',
      weight: '3,200 lbs',
      pallets: 5,
      shipmentType: 'LTL',
      amount: 2450.00,
      status: 'accepted',
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      validUntil: new Date(Date.now() + 1000 * 60 * 60 * 48),
      transitDays: '3-5 days',
      specialRequirements: ['Liftgate Required', 'Inside Delivery']
    },
    {
      id: 'QT-2024-1002',
      customer: 'Fresh Foods Distribution',
      origin: 'Los Angeles, CA',
      destination: 'Seattle, WA',
      weight: '42,000 lbs',
      pallets: 26,
      shipmentType: 'Refrigerated',
      amount: 4850.00,
      status: 'pending',
      createdAt: new Date(Date.now() - 1000 * 60 * 15),
      validUntil: new Date(Date.now() + 1000 * 60 * 60 * 72),
      transitDays: '2-3 days',
      specialRequirements: ['Temperature Control (34-38°F)', 'Full Truckload']
    },
    {
      id: 'QT-2024-1003',
      customer: 'BuildRight Construction',
      origin: 'Dallas, TX',
      destination: 'Houston, TX',
      weight: '8,500 lbs',
      pallets: 12,
      shipmentType: 'LTL',
      amount: 1275.00,
      status: 'pending',
      createdAt: new Date(Date.now() - 1000 * 60 * 45),
      validUntil: new Date(Date.now() + 1000 * 60 * 60 * 48),
      transitDays: '1-2 days',
      specialRequirements: ['Construction Materials', 'Flatbed Required']
    },
    {
      id: 'QT-2024-1004',
      customer: 'TechGear Solutions',
      origin: 'Boston, MA',
      destination: 'Miami, FL',
      weight: '1,800 lbs',
      pallets: 4,
      shipmentType: 'Expedited',
      amount: 3200.00,
      status: 'accepted',
      createdAt: new Date(Date.now() - 1000 * 60 * 90),
      validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24),
      transitDays: '24-48 hours',
      specialRequirements: ['White Glove Service', 'Time-Critical', 'Fragile Handling']
    },
    {
      id: 'QT-2024-1005',
      customer: 'Metro Manufacturing',
      origin: 'Detroit, MI',
      destination: 'Atlanta, GA',
      weight: '5,400 lbs',
      pallets: 8,
      shipmentType: 'LTL',
      amount: 1890.00,
      status: 'rejected',
      createdAt: new Date(Date.now() - 1000 * 60 * 120),
      validUntil: new Date(Date.now() - 1000 * 60 * 60 * 12),
      transitDays: '3-4 days',
      specialRequirements: ['Standard Service']
    },
    {
      id: 'QT-2024-1006',
      customer: 'Coastal Imports LLC',
      origin: 'Oakland, CA',
      destination: 'Phoenix, AZ',
      weight: '12,600 lbs',
      pallets: 15,
      shipmentType: 'LTL',
      amount: 2180.00,
      status: 'pending',
      createdAt: new Date(Date.now() - 1000 * 60 * 10),
      validUntil: new Date(Date.now() + 1000 * 60 * 60 * 48),
      transitDays: '2-3 days',
      specialRequirements: ['Hazmat Certified', 'Special Handling']
    }
  ]

  const filteredQuotes = quotes.filter(quote =>
    filterStatus === 'all' ? true : quote.status === filterStatus
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-700 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getShipmentTypeColor = (type: string) => {
    switch (type) {
      case 'LTL': return 'bg-blue-100 text-blue-700'
      case 'FTL': return 'bg-purple-100 text-purple-700'
      case 'Refrigerated': return 'bg-cyan-100 text-cyan-700'
      case 'Expedited': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Quotes List */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Quote Manager</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center space-x-2 transition-colors">
              <FileText className="h-4 w-4" />
              <span>New Quote</span>
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 mb-6 border-b border-gray-200">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                filterStatus === 'all'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              All ({quotes.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                filterStatus === 'pending'
                  ? 'border-yellow-600 text-yellow-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Pending ({quotes.filter(q => q.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilterStatus('accepted')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                filterStatus === 'accepted'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Accepted ({quotes.filter(q => q.status === 'accepted').length})
            </button>
            <button
              onClick={() => setFilterStatus('rejected')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                filterStatus === 'rejected'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Rejected ({quotes.filter(q => q.status === 'rejected').length})
            </button>
          </div>

          {/* Quotes List */}
          <div className="space-y-4">
            {filteredQuotes.map((quote) => (
              <div
                key={quote.id}
                onClick={() => setSelectedQuote(quote)}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedQuote?.id === quote.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{quote.customer}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getShipmentTypeColor(quote.shipmentType)}`}>
                        {quote.shipmentType}
                      </span>
                    </div>
                    <p className="text-sm font-mono text-gray-600">{quote.id}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">{formatCurrency(quote.amount)}</div>
                    <div className={`px-2 py-1 rounded border text-xs font-medium mt-1 ${getStatusColor(quote.status)}`}>
                      {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{quote.origin}</div>
                      <div className="text-gray-500">Origin</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{quote.destination}</div>
                      <div className="text-gray-500">Destination</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Package className="h-4 w-4" />
                      <span>{quote.pallets} pallets</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <TruckIcon className="h-4 w-4" />
                      <span>{quote.weight}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{quote.transitDays}</span>
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(quote.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Details Sidebar */}
      <div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quote Details</h3>

          {selectedQuote ? (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Quote ID</span>
                  <span className="text-sm font-mono text-gray-900">{selectedQuote.id}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Customer</span>
                  <span className="text-sm text-gray-900">{selectedQuote.customer}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded border text-xs font-medium ${getStatusColor(selectedQuote.status)}`}>
                    {selectedQuote.status.charAt(0).toUpperCase() + selectedQuote.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Route Information</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-green-600 mt-1" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{selectedQuote.origin}</div>
                      <div className="text-xs text-gray-500">Pickup Location</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-red-600 mt-1" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{selectedQuote.destination}</div>
                      <div className="text-xs text-gray-500">Delivery Location</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Shipment Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getShipmentTypeColor(selectedQuote.shipmentType)}`}>
                      {selectedQuote.shipmentType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium text-gray-900">{selectedQuote.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pallets:</span>
                    <span className="font-medium text-gray-900">{selectedQuote.pallets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transit Time:</span>
                    <span className="font-medium text-gray-900">{selectedQuote.transitDays}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Special Requirements</h4>
                <div className="space-y-2">
                  {selectedQuote.specialRequirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Pricing</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-2xl font-bold text-gray-900">{formatCurrency(selectedQuote.amount)}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Valid until: {formatDate(selectedQuote.validUntil)}
                  </div>
                </div>
              </div>

              {selectedQuote.status === 'pending' && (
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center space-x-2 transition-colors">
                    <CheckCircle className="h-4 w-4" />
                    <span>Accept Quote</span>
                  </button>
                  <button className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center space-x-2 transition-colors">
                    <XCircle className="h-4 w-4" />
                    <span>Decline Quote</span>
                  </button>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center space-x-2 transition-colors">
                  <FileText className="h-4 w-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Select a quote to view details</p>
            </div>
          )}
        </div>

        {/* TMS Integration Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">TMS Integration</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Rate Source</span>
              <span className="text-sm font-medium text-gray-900">Live TMS</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Sync</span>
              <span className="text-sm font-medium text-gray-900">2 min ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Carrier Networks</span>
              <span className="text-sm font-medium text-gray-900">47 Active</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-green-600 bg-green-50 p-2 rounded">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span>Connected & Syncing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
