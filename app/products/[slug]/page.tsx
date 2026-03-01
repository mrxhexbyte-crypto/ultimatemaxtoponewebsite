'use client'

import { useCartStore, Product } from '@/store/cartStore'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { useState, use, useEffect } from 'react'
import { ShoppingCart, Zap, Shield, Box, Loader2 } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useEthPrice } from '@/hooks/useEthPrice'

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const addItem = useCartStore((state) => state.addItem)
  const { isConnected } = useAccount()
  const [isAdded, setIsAdded] = useState(false)
  const { ethPrice, loading: ethLoading } = useEthPrice()

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${resolvedParams.slug}`)
        if (!res.ok) {
          if (res.status === 404) notFound()
          throw new Error('Failed to load product')
        }
        const data = await res.json()
        setProduct(data)
      } catch (error) {
        console.error(error)
        // Fallback to static data if API fails
        import('@/data/products').then(m => {
          const p = m.products.find(p => p.slug === resolvedParams.slug)
          if (p) setProduct(p)
          else notFound()
        })
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [resolvedParams.slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addItem(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const dynamicEthPrice = ethPrice ? (product.priceUsd / ethPrice).toFixed(4) : product.priceEth

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image / 3D Viewer Area */}
        <div className="relative aspect-square rounded-3xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-sm">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-emerald-400 border border-emerald-400/20">
              {product.type}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-400 mb-8">{product.description}</p>
          
          <div className="flex items-end gap-4 mb-8">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              {ethLoading ? <Loader2 className="w-8 h-8 animate-spin inline text-emerald-400" /> : `${dynamicEthPrice} ETH`}
            </div>
            <div className="text-xl text-gray-500 mb-1">${product.priceUsd}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <Box className="w-6 h-6 text-blue-400 mb-2" />
              <div className="text-sm text-gray-400">Stock</div>
              <div className="font-bold">{product.stock} remaining</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <Shield className="w-6 h-6 text-purple-400 mb-2" />
              <div className="text-sm text-gray-400">Verification</div>
              <div className="font-bold">On-chain NFT</div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {isAdded ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            <button
              onClick={() => {
                if (!isConnected) alert('Please connect your wallet first')
                else window.location.href = '/checkout'
              }}
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold transition-all"
            >
              <Zap className="w-5 h-5" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
