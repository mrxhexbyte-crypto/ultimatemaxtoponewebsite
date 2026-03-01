'use client'

import { useState, useEffect, useRef } from 'react'
import { useAccount } from 'wagmi'
import { ShieldAlert, Users, Activity, DollarSign, AlertTriangle, Send, Loader2, Database } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const { address, isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<{role: string, text: string}[]>([
    { role: 'assistant', text: "Hello Admin. I'm connected to the Nexus systems. I can help you analyze transactions, detect fraud, and manage the store. What do you need?" }
  ])
  const [input, setInput] = useState('')
  const [isAiLoading, setIsAiLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Real data state
  const [stats, setStats] = useState({ revenue: 0, activeOrders: 0, totalUsers: 0, fraudAlerts: 0, error: '' })
  const [orders, setOrders] = useState<any[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    setMounted(true)
    
    const fetchData = () => {
      // Fetch real data from DB
      Promise.all([
        fetch('/api/stats').then(res => res.json()),
        fetch('/api/orders').then(res => res.json())
      ]).then(([statsData, ordersData]) => {
        if (statsData.error) setStats(prev => ({ ...prev, error: statsData.error }))
        else setStats(statsData)
        
        if (!ordersData.error) setOrders(ordersData)
        setIsLoadingData(false)
      }).catch(err => {
        console.error(err)
        setStats(prev => ({ ...prev, error: 'Failed to load database data' }))
        setIsLoadingData(false)
      })
    }

    fetchData()
    const intervalId = setInterval(fetchData, 5000) // Poll every 5 seconds

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendAi = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isAiLoading) return

    const userMessage = { role: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsAiLoading(true)

    try {
      // Pass real-time context to the AI
      const context = `
        Database Status: ${stats.error ? 'DISCONNECTED' : 'CONNECTED'}
        Total Revenue: $${stats.revenue}
        Active Orders: ${stats.activeOrders}
        Total Users: ${stats.totalUsers}
        Recent Orders: ${JSON.stringify(orders.slice(0, 5))}
      `

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage], context })
      })
      const data = await res.json()
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', text: `Error: ${data.error}` }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: data.text }])
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I couldn't connect to the AI service." }])
    } finally {
      setIsAiLoading(false)
    }
  }

  if (!mounted) return null

  // Mock admin check (in production, verify against a list of admin wallets)
  const isAdmin = isConnected

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-24 h-24 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center mb-6">
          <ShieldAlert className="w-10 h-10 text-red-400" />
        </div>
        <h2 className="text-3xl font-display font-bold mb-4">Access Denied</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          You do not have administrator privileges for this smart contract.
        </p>
        <Link href="/" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors">
          Return Home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <ShieldAlert className="w-8 h-8 text-purple-400" />
          <h1 className="text-4xl font-display font-bold">Admin Control Panel</h1>
        </div>
        {stats.error && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
            <Database className="w-4 h-4" />
            Database Not Connected
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-gray-400 uppercase">Total Revenue</h3>
          </div>
          <div className="text-3xl font-display font-bold">
            {isLoadingData ? <Loader2 className="w-6 h-6 animate-spin" /> : `$${stats.revenue.toLocaleString()}`}
          </div>
        </div>
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold text-gray-400 uppercase">Active Orders</h3>
          </div>
          <div className="text-3xl font-display font-bold">
            {isLoadingData ? <Loader2 className="w-6 h-6 animate-spin" /> : stats.activeOrders}
          </div>
        </div>
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-gray-400 uppercase">Total Users</h3>
          </div>
          <div className="text-3xl font-display font-bold">
            {isLoadingData ? <Loader2 className="w-6 h-6 animate-spin" /> : stats.totalUsers}
          </div>
        </div>
        <div className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-sm font-bold text-red-400 uppercase">Fraud Alerts</h3>
          </div>
          <div className="text-3xl font-display font-bold text-red-400">
            {isLoadingData ? <Loader2 className="w-6 h-6 animate-spin" /> : stats.fraudAlerts}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-sm">
                    <th className="pb-4 font-medium">Order ID</th>
                    <th className="pb-4 font-medium">Buyer</th>
                    <th className="pb-4 font-medium">Amount</th>
                    <th className="pb-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {isLoadingData ? (
                    <tr><td colSpan={4} className="py-8 text-center text-gray-500"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></td></tr>
                  ) : orders.length === 0 ? (
                    <tr><td colSpan={4} className="py-8 text-center text-gray-500">No orders found in database.</td></tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5">
                        <td className="py-4 font-mono text-xs">{order.id.split('-')[0]}...</td>
                        <td className="py-4 font-mono text-gray-400 text-xs">
                          {order.buyerWallet ? `${order.buyerWallet.slice(0,6)}...${order.buyerWallet.slice(-4)}` : order.buyerEmail}
                        </td>
                        <td className="py-4">${Number(order.amountUsd).toFixed(2)}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            order.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                            order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-6">AI Assistant</h2>
            <div className="flex flex-col flex-1 min-h-[400px]">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-4 rounded-2xl max-w-[85%] text-sm ${
                      msg.role === 'user' 
                        ? 'bg-purple-600/50 rounded-tr-none border border-purple-500/30' 
                        : 'bg-white/10 rounded-tl-none border border-white/10'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isAiLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none border border-white/10">
                      <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleSendAi} className="relative mt-auto">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask AI assistant about your store..." 
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-sm"
                  disabled={isAiLoading}
                />
                <button 
                  type="submit" 
                  disabled={isAiLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-purple-400 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
