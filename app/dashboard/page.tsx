'use client'

import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'
import { Wallet, Package, Download, History, ShieldAlert, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { address, isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isConnected && address) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true)
      fetch(`/api/orders/user/${address}`)
        .then(res => res.json())
        .then(data => {
          if (!data.error) setOrders(data)
          setLoading(false)
        })
        .catch(err => {
          console.error(err)
          setLoading(false)
        })
    }
  }, [isConnected, address])

  if (!mounted) return null

  if (!isConnected) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
          <Wallet className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-3xl font-display font-bold mb-4">Connect Wallet</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Please connect your Web3 wallet to access your dashboard, order history, and digital downloads.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">My Dashboard</h1>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            Connected as <span className="font-mono text-white">{address}</span>
          </div>
        </div>
        <Link href="/dashboard/admin" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium">
          <ShieldAlert className="w-4 h-4 text-purple-400" />
          Admin Panel
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-bold">Total Orders</h3>
          </div>
          <div className="text-4xl font-display font-bold">{orders.length}</div>
        </div>
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Download className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-bold">Digital Assets</h3>
          </div>
          <div className="text-4xl font-display font-bold">0</div>
        </div>
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <History className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-bold">DAO Voting Power</h3>
          </div>
          <div className="text-4xl font-display font-bold">0 <span className="text-lg text-gray-500">NEXUS</span></div>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-display font-bold">Recent Orders</h2>
        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
          </div>
        ) : orders.length > 0 ? (
          <div className="grid gap-4">
            {orders.map((order: any) => (
              <div key={order.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      order.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      {order.status}
                    </span>
                    <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="font-mono text-sm text-gray-400 break-all">
                    {order.txHash ? `TX: ${order.txHash}` : `Stripe ID: ${order.stripeSessionId}`}
                  </div>
                </div>
                <div className="text-xl font-bold font-mono text-emerald-400">
                  ${Number(order.amountUsd).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
            <p className="text-gray-400">No recent orders found for this wallet address.</p>
            <Link href="/" className="inline-block mt-4 text-purple-400 hover:text-purple-300">
              Start shopping &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
