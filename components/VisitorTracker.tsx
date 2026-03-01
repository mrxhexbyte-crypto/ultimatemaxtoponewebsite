'use client'

import { useEffect } from 'react'
import { useAccount } from 'wagmi'

export function VisitorTracker() {
  const { address, isConnected } = useAccount()

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await fetch('/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            walletAddress: isConnected ? address : null,
            userAgent: window.navigator.userAgent,
          })
        })
      } catch (error) {
        console.error('Visitor tracking failed:', error)
      }
    }

    // Track on mount and when wallet connection changes
    trackVisitor()
  }, [address, isConnected])

  return null // Silent component
}
