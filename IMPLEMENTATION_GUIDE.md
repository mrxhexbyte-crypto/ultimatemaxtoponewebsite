# ZAYX-OS Implementation Guide

Complete guide to implementing features using the available technologies.

## Feature Implementation Examples

### 1. Crypto Payment System

**Location**: `app/api/orders/pay/route.ts`

```typescript
// Accept ETH and ERC20 tokens
import { Contract } from 'ethers'
import { SHOP_PAYMENT_ABI } from '@/contracts'

export async function POST(req: Request) {
  const { orderId, amount, tokenAddress } = await req.json()
  
  const contract = new Contract(
    process.env.NEXT_PUBLIC_SHOP_PAYMENT_ADDRESS,
    SHOP_PAYMENT_ABI,
    signer
  )
  
  if (tokenAddress === 'ETH') {
    return contract.payWithETH(orderId, { value: amount })
  } else {
    return contract.payWithToken(orderId, tokenAddress, amount)
  }
}
```

### 2. Wallet Connection

**Location**: `components/web3-provider.tsx`

```typescript
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { config } from '@/lib/wagmi'

export function Web3Provider({ children }) {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider>
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  )
}
```

Use in component:

```tsx
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export function Header() {
  const { address } = useAccount()
  
  return (
    <div>
      {address ? <p>Connected: {address}</p> : <ConnectButton />}
    </div>
  )
}
```

### 3. Smart Contract Interaction

**Location**: `lib/web3/contracts.ts`

```typescript
import { useContract, useContractRead, useContractWrite } from 'wagmi'
import { SHOP_PAYMENT_ABI } from '@/contracts'

export function useShopPayment() {
  const contract = useContract({
    address: process.env.NEXT_PUBLIC_SHOP_PAYMENT_ADDRESS,
    abi: SHOP_PAYMENT_ABI,
  })

  const { data: orders } = useContractRead({
    ...contract,
    functionName: 'getOrder',
    args: [orderId],
  })

  const { write: pay } = useContractWrite({
    ...contract,
    functionName: 'payWithETH',
  })

  return { orders, pay }
}
```

### 4. NFT Receipt Minting

**Location**: `app/api/nft/mint-receipt/route.ts`

```typescript
import { Contract } from 'ethers'
import { ORDER_RECEIPT_ABI } from '@/contracts'

export async function POST(req: Request) {
  const { buyer, orderId, amount, metadataURI } = await req.json()
  
  const contract = new Contract(
    process.env.NEXT_PUBLIC_ORDER_RECEIPT_ADDRESS,
    ORDER_RECEIPT_ABI,
    adminSigner
  )

  // Mint NFT receipt
  const tx = await contract.mintReceipt(
    buyer,
    orderId,
    'PRODUCT-001',
    amount,
    'USD',
    metadataURI,
    true, // isPhysical
    false // isDigital
  )

  return Response.json({ hash: tx.hash })
}
```

### 5. Database Operations

**Location**: `app/api/products/route.ts`

```typescript
import { db } from '@/lib/db'
import { productsTable } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// GET all products
export async function GET() {
  const products = await db.select().from(productsTable)
  return Response.json(products)
}

// POST create product
export async function POST(req: Request) {
  const data = await req.json()
  
  const [product] = await db
    .insert(productsTable)
    .values(data)
    .returning()
  
  return Response.json(product)
}

// PUT update product
export async function PUT(req: Request) {
  const { id, ...data } = await req.json()
  
  const [product] = await db
    .update(productsTable)
    .set(data)
    .where(eq(productsTable.id, id))
    .returning()
  
  return Response.json(product)
}
```

### 6. State Management

**Location**: `store/cartStore.ts`

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export const useCartStore = create<{
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
}>(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({
        items: [...state.items, item],
      })),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id),
      })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
)
```

Use in component:

```tsx
export function CartButton({ product }) {
  const addItem = useCartStore((state) => state.addItem)
  
  return (
    <button onClick={() => addItem(product)}>
      Add to Cart
    </button>
  )
}
```

### 7. Form with Validation

**Location**: `components/checkout-form.tsx`

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const checkoutSchema = z.object({
  email: z.string().email(),
  address: z.string().min(10),
  amount: z.number().positive(),
})

export function CheckoutForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
  })

  const onSubmit = async (data) => {
    // Process checkout
    const response = await fetch('/api/orders/pay', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    const result = await response.json()
    console.log('Order created:', result)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('address')} placeholder="Shipping Address" />
      {errors.address && <span>{errors.address.message}</span>}
      
      <button type="submit">Proceed to Payment</button>
    </form>
  )
}
```

### 8. Data Visualization

**Location**: `components/analytics/revenue-chart.tsx`

```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { db } from '@/lib/db'
import { ordersTable } from '@/lib/db/schema'

export async function RevenueChart() {
  const orders = await db.select().from(ordersTable)
  
  const data = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString()
    const existing = acc.find(item => item.date === date)
    
    if (existing) {
      existing.revenue += order.amount
    } else {
      acc.push({ date, revenue: order.amount })
    }
    return acc
  }, [])

  return (
    <LineChart width={800} height={400} data={data}>
      <CartesianGrid />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="revenue" stroke="#0084ff" />
    </LineChart>
  )
}
```

### 9. AI Assistant Integration

**Location**: `components/ai-assistant.tsx`

```typescript
import { useChat } from 'ai/react'

export function AIAssistant() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div className="chat-container">
      {messages.map(msg => (
        <div key={msg.id} className={msg.role}>
          {msg.content}
        </div>
      ))}
      
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask something..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
```

API route: `app/api/chat/route.ts`

```typescript
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai('gpt-4'),
    messages,
  })

  return result.toTextStreamResponse()
}
```

### 10. 3D Background

**Location**: `components/3d/galaxy-background.tsx`

```typescript
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'

export function GalaxyBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Suspense fallback={null}>
        <Canvas>
          <Stars radius={100} depth={50} count={1000} factor={4} />
          <OrbitControls autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </Suspense>
    </div>
  )
}
```

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Visit http://localhost:3000

# Start local blockchain
npm run contracts:node

# Deploy contracts to testnet
npm run contracts:deploy:sepolia

# Run database migrations
npm run db:push

# Run tests
npm run test
```

## Feature Checklist

- [ ] Wallet connection (MetaMask, WalletConnect, etc.)
- [ ] Crypto payments (ETH, USDC, DAI)
- [ ] NFT receipts minting
- [ ] Product listing and search
- [ ] Shopping cart
- [ ] Checkout flow
- [ ] Order tracking
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] AI chat assistant
- [ ] Email notifications
- [ ] IPFS file storage
- [ ] DAO governance
- [ ] Treasury management

## Common Patterns

### Pattern 1: Loading States

```tsx
import { useState, useEffect } from 'react'

export function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  return <div>{products.map(p => <ProductCard key={p.id} {...p} />)}</div>
}
```

### Pattern 2: Error Handling

```tsx
export async function POST(req: Request) {
  try {
    const data = await req.json()
    const result = await processPayment(data)
    return Response.json(result)
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
```

### Pattern 3: Protected Routes

```tsx
import { getSession } from '@/lib/auth'

export async function GET(req: Request) {
  const session = await getSession(req)
  
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Process authenticated request
}
```

## Next Steps

1. Start with wallet connection
2. Build product listing
3. Implement shopping cart
4. Add payment processing
5. Deploy smart contracts
6. Create admin dashboard
7. Add analytics
8. Integrate AI assistant
