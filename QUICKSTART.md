# 🚀 ZAYX-OS Quick Start Guide

Get the Web3 e-commerce platform running in 5 minutes!

## Step 1: Prerequisites

Make sure you have:
- Node.js 20.11.0+ ([download](https://nodejs.org))
- npm 10.0.0+
- Git
- MetaMask wallet ([install](https://metamask.io))

Check versions:
```bash
node --version  # Should be v20.11.0+
npm --version   # Should be 10.0.0+
```

## Step 2: Clone & Install

```bash
# Clone the repository
git clone https://github.com/zayx-os/platform.git
cd platform

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

## Step 3: Configure Environment

Edit `.env.local` with:

```env
# For development - these defaults work:
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=file:./dev.db
NODE_ENV=development

# Web3 (optional for demo)
NEXT_PUBLIC_ALCHEMY_API_KEY=demo
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=demo

# AI (optional)
OPENAI_API_KEY=sk-your-key-here

# Other APIs can be added later
```

## Step 4: Setup Database

```bash
# Generate Drizzle schema
npm run db:generate

# Push schema to database
npm run db:push
```

For development, this creates a local `dev.db` SQLite file.

## Step 5: Start Development Server

```bash
npm run dev
```

The app is now running at **http://localhost:3000** 🎉

## Step 6: First Actions

### In the Browser:

1. **Visit Homepage**: http://localhost:3000
2. **View Products**: Browse the product catalog
3. **Add to Cart**: Click "Add to Cart" on any product
4. **View Cart**: Click cart icon in header
5. **Connect Wallet** (Optional):
   - Click "Connect Wallet" button
   - Select MetaMask
   - Approve connection

### Using CLI:

```bash
# View database in studio
npm run db:studio

# Run tests
npm run test

# Compile smart contracts
npm run contracts:compile
```

## Step 7: Deploy Smart Contracts (Optional)

For development/testing:

```bash
# Start local Hardhat node
npm run contracts:node

# Deploy to local network
npm run contracts:deploy:local
```

For Sepolia testnet:

```bash
# First, set DEPLOYER_PRIVATE_KEY in .env.local
npm run contracts:deploy:testnet
```

## 📊 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:generate      # Generate migrations
npm run db:push          # Apply migrations
npm run db:migrate       # Run migrations
npm run db:studio        # Open database studio

# Smart Contracts
npm run contracts:compile         # Compile Solidity
npm run contracts:test            # Run contract tests
npm run contracts:node            # Start local node
npm run contracts:deploy:local    # Deploy to local
npm run contracts:deploy:testnet  # Deploy to Sepolia
npm run contracts:deploy:mainnet  # Deploy to mainnet
npm run contracts:verify          # Verify on Etherscan

# Code Quality
npm run lint             # Run linting
npm run format           # Format code
npm run type-check       # Check TypeScript

# Testing
npm run test             # Run all tests
npm run test:unit        # Unit tests
npm run test:e2e         # E2E tests
```

## 🔧 Common Tasks

### Add New Products

Edit `/data/products.ts`:

```typescript
export const products = [
  {
    id: "1",
    name: "Your Product",
    description: "Product description",
    price: 99.99,
    priceInCrypto: "0.05",
    category: "digital",
    image: "/images/product.jpg",
  },
];
```

### Connect to PostgreSQL (Production)

Update `.env.local`:
```env
DATABASE_URL=postgresql://user:password@host:5432/zayx_os
npm run db:push
```

### Enable Payment Processing

1. Get Stripe keys from [stripe.com](https://stripe.com)
2. Add to `.env.local`:
```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Setup Web3 Wallet Connection

1. Get WalletConnect Project ID: [walletconnect.com](https://walletconnect.com)
2. Get Alchemy API key: [alchemy.io](https://alchemy.io)
3. Add to `.env.local`:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_id
NEXT_PUBLIC_ALCHEMY_API_KEY=your_key
```

### Enable AI Features

1. Get OpenAI API key: [openai.com](https://openai.com)
2. Add to `.env.local`:
```env
OPENAI_API_KEY=sk-your-key-here
```

## 🌐 File Storage (IPFS)

Setup Pinata for NFT metadata:

1. Create account: [pinata.cloud](https://pinata.cloud)
2. Get API keys
3. Add to `.env.local`:
```env
PINATA_API_KEY=your_api_key
PINATA_SECRET_KEY=your_secret_key
```

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

### Database Connection Error

```bash
# Reset SQLite database
rm dev.db

# Regenerate
npm run db:generate
npm run db:push
```

### Module Not Found Error

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Contract Compilation Error

```bash
# Check Solidity version
npm run contracts:compile -- --version

# Rebuild
npm run contracts:compile -- --force
```

### Wallet Connection Issues

1. Clear browser cache/cookies
2. Reinstall MetaMask extension
3. Switch to Sepolia testnet
4. Try different wallet (Coinbase, Phantom)

## 📚 Next Steps

1. **Read Full Docs**: [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)
2. **Understand Architecture**: See [README_WEB3.md](./README_WEB3.md)
3. **Deploy Contracts**: Follow [docs/DEPLOYMENT.md#smart-contract-deployment](./docs/DEPLOYMENT.md#smart-contract-deployment)
4. **Setup DAO**: Learn governance at [docs/DAO.md](./docs/DAO.md)
5. **Configure Admin**: Setup admin dashboard in settings

## 💡 Tips

- **Use Testnet First**: Always test on Sepolia before mainnet
- **Save Private Keys**: Store safely in password manager
- **Check Gas Prices**: Monitor gas before mainnet deployment
- **Community Help**: Ask in Discord for support
- **Keep Updated**: Watch repo for updates

## 🆘 Need Help?

- **Discord**: https://discord.gg/zayx
- **GitHub Issues**: https://github.com/zayx-os/platform/issues
- **Email**: support@zayx.io
- **Twitter**: @zayx_os

---

**You're all set!** 🎉

Start building your Web3 commerce platform now. Happy coding! 🚀
