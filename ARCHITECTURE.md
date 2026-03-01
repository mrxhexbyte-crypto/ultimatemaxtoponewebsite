# ZAYX-OS Architecture

Complete system architecture and data flow diagrams.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface                           │
│  (Next.js 15 + React 18 + Tailwind CSS + Shadcn UI)        │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Homepage    │  │  Products    │  │   Cart       │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Checkout    │  │  Admin       │  │   Profile    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────┬────────────────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────────────────┐
│                  Web3 & Authentication                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Wagmi + RainbowKit (Multi-Wallet Support)           │  │
│  │  ├─ MetaMask       ├─ WalletConnect                  │  │
│  │  ├─ Coinbase       ├─ Web3Auth                       │  │
│  │  ├─ Phantom        ├─ Privy                          │  │
│  │  └─ Others...      └─ Dynamic                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  SIWE (Sign-In With Ethereum)                        │  │
│  │  JWT Token Generation & Validation                   │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────┬────────────────────────────────────────────────┘
             │
    ┌────────┴─────────┬─────────────┬──────────────┐
    ↓                  ↓             ↓              ↓
┌────────────┐  ┌────────────┐  ┌───────────┐  ┌────────────┐
│  API Routes│  │ Smart      │  │ Database  │  │   IPFS     │
│            │  │ Contracts  │  │           │  │ (Pinata)   │
│ ┌────────┐ │  │            │  │ ┌────────┤  │            │
│ │Orders  │ │  │ ┌────────┐ │  │ │SQLite/ │  │ Metadata   │
│ │NFT     │ │  │ │Shop    │ │  │ │Postgre │  │ Images     │
│ │DAO     │ │  │ │Payment │ │  │ │SQL     │  │ Files      │
│ │Payment │ │  │ ├────────┤ │  │ └────────┤  │            │
│ │Upload  │ │  │ │Order   │ │  │ ┌────────┤  │ Upload API │
│ └────────┘ │  │ │Receipt │ │  │ │Product │  │            │
│            │  │ ├────────┤ │  │ │Order   │  │ Gateway    │
│ /api/*     │  │ │Govern  │ │  │ │User    │  │ URL:       │
│            │  │ │ance    │ │  │ │Review  │  │ ipfs://    │
│            │  │ ├────────┤ │  │ │DAO     │  │ gateway... │
│            │  │ │Treasury│ │  │ │Vote    │  │            │
│            │  │ └────────┘ │  │ └────────┤  │            │
└────────────┘  └────────────┘  └───────────┘  └────────────┘
     │               │              │              │
     └───────────────┴──────────────┴──────────────┘
                     ↓
        ┌────────────────────────────┐
        │   Blockchain Networks      │
        │                            │
        │ ┌──────────────────────┐   │
        │ │ Ethereum Mainnet     │   │
        │ └──────────────────────┘   │
        │ ┌──────────────────────┐   │
        │ │ Polygon (L2)         │   │
        │ └──────────────────────┘   │
        │ ┌──────────────────────┐   │
        │ │ Base (Coinbase L2)   │   │
        │ └──────────────────────┘   │
        │ ┌──────────────────────┐   │
        │ │ Sepolia (Testnet)    │   │
        │ └──────────────────────┘   │
        └────────────────────────────┘
```

## Data Flow: Checkout Process

```
User Interaction
      ↓
1. Browse Products
   └─→ GET /api/products
       └─→ Database Query
           └─→ Return product list
      ↓
2. Add to Cart
   └─→ Zustand Store (client-side)
       └─→ localStorage persistence
      ↓
3. Proceed to Checkout
   └─→ User connects wallet (if needed)
       └─→ Wagmi/RainbowKit dialog
           └─→ Wallet signature confirmation
      ↓
4. Create Order
   └─→ POST /api/orders/pay
       ├─→ Validate order data
       ├─→ Create order in database
       └─→ Return order ID + contract params
      ↓
5. Process Payment (User's Wallet)
   └─→ Call ShopPayment.sol contract
       ├─→ payWithETH() or payWithToken()
       ├─→ Transfer funds to treasury
       ├─→ Emit OrderPaid event
       └─→ Return transaction hash
      ↓
6. Mint NFT Receipt
   └─→ POST /api/nft/mint-receipt
       ├─→ Create metadata JSON
       ├─→ Upload to IPFS (Pinata)
       ├─→ Call OrderReceipt.sol
       ├─→ Mint NFT to buyer
       └─→ Return NFT token ID
      ↓
7. Order Complete
   └─→ Display confirmation
       ├─→ Transaction hash
       ├─→ NFT receipt link
       └─→ Thank you message
```

## Component Hierarchy

```
RootLayout
├── ThemeProvider
├── Web3Provider
│   └── WagmiProvider
│       └── RainbowKitProvider
│           └── RootPage
│               ├── Header
│               │   ├── Logo
│               │   ├── Navigation
│               │   ├── Cart Icon (with count)
│               │   └── ConnectButton
│               ├── Hero
│               │   ├── GalaxyBackground (Three.js)
│               │   ├── Title Animation
│               │   ├── CTA Button
│               │   └── Featured Products
│               ├── ProductGrid
│               │   └── ProductCard[] (infinite scroll)
│               │       ├── Image
│               │       ├── Name
│               │       ├── Price (USD + ETH)
│               │       ├── Add to Cart Button
│               │       └── View Details Link
│               ├── Cart (Sidebar)
│               │   ├── CartItem[] (from Zustand)
│               │   ├── Subtotal
│               │   ├── Tax
│               │   ├── Total
│               │   └── Checkout Button
│               ├── Checkout Modal
│               │   ├── Order Summary
│               │   ├── Payment Method Select
│               │   ├── Address Form (Zod validated)
│               │   └── Pay Button
│               ├── Footer
│               │   ├── Links
│               │   ├── Social
│               │   └── Copyright
│               └── Toaster (Sonner)
└── AI Assistant (floating)
    ├── Chat input
    └── Message history
```

## Database Schema

```
┌──────────────┐
│   Products   │
├──────────────┤
│ id (PK)      │
│ name         │
│ price_usd    │
│ price_eth    │
│ image_url    │
│ category     │
│ description  │
│ in_stock     │
│ created_at   │
└──────────────┘
       │
       ├─────┐
       │     │
       ↓     ↓
┌──────────────┐  ┌──────────────┐
│   Orders     │  │   Reviews    │
├──────────────┤  ├──────────────┤
│ id (PK)      │  │ id (PK)      │
│ user_id (FK) │  │ product_id FK│
│ product_id FK│  │ user_id (FK) │
│ amount       │  │ rating       │
│ currency     │  │ text         │
│ status       │  │ created_at   │
│ tx_hash      │  └──────────────┘
│ nft_token_id │
│ created_at   │
└──────────────┘
       │
       └─────┬──────┐
             │      │
             ↓      ↓
    ┌──────────────┐  ┌──────────────┐
    │   Users      │  │   Visitors   │
    ├──────────────┤  ├──────────────┤
    │ id (PK)      │  │ id (PK)      │
    │ wallet_addr  │  │ wallet_addr  │
    │ email        │  │ ip_address   │
    │ name         │  │ country      │
    │ created_at   │  │ referrer     │
    │ updated_at   │  │ user_agent   │
    └──────────────┘  │ visited_at   │
                      └──────────────┘

┌──────────────┐  ┌──────────────┐
│ DAO_Votes    │  │   Treasury   │
├──────────────┤  ├──────────────┤
│ id (PK)      │  │ id (PK)      │
│ proposal_id  │  │ amount       │
│ voter_addr   │  │ currency     │
│ choice       │  │ source       │
│ voting_power │  │ spent        │
│ voted_at     │  │ category     │
└──────────────┘  │ created_at   │
                  └──────────────┘
```

## Smart Contract Interaction Flow

```
ShopPayment Contract
│
├── createOrder(productId, amount)
│   └─→ Event: OrderCreated
│       └─→ Capture in /api/orders
│
├── payWithETH(orderId)
│   ├─→ Validate order
│   ├─→ Transfer ETH to contract
│   ├─→ Calculate fee (2.5%)
│   ├─→ Send fee to treasury
│   └─→ Event: OrderPaid
│       └─→ Trigger NFT minting
│
└── payWithToken(orderId, tokenAddr, amount)
    ├─→ Validate token whitelisted
    ├─→ Transfer tokens from user
    ├─→ Calculate fee
    ├─→ Send to treasury
    └─→ Event: OrderPaid
        └─→ Trigger NFT minting


OrderReceipt Contract
│
└── mintReceipt(to, orderId, productId, amount, currency, uri)
    ├─→ Validate minter role
    ├─→ Create NFT metadata struct
    ├─→ Mint ERC-721 to buyer
    ├─→ Store metadata on-chain
    └─→ Emit ReceiptMinted
        └─→ Return tokenId


GovernanceToken Contract
│
├── transfer(to, amount)
├── delegate(delegatee)
│   └─→ Enables voting power
├── approve(spender, amount)
└── vote(proposalId, support)
    └─→ Uses delegated voting power


Treasury Contract
│
├── receiveTokens(token, amount, source)
│   └─→ Update balance
├── allocateBudget(category, amount, period)
│   └─→ Set spending limits
├── proposeWithdrawal(recipient, amount, reason)
│   └─→ Create withdrawal proposal
└── executeWithdrawal(id)
    ├─→ Verify governance approval
    ├─→ Transfer funds
    └─→ Emit event
```

## State Management

```
Client-Side State (Zustand)
│
├── cartStore
│   ├── items: CartItem[]
│   ├── addItem(item)
│   ├── removeItem(id)
│   ├── updateQuantity(id, qty)
│   └── clearCart()
│
├── userStore
│   ├── address: string
│   ├── isConnected: boolean
│   ├── nfts: NFT[]
│   └── setAddress(addr)
│
└── uiStore
    ├── isDarkMode: boolean
    ├── isMobileMenuOpen: boolean
    ├── activeTab: string
    └── setActiveTab(tab)

Server State (React Query / SWR)
│
├── useQuery('products') → products[]
├── useQuery('orders') → orders[]
├── useQuery('user') → user data
└── useMutation('createOrder') → order
```

## API Endpoints

```
GET    /api/products                      List all products
POST   /api/products                      Create product (admin)
GET    /api/products/[id]                Get product details
PUT    /api/products/[id]                Update product (admin)
DELETE /api/products/[id]                Delete product (admin)

POST   /api/orders/pay                   Create & pay for order
GET    /api/orders                       List orders
GET    /api/orders/[id]                 Get order details
PUT    /api/orders/[id]                 Update order (admin)

POST   /api/nft/mint-receipt            Mint NFT receipt
GET    /api/nft/[tokenId]               Get NFT metadata

POST   /api/dao/proposals                Create proposal
GET    /api/dao/proposals                List proposals
POST   /api/dao/vote                     Cast vote
GET    /api/dao/stats                    DAO statistics

GET    /api/admin/analytics              Analytics data
GET    /api/admin/orders                 Admin orders list
GET    /api/admin/users                  User management
GET    /api/admin/stats                  Dashboard stats
```

## Deployment Architecture

```
User's Browser
    ↓
    ↓ HTTPS
    ↓
┌─────────────┐
│  Vercel     │ (Edge Network)
│  CDN        │
└─────────────┘
    ↓
    ↓
┌─────────────────────┐
│  Next.js App        │
│  (Vercel Hosting)   │
│                     │
│  ├─ Pages (SSR)     │
│  ├─ API Routes      │
│  └─ Static Assets   │
└──────────┬──────────┘
           ↓
    ┌──────────────────────────────────┐
    │                                  │
    ↓                  ↓              ↓
┌─────────────┐  ┌──────────────┐  ┌─────────────┐
│ PostgreSQL  │  │ IPFS/Pinata  │  │ Blockchain  │
│ (Database)  │  │ (Storage)    │  │ (Ethereum)  │
└─────────────┘  └──────────────┘  └─────────────┘
    │                   │                 │
    │                   │                 │
    ├─── User Data      ├─── Metadata     ├─── Transactions
    ├─── Products       ├─── Images       ├─── Contracts
    ├─── Orders         ├─── Documents    └─── Tokens
    └─── Analytics      └─── Videos
```

## Security Flow

```
User Action
    ↓
1. Wallet Connection
   └─→ Browser shows wallet selector
       └─→ User approves in wallet
           └─→ Return signed message
               └─→ Verify signature (SIWE)
                   └─→ Issue JWT token
      ↓
2. Request Authentication
   └─→ Send JWT in Authorization header
       └─→ Middleware verifies JWT
           └─→ Check signature expiration
               └─→ Verify wallet matches
                   └─→ Allow request
      ↓
3. Smart Contract Interaction
   └─→ User approves transaction in wallet
       └─→ Wallet signs transaction
           └─→ Submit to blockchain
               └─→ Contract verifies sender
                   └─→ Execute transaction
                       └─→ Event emitted
                           └─→ API listens for event
                               └─→ Update database
      ↓
4. Data Validation
   └─→ All inputs validated
       └─→ Zod schema checking
           └─→ Type safety (TypeScript)
               └─→ SQL injection prevention (parameterized)
                   └─→ XSS prevention (escaped)
                       └─→ CORS enabled
                           └─→ Rate limiting
```

This architecture ensures security, scalability, and maintainability.
