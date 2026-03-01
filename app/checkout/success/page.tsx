'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { useCartStore } from '@/store/cartStore'
import { useSearchParams } from 'next/navigation'

export default function CheckoutSuccessPage() {
  const [mounted, setMounted] = useState(false)
  const clearCart = useCartStore((state) => state.clearCart)
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    clearCart()
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    })

    if (sessionId) {
      // Confirm the order in the database
      fetch('/api/orders/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stripeSessionId: sessionId })
      }).catch(console.error)
    }
  }, [clearCart, sessionId])

  if (!mounted) return null

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mb-6">
        <CheckCircle2 className="w-12 h-12 text-emerald-400" />
      </div>
      <h1 className="text-4xl font-display font-bold mb-4">Payment Successful!</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        Your fiat payment was processed successfully via Stripe. Your order is now confirmed.
      </p>
      <Link href="/dashboard" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors">
        View in Dashboard
      </Link>
    </div>
  )
}
