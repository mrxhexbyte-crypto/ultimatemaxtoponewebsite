# ZAYX-OS Dependencies Guide

This document explains what each category of dependencies is for and how to use them.

## Core Framework (Next.js + React)

- **next** - Full-stack React framework with SSR, API routes, and built-in optimization
- **react** - UI component library
- **react-dom** - React DOM rendering
- **typescript** - Type safety for JavaScript

**Usage**: These form the foundation of the entire application.

## Web3 & Blockchain

### Wallet Connection (7+ Wallets Supported)
- **wagmi** - React hooks for Web3 (Ethereum, Polygon, Base, etc.)
- **@rainbow-me/rainbowkit** - Beautiful wallet connection UI
- **@walletconnect/web3-provider** - WalletConnect support
- **@metamask/sdk** - MetaMask integration
- **@web3auth/modal** - Web3Auth integration
- **@privy-io/react-auth** - Privy wallet authentication
- **@dynamic-labs/sdk-react-core** - Dynamic wallet support

**Usage**: For wallet connection and account management:

```tsx
import { useAccount, useConnect } from 'wagmi'

export function ConnectWallet() {
  const { address } = useAccount()
  const { connect, connectors } = useConnect()
  
  return <button onClick={() => connect({ connector: connectors[0] })}>
    Connect Wallet
  </button>
}
```

### Smart Contract Interaction
- **ethers** - Ethers.js for contract interaction
- **viem** - Viem library for type-safe contract calls
- **web3** - Web3.js alternative
- **siwe** - Sign-In With Ethereum for authentication

**Usage**: For smart contract interactions:

```tsx
import { useContractRead, useContractWrite } from 'wagmi'

// Read contract data
const { data } = useContractRead({
  address: '0x...',
  abi: ABI,
  functionName: 'balanceOf',
  args: [address],
})

// Write to contract
const { write } = useContractWrite({
  address: '0x...',
  abi: ABI,
  functionName: 'transfer',
})

write({ args: [recipient, amount] })
```

### Smart Contract Development
- **hardhat** - Ethereum development environment
- **@openzeppelin/contracts** - Secure contract library
- **@nomicfoundation/hardhat-toolbox** - Hardhat plugins
- **@nomicfoundation/hardhat-ignition** - Contract deployment tool

**Usage**: Create, test, and deploy contracts:

```bash
npm run contracts:compile        # Compile contracts
npm run contracts:test           # Run tests
npm run contracts:deploy:sepolia # Deploy to testnet
npm run contracts:deploy:mainnet # Deploy to mainnet
npm run contracts:verify         # Verify on Etherscan
```

### DeFi & Payment Processing
- **stripe** - Fiat payment processing
- **@stripe/stripe-js** - Stripe frontend integration
- **moralis** - Blockchain data API
- **alchemy-sdk** - Alchemy API for RPC data
- **@uniswap/sdk-core** - Uniswap DEX integration

**Usage**: Process crypto and fiat payments:

```tsx
// Crypto payment via ShopPayment contract
const payWithCrypto = async (orderId, amount, token) => {
  const contract = new Contract(SHOP_PAYMENT, ABI, signer)
  return contract.payWithToken(orderId, token, amount)
}

// Fiat payment via Stripe
const stripe = loadStripe(STRIPE_KEY)
await stripe.redirectToCheckout({ sessionId })
```

### IPFS & File Storage
- **@pinata/sdk** - Pinata for IPFS hosting
- **@web3-storage/w3up-client** - Web3.Storage integration
- **ipfs-http-client** - Direct IPFS client

**Usage**: Store NFT metadata and digital products:

```ts
import { PinataSDK } from '@pinata/sdk'

const pinata = new PinataSDK()

// Upload metadata to IPFS
const hash = await pinata.upload.file(metadata)
console.log(`ipfs://${hash}`)
```

## UI & Components

- **tailwindcss** - Utility-first CSS framework
- **@radix-ui/** - Headless UI components (20+ components)
- **lucide-react** - Beautiful icon library
- **@heroicons/react** - Heroicons icons
- **sonner** - Toast notifications
- **react-hot-toast** - Toast alerts
- **framer-motion** - Smooth animations
- **gsap** - Advanced animations

**Usage**: Build beautiful UIs:

```tsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export function Product() {
  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
      <Card>
        <h3>Product Name</h3>
        <Button onClick={() => toast.success('Added to cart')}>
          Buy Now
        </Button>
      </Card>
    </motion.div>
  )
}
```

## 3D Graphics

- **three** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for Three.js
- **@react-three/rapier** - Physics engine integration

**Usage**: Create 3D backgrounds and animations:

```tsx
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

export function GalaxyBackground() {
  return (
    <Canvas>
      <Stars radius={100} depth={50} count={1000} />
    </Canvas>
  )
}
```

## Database & ORM

- **drizzle-orm** - Type-safe ORM
- **better-sqlite3** - SQLite for development
- **pg** - PostgreSQL driver
- **drizzle-zod** - Schema validation

**Usage**: Database operations:

```tsx
import { db } from '@/lib/db'
import { productsTable } from '@/lib/db/schema'

