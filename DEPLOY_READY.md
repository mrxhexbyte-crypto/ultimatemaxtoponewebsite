# ZAYX-OS - Deploy Ready Guide

## ✅ Installation & Setup

### Step 1: Install Dependencies
```bash
npm install
```

All packages are now compatible and tested:
- React 18.3.1 (compatible with all Web3 packages)
- @stripe/react-stripe-js 2.7.0 (React 18 compatible)
- @coinbase/onchainkit 0.30.0 (React 18 compatible)  
- three 0.158.0 (correct semver)
- @react-three/fiber 9.0.0 (compatible with @react-three/rapier)

### Step 2: Configure Environment
Copy `.env.example` to `.env.local` and add your keys:

```bash
cp .env.example .env.local
```

**Required for Local Dev:**
- NEXTAUTH_SECRET (generate: `openssl rand -base64 32`)
- DATABASE_URL (defaults to SQLite: `file:./dev.db`)

**Optional for Features:**
- NEXT_PUBLIC_ALCHEMY_API_KEY (for wallet connections)
- NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID (for WalletConnect)
- STRIPE_SECRET_KEY + NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (for Stripe)
- OPENAI_API_KEY (for AI features)
- PINATA_API_KEY + PINATA_SECRET_KEY (for IPFS)

### Step 3: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 4: Build for Production
```bash
npm run build
npm start
```

---

## 🚀 Deploy to Vercel

### Automatic Deployment
1. Push code to GitHub
2. Connect repo to Vercel
3. Vercel automatically deploys on push

### Manual Deployment
```bash
npm run deploy
# or
vercel --prod
```

### Environment Variables on Vercel
1. Go to Vercel Dashboard > Settings > Environment Variables
2. Add all variables from `.env.example`
3. Set `NODE_ENV=production`

---

## 🔗 Smart Contracts

### Deploy Contracts to Sepolia (Testnet)
```bash
npm run contracts:compile
npm run contracts:deploy:sepolia
```

### Deploy to Mainnet (After Testing)
```bash
npm run contracts:deploy:mainnet
```

---

## 📝 Database

### Initialize Database
```bash
npm run db:generate
npm run db:push
npm run db:migrate
```

### View Database (Drizzle Studio)
```bash
npm run db:studio
```

---

## ✨ Features Ready to Use

- **Web3 Wallets**: MetaMask, WalletConnect, Coinbase, Web3Auth
- **Payments**: ETH, USDC, USDT, DAI, Stripe, Coinbase Commerce
- **NFT Receipts**: Automatic ERC-721 minting on purchase
- **DAO**: Community voting and treasury management
- **Digital Downloads**: Secure links with JWT tokens
- **IPFS Storage**: Pinata integration for files
- **Analytics**: Real-time visitor tracking
- **Admin Dashboard**: SIWE-gated operations

---

## 📦 Package Changes Made

| Package | From | To | Reason |
|---------|------|----|----|
| React | 19.0 | 18.3.1 | Web3 compatibility |
| Next.js | 16.0 | 15.1 | Stability |
| @stripe/react-stripe-js | 5.5.0 | 2.7.0 | React 18 compatible |
| @coinbase/onchainkit | 1.1.2 | 0.30.0 | React 18 compatible |
| three | ^r158 | 0.158.0 | Valid semver |
| @react-three/fiber | 8.15 | 9.0.0 | Rapier compatibility |

---

## ✅ Ready to Launch

Your website is now:
- ✅ Install-ready (`npm install`)
- ✅ Build-ready (`npm run build`)
- ✅ Dev-ready (`npm run dev`)
- ✅ Deploy-ready (`npm run deploy`)
- ✅ All packages compatible
- ✅ Database configured
- ✅ Smart contracts included
- ✅ API routes ready
- ✅ Web3 integration complete

**Start now:**
```bash
npm install && npm run dev
```
