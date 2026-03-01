# ZAYX-OS: Web3 E-Commerce Platform

![ZAYX-OS](https://img.shields.io/badge/Web3-Enabled-blue) ![Smart Contracts](https://img.shields.io/badge/Contracts-Deployed-green) ![DAO](https://img.shields.io/badge/DAO-Active-orange)

The ultimate decentralized e-commerce platform for selling physical and digital products using blockchain technology, cryptocurrency payments, and community governance.

## 🌟 Features

### 🛍️ E-Commerce
- **Product Catalog**: Digital, physical, and NFT products
- **Cart System**: Persistent shopping cart with Zustand
- **Checkout**: Multi-payment options (ETH, USDC, stablecoins)
- **Order Management**: Real-time order tracking on-chain
- **Digital Delivery**: Instant download links for digital products

### 🔗 Web3 Integration
- **Multi-Wallet Support**:
  - MetaMask
  - RainbowKit/WalletConnect
  - Coinbase Wallet
  - Phantom (Solana)
  - Web3Auth
  - Privy
  - Dynamic

- **Payment Options**:
  - Native ETH payments
  - ERC20 stablecoins (USDC, USDT, DAI)
  - Cross-chain swaps (Uniswap integration)
  - Fiat on-ramps (Stripe, Coinbase Commerce)

### 🎫 NFT Receipts
- ERC-721 NFT minted for each order
- Proof of purchase stored on-chain
- Metadata on IPFS via Pinata
- Transferable and tradeable
- Digital product unlocks via NFT ownership

### 🏛️ DAO Governance
- **Governance Token (ZYX)**: ERC-20 with voting rights
- **Proposals**: Community votes on:
  - Platform fees and incentives
  - Product categories
  - Treasury allocations
  - Feature development
- **Voting Power**: Delegates voting tokens
- **Treasury Management**: Community-controlled funds

### 💎 Advanced Features
- **3D Product Viewer**: Three.js 3D model visualization
- **AI Assistant**: OpenAI GPT-4 powered support
- **Admin Dashboard**: SIWE-gated analytics and management
- **Real-time Analytics**: Recharts dashboards
- **IPFS Integration**: Decentralized file storage
- **Fraud Detection**: AI-powered transaction monitoring
- **Staking**: Earn rewards by staking ZYX tokens

## 🚀 Quick Start

### Prerequisites
```
Node.js 20.11.0+
npm 10.0.0+
MetaMask or compatible wallet
```

### Installation

```bash
# Clone repository
git clone https://github.com/zayx-os/platform.git
cd platform

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Update .env.local with your keys (see docs/DEPLOYMENT.md)
```

### Development

```bash
# Start development server
npm run dev

# Compile smart contracts
npm run contracts:compile

# Deploy contracts to Sepolia testnet
npm run contracts:deploy:testnet

# Run tests
npm run test
npm run contracts:test

# Database migrations
npm run db:generate
npm run db:push
```

Visit http://localhost:3000

## 📋 Project Structure

```
zayx-os/
├── app/                          # Next.js 16 app
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Homepage
│   ├── (shop)/                  # E-commerce routes
│   ├── (user)/                  # User dashboard
│   ├── (admin)/                 # Admin panel (SIWE-gated)
│   ├── api/                     # API routes
│   │   ├── orders/              # Order management
│   │   ├── payments/            # Payment processing
│   │   ├── nft/                 # NFT operations
│   │   └── dao/                 # DAO proposals/voting
│   └── globals.css              # Global styles
│
├── components/
│   ├── layout/                  # Header, Footer, Hero
│   ├── shop/                    # Product grid, filters
│   ├── cart/                    # Cart components
│   ├── web3/                    # Wallet, auth, payments
│   ├── 3d/                      # Three.js components
│   ├── ui/                      # Shadcn UI components
│   └── providers/               # Context providers
│
├── contracts/                   # Smart contracts (Solidity)
│   ├── ShopPayment.sol         # Payment processing
│   ├── OrderReceipt.sol        # NFT receipts (ERC-721)
│   ├── GovernanceToken.sol     # ZYX token (ERC-20Votes)
│   └── Treasury.sol            # DAO treasury
│
├── lib/
│   ├── db/                     # Database (Drizzle ORM)
│   │   ├── schema.ts          # Database tables
│   │   └── db.ts              # Database client
│   ├── web3/                   # Web3 utilities
│   │   └── contracts.ts       # Contract interactions
│   └── utils.ts               # Helper functions
│
├── hooks/
│   ├── useWeb3Payment.ts      # Payment hook
│   ├── use-cart.ts            # Cart state
│   └── use-mobile.ts          # Responsive hook
│
├── store/
│   ├── cartStore.ts           # Zustand cart state
│   └── userStore.ts           # User preferences
│
├── types/
│   └── index.ts               # TypeScript types
│
├── data/
│   └── products.ts            # Product data
│
├── hardhat.config.ts          # Hardhat configuration
├── drizzle.config.ts          # Database configuration
├── tailwind.config.ts         # Tailwind CSS
├── next.config.ts             # Next.js configuration
└── package.json               # Dependencies
```

## 🔐 Smart Contracts

### ShopPayment.sol
Handles cryptocurrency payments for orders
```solidity
// Create order
function createOrder(string productId, uint256 amount) returns uint256 orderId

// Pay with ETH
function payWithETH(uint256 orderId) payable

// Pay with ERC20 tokens
function payWithToken(uint256 orderId, address token, uint256 amount)

// Admin functions
function setFeePercentage(uint256 newFee)
function whitelistToken(address token)
```

### OrderReceipt.sol (ERC-721)
Mints NFT receipts for purchases
```solidity
// Mint receipt NFT
function mintReceipt(
  address buyer,
  string orderId,
  string productId,
  uint256 amount,
  string currency,
  string metadataURI,
  bool isPhysical,
  bool isDigital
) returns uint256 tokenId

// Get receipt details
function getReceipt(uint256 tokenId) returns ReceiptData

// Retrieve receipt by order ID
function getTokenIdByOrderId(string orderId) returns uint256
```

### GovernanceToken.sol (ERC-20)
Community voting token
```solidity
// ERC-20 standard + Votes extension
function delegate(address delegatee)
function getVotes(address account) returns uint256
function mint(address to, uint256 amount)
function burn(uint256 amount)
```

### Treasury.sol
DAO fund management
```solidity
// Revenue collection
receive() payable

// Withdrawal proposals
function proposeWithdrawal(address recipient, uint256 amount, string reason)
function executeWithdrawal(uint256 id)

// Budget allocation
function allocateBudget(string category, uint256 amount, uint256 period)
```

## 🔑 Environment Variables

See `.env.example` for complete list. Key variables:

```env
# Web3
NEXT_PUBLIC_ALCHEMY_API_KEY=
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
NEXT_PUBLIC_SHOP_PAYMENT_ADDRESS=
NEXT_PUBLIC_GOVERNANCE_TOKEN_ADDRESS=

# Deployment
DEPLOYER_PRIVATE_KEY=
ETHERSCAN_API_KEY=

# APIs
OPENAI_API_KEY=
PINATA_API_KEY=
STRIPE_SECRET_KEY=

# Database
DATABASE_URL=
```

## 📚 API Endpoints

### Orders
- `POST /api/orders/create` - Create new order
- `POST /api/orders/pay` - Process payment
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/user/:address` - Get user's orders

### Payments
- `POST /api/payments/eth` - ETH payment
- `POST /api/payments/token` - Token payment
- `GET /api/payments/status/:txHash` - Check payment status

### NFT Receipts
- `POST /api/nft/mint-receipt` - Mint receipt NFT
- `GET /api/nft/receipt/:tokenId` - Get receipt details
- `GET /api/nft/user/:address` - Get user's receipts

### DAO
- `GET /api/dao/proposals` - List proposals
- `POST /api/dao/proposals` - Create proposal
- `POST /api/dao/votes` - Cast vote
- `GET /api/dao/governance/token-info` - Token stats

### Admin
- `GET /api/admin/analytics` - Dashboard analytics
- `GET /api/admin/orders` - Order management
- `POST /api/admin/products` - Add products
- `POST /api/admin/contracts/deploy` - Deploy contracts

## 🧪 Testing

```bash
# Unit tests
npm run test

# Smart contract tests
npm run contracts:test

# End-to-end tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## 🌐 Deployed Networks

- **Sepolia Testnet** - For development/testing
- **Ethereum Mainnet** - Production (after audit)
- **Polygon** - Lower fees
- **Base** - Optimized for payments
- **Solana** - Phantom wallet support

## 🛡️ Security

- ✅ Smart contracts audited by [Auditor Name]
- ✅ SIWE authentication for admin
- ✅ RLS policies on database
- ✅ Rate limiting on all APIs
- ✅ CORS protection
- ✅ Input validation & sanitization
- ✅ Secure session management (HTTP-only cookies)
- ✅ Encryption for sensitive data

## 📊 Analytics

- **Dashboard**: Recharts visualizations
- **Metrics**: Real-time order stats, revenue, users
- **DAO**: Proposal voting history
- **Blockchain**: On-chain transaction tracking

## 🤝 Contributing

Contributions welcome! Please:

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License - see LICENSE file

## 🔗 Links

- **Website**: https://zayx.io
- **Docs**: https://docs.zayx.io
- **Discord**: https://discord.gg/zayx
- **Twitter**: https://twitter.com/zayx_os
- **GitHub**: https://github.com/zayx-os

## 💬 Support

For questions and support:
- Create issue on GitHub
- Join Discord community
- Email: support@zayx.io

---

**ZAYX-OS**: Decentralized Commerce. Community Governed. Blockchain Powered. 🚀
