'use client'

import { useState } from 'react'
import { Package, MapPin, Clock, CheckCircle, TruckIcon, AlertCircle, Search, Calendar, User } from 'lucide-react'
import { format } from 'date-fns'

interface TrackingEvent {
  timestamp: Date
  location: string
  status: string
  description: string
  completed: boolean
}

interface Shipment {
  id: string
  trackingNumber: string
  customer: string
  origin: string
  destination: string
  status: 'in-transit' | 'delivered' | 'delayed' | 'pending-pickup'
  currentLocation: string
  estimatedDelivery: Date
  actualDelivery?: Date
  weight: string
  carrier: string
  shipmentType: string
  progress: number
  events: TrackingEvent[]
}

export default function ShipmentTracker() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)

  const shipments: Shipment[] = [
    {
      id: '1',
      trackingNumber: 'TRK-2024-8392',
      customer: 'Tech Solutions Corp',
      origin: 'Los Angeles, CA',
      destination: 'Seattle, WA',
      status: 'in-transit',
      currentLocation: 'Portland, OR',
      estimatedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 18),
      weight: '2,800 lbs',
      carrier: 'Express Freight Lines',
      shipmentType: 'LTL',
      progress: 75,
      events: [
        {
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36),
          location: 'Los Angeles, CA',
          status: 'Picked Up',
          description: 'Package picked up from shipper',
          completed: true
        },
        {
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          location: 'Sacramento, CA',
          status: 'In Transit',
          description: 'Arrived at hub facility',
          completed: true
        },
        {
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
          location: 'Portland, OR',
          status: 'In Transit',
          description: 'Currently at distribution center',
          completed: true
        },
        {
          timestamp: new Date(Date.now() + 1000 * 60 * 60 * 18),
          location: 'Seattle, WA',
          status: 'Out for Delivery',
          description: 'Estimated delivery',
          completed: false
        }
      ]
    },
    {
      id: '2',
      trackingNumber: 'TRK-2024-8123',
      customer: 'Global Manufacturing Inc',
      origin: 'Chicago, IL',
      destination: 'New York, NY',
      status: 'delivered',
      currentLocation: 'New York, NY',
      estimatedDelivery: new Date(Date.now() - 1000 * 60 * 60 * 12),
      actualDelivery: new Date(Date.now() - 1000 * 60 * 60 * 12),
      weight: '5,200 lbs',
      carrier: 'National Carriers',
      shipmentType: 'LTL',
      progress: 100,
      events: [
        {
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96),
          location: 'Chicago, IL',
          status: 'Picked Up',
          description: 'Package picked up from shipper',
          completed: true
        },
        {
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
          location: 'Cleveland, OH',
          status: 'In Transit',
          description: 'Arrived at hub facility',
          completed: true
        },
        {
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          location: 'Philadelphia, PA',
          status: 'In Transit',
          description: 'Departed distribution center',
          completed: true
        },
        {
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
          location: 'New York, NY',
          status: 'Delivered',
          description: 'Successfully delivered - signed by J. Martinez',
          completed: true
        }
      ]
    },
    {
      id: '3',
      trackingNumber: 'TRK-2024-8501',
      customer: 'Fresh Foods Distribution',
      origin: 'Miami, FL',
      destination: 'Boston, MA',
      status: 'delayed',
      currentLocation: 'Richmond, VA',
      estimatedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 36),
      weight: '18,500 lbs',
      carrier: 'Cold Chain Logistics',
      shipmentType: 'Refrigerated',
      progress: 60,
      events: [
        {
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
          location: 'Miami, FL',
          status: 'Picked Up',
          description: 'Package picked up from shipper',
          completed: true
        },
        {
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30),
          location: 'Jacksonville, FL',
          status: 'In Transit',
          description: 'Temperature check: 36°F - Normal',
          completed: true
        },
        {
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
          location: 'Richmond, VA',
          status: 'Delayed',
          description: 'Weather delay - estimated 6 hour delay',
          completed: true
        }
      ]
    },
    {
      id: '4',
      trackingNumber: 'TRK-2024-8445',
      customer: 'AutoParts Direct',
      origin: 'Detroit, MI',
      destination: 'Dallas, TX',
      status: 'in-transit',
      currentLocation: 'St. Louis, MO',
      estimatedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 48),
      weight: '6,800 lbs',
      carrier: 'Midwest Express',
      shipmentType: 'LTL',
      progress: 45,
      events: [
        {
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          location: 'Detroit, MI',
          status: 'Picked Up',
          description: 'Package picked up from shipper',
          completed: true
        },
        {
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
          location: 'St. Louis, MO',
          status: 'In Transit',
          description: 'Currently at distribution center',
          completed: true
        }
      ]
    },
    {
      id: '5',
      trackingNumber: 'TRK-2024-8667',
      customer: 'BuildPro Supplies',
      origin: 'Phoenix, AZ',
      destination: 'Denver, CO',
      status: 'pending-pickup',
      currentLocation: 'Phoenix, AZ',
      estimatedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 72),
      weight: '12,400 lbs',
      carrier: 'Western Freight',
      shipmentType: 'Flatbed',
      progress: 10,
      events: [
        {
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          location: 'Phoenix, AZ',
          status: 'Scheduled',
          description: 'Pickup scheduled for today 2:00 PM',
          completed: true
        }
      ]
    }
  ]

  const filteredShipments = shipments.filter(shipment =>
    shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.destination.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200'
      case 'in-transit': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'delayed': return 'bg-red-100 text-red-700 border-red-200'
      case 'pending-pickup': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-5 w-5" />
      case 'in-transit': return <TruckIcon className="h-5 w-5" />
      case 'delayed': return <AlertCircle className="h-5 w-5" />
      case 'pending-pickup': return <Clock className="h-5 w-5" />
      default: return <Package className="h-5 w-5" />
    }
  }

  const formatDate = (date: Date) => {
    return format(date, 'MMM dd, yyyy h:mm a')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Shipments List */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Shipment Tracking</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search shipments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{shipments.filter(s => s.status === 'in-transit').length}</div>
              <div className="text-xs text-gray-600 mt-1">In Transit</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{shipments.filter(s => s.status === 'delivered').length}</div>
              <div className="text-xs text-gray-600 mt-1">Delivered</div>
            </div>
            <div className="bg-red-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600">{shipments.filter(s => s.status === 'delayed').length}</div>
              <div className="text-xs text-gray-600 mt-1">Delayed</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">{shipments.filter(s => s.status === 'pending-pickup').length}</div>
              <div className="text-xs text-gray-600 mt-1">Pending</div>
            </div>
          </div>

          {/* Shipments */}
          <div className="space-y-4">
            {filteredShipments.map((shipment) => (
              <div
                key={shipment.id}
                onClick={() => setSelectedShipment(shipment)}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedShipment?.id === shipment.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{shipment.customer}</h3>
                    </div>
                    <p className="text-sm font-mono text-gray-600">{shipment.trackingNumber}</p>
                  </div>
                  <div className={`px-3 py-1 rounded border text-xs font-medium flex items-center space-x-1 ${getStatusColor(shipment.status)}`}>
                    {getStatusIcon(shipment.status)}
                    <span>{shipment.status.replace('-', ' ').toUpperCase()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{shipment.origin}</div>
                      <div className="text-gray-500">Origin</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{shipment.destination}</div>
                      <div className="text-gray-500">Destination</div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{shipment.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        shipment.status === 'delivered' ? 'bg-green-600' :
                        shipment.status === 'delayed' ? 'bg-red-600' :
                        'bg-blue-600'
                      }`}
                      style={{ width: `${shipment.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{shipment.currentLocation}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <TruckIcon className="h-4 w-4" />
                      <span>{shipment.carrier}</span>
                    </span>
                  </div>
                  <span className="text-xs">
                    ETA: {format(shipment.estimatedDelivery, 'MMM dd, h:mm a')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tracking Details Sidebar */}
      <div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking Details</h3>

          {selectedShipment ? (
            <div className="space-y-6">
              {/* Status Banner */}
              <div className={`p-4 rounded-lg border ${getStatusColor(selectedShipment.status)}`}>
                <div className="flex items-center space-x-2 mb-2">
                  {getStatusIcon(selectedShipment.status)}
                  <span className="font-semibold">
                    {selectedShipment.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-sm">{selectedShipment.currentLocation}</p>
              </div>

              {/* Shipment Info */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Tracking Number</span>
                  <span className="text-sm font-mono text-gray-900">{selectedShipment.trackingNumber}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Customer</span>
                  <span className="text-sm text-gray-900">{selectedShipment.customer}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Carrier</span>
                  <span className="text-sm text-gray-900">{selectedShipment.carrier}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Type</span>
                  <span className="text-sm text-gray-900">{selectedShipment.shipmentType}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Weight</span>
                  <span className="text-sm text-gray-900">{selectedShipment.weight}</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Delivery Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">From</div>
                      <div className="text-gray-600">{selectedShipment.origin}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">To</div>
                      <div className="text-gray-600">{selectedShipment.destination}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Estimated Delivery</div>
                      <div className="text-gray-600">{formatDate(selectedShipment.estimatedDelivery)}</div>
                    </div>
                  </div>
                  {selectedShipment.actualDelivery && (
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900">Actual Delivery</div>
                        <div className="text-gray-600">{formatDate(selectedShipment.actualDelivery)}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tracking Events */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Tracking History</h4>
                <div className="relative">
                  <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-4">
                    {selectedShipment.events.map((event, index) => (
                      <div key={index} className="relative pl-8">
                        <div className={`absolute left-0 w-4 h-4 rounded-full border-2 ${
                          event.completed
                            ? 'bg-blue-600 border-blue-600'
                            : 'bg-white border-gray-300'
                        }`}></div>
                        <div className="text-xs text-gray-500 mb-1">
                          {formatDate(event.timestamp)}
                        </div>
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {event.status}
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          {event.location}
                        </div>
                        <div className="text-xs text-gray-500">
                          {event.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center space-x-2 transition-colors">
                  <User className="h-4 w-4" />
                  <span>Contact Customer</span>
                </button>
                <button className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center space-x-2 transition-colors">
                  <Package className="h-4 w-4" />
                  <span>View in TMS</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Select a shipment to view tracking details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