// Query
const products = await db.select().from(productsTable)

// Insert
await db.insert(productsTable).values({
  name: 'Product',
  price: 99.99,
})

// Update
await db.update(productsTable)
  .set({ price: 89.99 })
  .where(eq(productsTable.id, 1))
```

## State Management

- **zustand** - Lightweight state management
- **jotai** - Atom-based state management
- **swr** - Data fetching with caching
- **@tanstack/react-query** - Server state management

**Usage**: Manage app state:

```ts
import { create } from 'zustand'

const useStore = create((set) => ({
  cart: [],
  addItem: (item) => set((state) => ({
    cart: [...state.cart, item]
  })),
}))

// In component
const { cart, addItem } = useStore()
```

## Forms & Validation

- **react-hook-form** - Performant form handling
- **@hookform/resolvers** - Form validation resolvers
- **zod** - TypeScript-first schema validation

**Usage**: Create validated forms:

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  )
}
```

## Data Visualization

- **recharts** - React charting library
- **d3** - Advanced visualization (optional)

**Usage**: Show analytics and stats:

```tsx
import { LineChart, Line, XAxis, YAxis } from 'recharts'

export function RevenueChart({ data }) {
  return (
    <LineChart data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Line type="monotone" dataKey="revenue" />
    </LineChart>
  )
}
```

## AI & LLM

- **openai** - OpenAI API
- **ai** - Vercel AI SDK for streaming
- **langchain** - LLM orchestration

**Usage**: Add AI features:

```ts
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

const { text } = await generateText({
  model: openai('gpt-4'),
  prompt: 'Describe this product: ' + description,
})
```

## Testing

- **vitest** - Unit testing framework
- **@testing-library/react** - React component testing
- **@playwright/test** - E2E testing
- **jest** - Backup testing framework

**Usage**: Test your code:

```bash
npm run test           # Run unit tests
npm run test:watch    # Watch mode
npm run test:e2e      # Run E2E tests
```

## Development Tools

- **typescript** - Type safety
- **eslint** - Code linting
- **prettier** - Code formatting
- **husky** - Git hooks
- **lint-staged** - Lint changed files

**Usage**: Setup and run:

```bash
npm run format        # Format all code
npm run lint          # Lint code
npm run type-check    # Check types
npm run prepare       # Setup git hooks
```

## Environment Setup

Create a `.env.local` file with:

```env
# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Web3
NEXT_PUBLIC_ALCHEMY_API_KEY=your_key_here
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_id_here

# Smart Contracts
NEXT_PUBLIC_SHOP_PAYMENT_ADDRESS=0x...
DEPLOYER_PRIVATE_KEY=0x...

# Database
DATABASE_URL=file:./dev.db  # SQLite

# OpenAI
OPENAI_API_KEY=sk-...

# Pinata (IPFS)
PINATA_API_KEY=your_key_here
PINATA_SECRET_KEY=your_secret_here

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Quick Start Commands

```bash
# Install dependencies
npm install

# Development
npm run dev                    # Start dev server on :3000
npm run contracts:node         # Start local blockchain

# Build & Deploy
npm run build                  # Production build
npm run deploy                 # Deploy to Vercel

# Smart Contracts
npm run contracts:compile      # Compile Solidity
npm run contracts:test         # Test contracts
npm run contracts:deploy:sepolia # Deploy to testnet

# Database
npm run db:push               # Push schema changes
npm run db:studio             # Open Drizzle Studio

# Testing
npm run test                  # Run tests
npm run test:e2e             # E2E tests
```

## Choosing the Right Tools

| Need | Use |
|------|-----|
| Wallet connection | wagmi + RainbowKit |
| Contract interaction | ethers or viem |
| Forms | react-hook-form + zod |
| State management | zustand (simple) or react-query (server) |
| Notifications | sonner (modern) or react-hot-toast |
| Data fetching | swr or @tanstack/react-query |
| Testing | vitest (fast) + @testing-library/react |
| Styling | tailwindcss + @radix-ui components |

## Removing Unused Dependencies

If you don't need certain features, you can remove:

```bash
# If not using 3D
npm uninstall three @react-three/fiber @react-three/drei @react-three/rapier

# If not using Stripe (keeping only crypto)
npm uninstall stripe @stripe/stripe-js

# If not using AI
npm uninstall openai ai langchain

# If not using advanced charts
npm uninstall d3
```

## Need Help?

- Wagmi docs: https://wagmi.sh
- Next.js docs: https://nextjs.org
- Hardhat docs: https://hardhat.org
- Drizzle docs: https://orm.drizzle.team
- Tailwind docs: https://tailwindcss.com
- Radix UI docs: https://radix-ui.com
