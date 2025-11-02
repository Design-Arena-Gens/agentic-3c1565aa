'use client'

import { useState } from 'react'
import { Phone, PhoneCall, PhoneOff, Mic, MicOff, Volume2, User, MapPin, Package, DollarSign, Calendar } from 'lucide-react'

interface CallLog {
  id: string
  caller: string
  phone: string
  timestamp: Date
  duration: string
  type: 'quote' | 'tracking'
  status: 'completed' | 'in-progress' | 'missed'
  summary: string
  quoteAmount?: string
  trackingNumber?: string
}

export default function PhoneAgent() {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentCall, setCurrentCall] = useState<CallLog | null>(null)
  const [transcript, setTranscript] = useState<string[]>([])

  const recentCalls: CallLog[] = [
    {
      id: '1',
      caller: 'John Smith',
      phone: '+1 (555) 123-4567',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      duration: '4:32',
      type: 'quote',
      status: 'completed',
      summary: 'LTL shipment from Chicago to NYC, 5 pallets, dry goods',
      quoteAmount: '$2,450.00'
    },
    {
      id: '2',
      caller: 'Sarah Johnson',
      phone: '+1 (555) 987-6543',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      duration: '2:15',
      type: 'tracking',
      status: 'completed',
      summary: 'Tracking inquiry for shipment #TRK-2024-8392',
      trackingNumber: 'TRK-2024-8392'
    },
    {
      id: '3',
      caller: 'Mike Williams',
      phone: '+1 (555) 456-7890',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      duration: '6:48',
      type: 'quote',
      status: 'completed',
      summary: 'Full truckload, refrigerated, LA to Seattle',
      quoteAmount: '$4,850.00'
    },
    {
      id: '4',
      caller: 'Emily Davis',
      phone: '+1 (555) 234-5678',
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
      duration: '3:21',
      type: 'tracking',
      status: 'completed',
      summary: 'Status update for shipment #TRK-2024-8123',
      trackingNumber: 'TRK-2024-8123'
    }
  ]

  const startCall = () => {
    setIsCallActive(true)
    setCurrentCall({
      id: 'demo-' + Date.now(),
      caller: 'Demo Caller',
      phone: '+1 (555) 000-0000',
      timestamp: new Date(),
      duration: '0:00',
      type: 'quote',
      status: 'in-progress',
      summary: 'Call in progress...'
    })
    setTranscript([])

    // Simulate AI conversation
    setTimeout(() => {
      setTranscript(prev => [...prev, 'AI Agent: Hello! Thank you for calling FreightAgent AI. How can I assist you with your shipping needs today?'])
    }, 1000)

    setTimeout(() => {
      setTranscript(prev => [...prev, 'Customer: Hi, I need a quote for shipping 8 pallets from Dallas to Miami.'])
    }, 3000)

    setTimeout(() => {
      setTranscript(prev => [...prev, 'AI Agent: Certainly! I\'d be happy to help you with that quote. Let me pull up our rates from the TMS. Can you tell me what type of goods you\'re shipping and if they require any special handling?'])
    }, 5000)

    setTimeout(() => {
      setTranscript(prev => [...prev, 'Customer: They\'re electronics, so they need to be handled carefully. No temperature control needed though.'])
    }, 8000)

    setTimeout(() => {
      setTranscript(prev => [...prev, 'AI Agent: Perfect. I\'m checking our LTL rates for fragile electronics from Dallas to Miami. The total weight is approximately 3,200 lbs across 8 pallets, correct?'])
    }, 10000)

    setTimeout(() => {
      setTranscript(prev => [...prev, 'Customer: Yes, that\'s right.'])
    }, 13000)

    setTimeout(() => {
      setTranscript(prev => [...prev, 'AI Agent: Excellent. Based on our TMS integration, I can offer you a quote of $2,875 for LTL service with 5-7 business day transit time, including inside delivery and liftgate service for safe handling. Would you like me to book this shipment for you?'])
    }, 15000)
  }

  const endCall = () => {
    setIsCallActive(false)
    setCurrentCall(null)
    setTranscript([])
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60)

    if (diff < 60) return `${diff}m ago`
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
    return `${Math.floor(diff / 1440)}d ago`
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Active Call Panel */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">AI Phone Agent</h2>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              isCallActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {isCallActive ? 'Active Call' : 'Ready'}
            </div>
          </div>

          {!isCallActive ? (
            <div className="text-center py-12">
              <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Receive Calls</h3>
              <p className="text-gray-600 mb-6">
                AI agent is online and ready to handle customer inquiries for quotes and tracking
              </p>
              <button
                onClick={startCall}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center space-x-2 transition-colors"
              >
                <PhoneCall className="h-5 w-5" />
                <span>Simulate Demo Call</span>
              </button>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Auto Quoting</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Real-time quotes from TMS integration based on lane, weight, and service level
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Package className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-gray-900">Shipment Tracking</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Instant status updates and ETA information for existing shipments
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold text-gray-900">Smart Booking</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    AI can schedule pickups and create shipments directly in your TMS
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Active Call Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{currentCall?.caller}</h3>
                      <p className="text-gray-600">{currentCall?.phone}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">Duration: 00:18</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                          Quote Request
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-3 rounded-full transition-colors ${
                        isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                    </button>
                    <button className="p-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                      <Volume2 className="h-6 w-6" />
                    </button>
                    <button
                      onClick={endCall}
                      className="px-6 py-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors inline-flex items-center space-x-2"
                    >
                      <PhoneOff className="h-5 w-5" />
                      <span>End Call</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Transcript */}
              <div className="bg-gray-50 rounded-lg p-6 h-96 overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  Live Transcript
                </h3>
                <div className="space-y-4">
                  {transcript.map((line, index) => {
                    const isAI = line.startsWith('AI Agent:')
                    return (
                      <div key={index} className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          isAI
                            ? 'bg-blue-100 text-gray-900'
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}>
                          <p className="text-sm font-medium mb-1 text-gray-600">
                            {isAI ? 'AI Agent' : 'Customer'}
                          </p>
                          <p className="text-sm">{line.split(': ')[1]}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* TMS Integration Status */}
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-900">TMS Connected - Fetching Real-time Rates</span>
                  </div>
                  <span className="text-xs text-gray-600">Last sync: 2s ago</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Calls Sidebar */}
      <div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Calls</h3>
          <div className="space-y-4">
            {recentCalls.map((call) => (
              <div key={call.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      call.type === 'quote' ? 'bg-blue-500' : 'bg-green-500'
                    }`}></div>
                    <span className="font-medium text-gray-900">{call.caller}</span>
                  </div>
                  <span className="text-xs text-gray-500">{formatTime(call.timestamp)}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{call.summary}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{call.duration}</span>
                  {call.quoteAmount && (
                    <span className="font-semibold text-green-600">{call.quoteAmount}</span>
                  )}
                  {call.trackingNumber && (
                    <span className="font-mono text-blue-600">{call.trackingNumber}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Calls</span>
              <span className="text-lg font-bold text-gray-900">38</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Quotes Generated</span>
              <span className="text-lg font-bold text-blue-600">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tracking Inquiries</span>
              <span className="text-lg font-bold text-green-600">14</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg Call Time</span>
              <span className="text-lg font-bold text-purple-600">3:42</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
