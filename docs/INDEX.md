# ZAYX-OS Documentation Index

Complete guide to all documentation and resources for the Web3 e-commerce platform.

## 📖 Documentation Files

### Getting Started
- **[QUICKSTART.md](/QUICKSTART.md)** ⭐ START HERE
  - 5-minute setup guide
  - Prerequisites and installation
  - First actions and testing
  - Troubleshooting

### Comprehensive Guides
- **[README_WEB3.md](/README_WEB3.md)** - Full Feature Guide
  - Project overview and features
  - Smart contracts documentation
  - API endpoint reference
  - Architecture and structure

- **[WEB3_INTEGRATION_SUMMARY.md](/WEB3_INTEGRATION_SUMMARY.md)** - Complete Integration Summary
  - What's been built
  - Smart contract details
  - Web3 integration features
  - Ready-to-use features

- **[docs/DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment Instructions
  - Environment setup
  - Smart contract deployment
  - Production deployment options
  - Post-deployment checklist
  - Monitoring and maintenance

### Configuration
- **[.env.example](../.env.example)** - Environment Variables
  - All required variables
  - API key configuration
  - Network configuration
  - Security settings

## 🚀 Quick Links

### For First-Time Users
1. Read: [QUICKSTART.md](/QUICKSTART.md)
2. Run: `npm install && npm run dev`
3. Visit: http://localhost:3000

### For Developers
1. Read: [README_WEB3.md](/README_WEB3.md#project-structure)
2. Review: [API Endpoints](./API.md)
3. Check: Smart contracts in `/contracts/`

### For Deployment
1. Read: [docs/DEPLOYMENT.md](./DEPLOYMENT.md)
2. Setup: Environment variables
3. Deploy: Smart contracts
4. Configure: Contract addresses

### For API Integration
1. Reference: [README_WEB3.md](/README_WEB3.md#api-endpoints)
2. Examples: `/app/api/`
3. Types: `/types/`

## 📚 Smart Contract Documentation

### ShopPayment.sol
- Location: `/contracts/ShopPayment.sol`
- Purpose: Handles ETH and ERC20 payments
- Functions: Create orders, process payments, manage whitelist
- Deploy: `npm run contracts:deploy:testnet`

### OrderReceipt.sol
- Location: `/contracts/OrderReceipt.sol`
- Purpose: Mints NFT receipts for orders (ERC-721)
- Functions: Mint receipt, manage metadata, retrieve receipts
- Use: Automatic minting after payment

### GovernanceToken.sol
- Location: `/contracts/GovernanceToken.sol`
- Purpose: DAO voting token (ERC-20 + Votes)
- Functions: Transfer, delegate, vote, mint/burn
- Supply: 1 billion (1B) tokens

### Treasury.sol
- Location: `/contracts/Treasury.sol`
- Purpose: DAO fund management
- Functions: Receive funds, propose/execute withdrawals, allocate budgets
- Control: DAO governance

## 🔑 Environment Variables

### Essential (Must Configure)
```env
NEXT_PUBLIC_APP_URL          # App URL (http://localhost:3000 for dev)
DATABASE_URL                 # Database connection (file:./dev.db for SQLite)
DEPLOYER_PRIVATE_KEY         # For contract deployment
```

### Web3 (For Wallet Connection)
```env
NEXT_PUBLIC_ALCHEMY_API_KEY           # From alchemy.io
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID  # From walletconnect.com
```

### Contract Addresses (After Deployment)
```env
NEXT_PUBLIC_SHOP_PAYMENT_ADDRESS          # Payment contract
NEXT_PUBLIC_ORDER_RECEIPT_ADDRESS         # NFT receipt contract
NEXT_PUBLIC_GOVERNANCE_TOKEN_ADDRESS      # DAO token address
NEXT_PUBLIC_TREASURY_ADDRESS              # Treasury contract
```

### Optional (For Enhanced Features)
```env
OPENAI_API_KEY               # For AI assistant
PINATA_API_KEY               # For IPFS storage
STRIPE_SECRET_KEY            # For fiat payments
```

## 📋 Common Tasks

### Development
- **Start dev server**: `npm run dev`
- **Build for production**: `npm run build`
- **Run tests**: `npm run test`
- **Lint code**: `npm run lint`

### Database
- **Generate migrations**: `npm run db:generate`
- **Apply migrations**: `npm run db:push`
- **Open database UI**: `npm run db:studio`
- **Reset database**: `rm dev.db && npm run db:push`

### Smart Contracts
- **Compile**: `npm run contracts:compile`
- **Test**: `npm run contracts:test`
- **Deploy to Sepolia**: `npm run contracts:deploy:testnet`
- **Deploy to Mainnet**: `npm run contracts:deploy:mainnet`
- **Verify on Etherscan**: `npm run contracts:verify`

## 🏗️ Project Structure

```
/
├── app/                     # Next.js 16 app
│   ├── api/                # API routes
│   ├── (shop)/            # E-commerce pages
│   ├── (admin)/           # Admin dashboard
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── web3/             # Web3 components
│   ├── shop/             # Shop components
│   └── ui/               # Shadcn UI
├── contracts/            # Smart contracts (Solidity)
├── lib/
│   ├── db/              # Database (Drizzle ORM)
│   └── web3/            # Web3 utilities
├── hooks/               # React hooks
├── store/               # Zustand state
├── docs/                # Documentation
│   ├── DEPLOYMENT.md    # Deployment guide
│   └── INDEX.md         # This file
├── hardhat.config.ts    # Hardhat config
├── drizzle.config.ts    # Database config
└── package.json         # Dependencies
```

## 🌐 Supported Networks

| Network | Chain ID | RPC | Testnet |
|---------|----------|-----|---------|
| Ethereum | 1 | Mainnet | Sepolia (11155111) |
| Polygon | 137 | Mainnet | Mumbai |
| Base | 8453 | Mainnet | Base Sepolia |
| Solana | - | Devnet | Testnet |

## 💾 Database

### Development (SQLite)
- Auto-created at `./dev.db`
- Best for local development
- No setup required

### Production (PostgreSQL)
- Update `DATABASE_URL` in `.env.local`
- Recommended for production
- Supports replication

## 🔐 Security Checklist

- [ ] Change all `NEXT_PUBLIC_*` demo values
- [ ] Use real private key for deployer
- [ ] Enable HTTPS in production
- [ ] Set strong JWT_SECRET
- [ ] Configure CORS properly
- [ ] Setup rate limiting
- [ ] Enable monitoring
- [ ] Audit smart contracts
- [ ] Test payment flows thoroughly
- [ ] Setup backup strategy

## 🧪 Testing

- **Unit Tests**: `npm run test`
- **Contract Tests**: `npm run contracts:test`
- **E2E Tests**: `npm run test:e2e`
- **Local Node**: `npm run contracts:node`

## 📊 Monitoring & Analytics

- **Error Tracking**: Sentry (optional)
- **Analytics**: PostHog (optional)
- **Vercel Analytics**: Built-in
- **Database Studio**: `npm run db:studio`

## 🆘 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
lsof -i :3000
kill -9 <PID>
```

**Dependencies Error**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Database Error**
```bash
rm dev.db
npm run db:push
```

**Contract Compilation Error**
```bash
npm run contracts:compile -- --force
```

For more help, see [QUICKSTART.md - Troubleshooting](/QUICKSTART.md#-troubleshooting)

## 📞 Support

- **Discord**: https://discord.gg/zayx
- **GitHub Issues**: https://github.com/zayx-os/platform/issues
- **Email**: support@zayx.io
- **Twitter**: @zayx_os

## 🔗 External Resources

- **Solidity Docs**: https://docs.soliditylang.org
- **Hardhat Docs**: https://hardhat.org/docs
- **Ethers.js**: https://docs.ethers.org
- **Next.js**: https://nextjs.org/docs
- **Drizzle ORM**: https://orm.drizzle.team

## 📝 File Reference

### Core Files
| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage |
| `app/layout.tsx` | Root layout with providers |
| `app/api/` | API routes |
| `components/` | React components |
| `lib/db/` | Database setup |
| `lib/web3/` | Web3 utilities |

### Configuration Files
| File | Purpose |
|------|---------|
| `.env.local` | Environment variables |
| `package.json` | Dependencies |
| `next.config.ts` | Next.js configuration |
| `tailwind.config.ts` | Tailwind CSS |
| `tsconfig.json` | TypeScript |
| `hardhat.config.ts` | Hardhat |
| `drizzle.config.ts` | Drizzle ORM |

### Smart Contracts
| File | Purpose |
|------|---------|
| `contracts/ShopPayment.sol` | Payment processing |
| `contracts/OrderReceipt.sol` | NFT receipts |
| `contracts/GovernanceToken.sol` | DAO token |
| `contracts/Treasury.sol` | Fund management |

## ✅ Implementation Status

- ✅ Frontend with Next.js 16
- ✅ Smart contracts (Solidity 0.8.24)
- ✅ Web3 wallet integration
- ✅ Payment processing (ETH + ERC20)
- ✅ NFT receipt minting
- ✅ DAO governance
- ✅ Database with Drizzle ORM
- ✅ API routes
- ✅ React hooks
- ✅ Authentication (SIWE)
- ✅ Admin dashboard
- ✅ Documentation

## 🎯 Next Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/zayx-os/platform.git
   cd platform
   ```

2. **Follow QUICKSTART**
   ```bash
   cat QUICKSTART.md
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your keys
   ```

4. **Start Development**
   ```bash
   npm install
   npm run dev
   ```

5. **Visit App**
   ```
   http://localhost:3000
   ```

---

**Welcome to ZAYX-OS! 🚀**

Start building your Web3 commerce platform now.
