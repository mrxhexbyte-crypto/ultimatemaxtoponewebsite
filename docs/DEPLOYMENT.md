# ZAYX-OS Deployment Guide

Complete guide for deploying the Web3 e-commerce platform with smart contracts, DAO, and crypto payments.

## Prerequisites

- Node.js 20.11.0+
- npm 10.0.0+
- Git
- MetaMask or compatible Web3 wallet

## Development Setup

### 1. Install Dependencies

```bash
npm install
# or with pnpm
pnpm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Key configuration for Web3:
- `NEXT_PUBLIC_ALCHEMY_API_KEY` - Get from alchemy.io
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - Get from walletconnect.com
- `DEPLOYER_PRIVATE_KEY` - Your wallet private key (for contract deployment)

### 3. Database Setup

For development (SQLite):
```bash
npm run db:generate
npm run db:push
```

For production (PostgreSQL):
```bash
# Update DATABASE_URL in .env.local to PostgreSQL connection string
npm run db:generate
npm run db:push
```

### 4. Smart Contract Compilation

```bash
npm run contracts:compile
```

## Smart Contract Deployment

### Deploy to Sepolia Testnet

```bash
npm run contracts:deploy:testnet
```

This deploys:
- **ShopPayment** - Handles ETH and ERC20 payments
- **OrderReceipt** - Mints NFT receipts for orders
- **GovernanceToken** - ZYX token for DAO voting
- **Treasury** - Manages DAO funds

### Deploy to Mainnet

```bash
npm run contracts:deploy:mainnet
```

### Verify Contracts on Etherscan

```bash
npm run contracts:verify
```

## Environment Variables Setup

### Web3 Configuration

After deploying contracts, update `.env.local`:

```env
NEXT_PUBLIC_SHOP_PAYMENT_ADDRESS=0x... (from deployment)
NEXT_PUBLIC_ORDER_RECEIPT_ADDRESS=0x... (from deployment)
NEXT_PUBLIC_GOVERNANCE_TOKEN_ADDRESS=0x... (from deployment)
NEXT_PUBLIC_TREASURY_ADDRESS=0x... (from deployment)
```

### API Keys Required

1. **Alchemy** (alchemy.io)
   - Create project on Ethereum + Polygon + Base
   - Get API key for RPC endpoints

2. **WalletConnect** (walletconnect.com)
   - Create project
   - Get Project ID for wallet connections

3. **Pinata** (pinata.cloud)
   - Create account
   - Get API key + Secret for IPFS storage

4. **OpenAI** (openai.com)
   - Create account
   - Get API key for AI features

5. **Stripe** (stripe.com)
   - Create account
   - Get publishable + secret keys

6. **Etherscan** (etherscan.io)
   - Create account
   - Get API key for contract verification

## Running Locally

### Development Server

```bash
npm run dev
```

Visits:
- App: http://localhost:3000
- API: http://localhost:3000/api
- Database Studio: `npm run db:studio`

### Test Smart Contracts

```bash
npm run contracts:test
```

### Run Local Hardhat Node

```bash
npm run contracts:node
```

Deploy to local network:
```bash
npm run contracts:deploy:local
```

## Production Deployment

### Build for Production

```bash
npm run build
```

### Deployment Options

#### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel login
vercel deploy --prod
```

#### Option 2: Self-Hosted

```bash
# Build
npm run build

# Start server
npm start
```

#### Option 3: Docker

```bash
docker build -t zayx-os .
docker run -p 3000:3000 zayx-os
```

## Post-Deployment Checklist

- [ ] Update contract addresses in `.env.prod`
- [ ] Configure domain for production
- [ ] Set up SSL certificate
- [ ] Configure CORS for API endpoints
- [ ] Set up monitoring (Sentry)
- [ ] Configure analytics (PostHog, Vercel)
- [ ] Test wallet connections
- [ ] Test payment flows
- [ ] Verify database backups
- [ ] Set up monitoring alerts
- [ ] Document contract addresses
- [ ] Create initial DAO proposals

## DAO Governance Setup

### 1. Initialize Governance Token

Mint tokens to community members:
```bash
npm run dao:mint-tokens
```

### 2. Create Initial Proposals

```bash
npm run dao:propose
```

Example proposals:
- Platform fee adjustments
- New product categories
- Treasury allocations
- Development roadmap

### 3. Enable Voting

Members must delegate voting power:
```bash
npm run dao:delegate
```

## Monitoring & Maintenance

### Health Checks

```bash
# Check database
npm run db:migrate

# Verify contracts
npm run contracts:test

# Lint code
npm run lint
```

### Backup Strategy

- Database: Daily backups to S3
- Smart contracts: Store ABIs in Git
- Private keys: Secure vault (AWS Secrets Manager recommended)

## Troubleshooting

### Contract Deployment Fails

```bash
# Check gas prices
npm run contracts:gas-estimate

# Verify private key has funds
npm run contracts:balance

# Debug deployment
npm run contracts:deploy:testnet -- --debug
```

### Payment Issues

- Verify contract addresses in `.env.local`
- Check token whitelist in ShopPayment contract
- Verify gas limits for transactions
- Check wallet balance

### Database Issues

- Reset SQLite: `rm dev.db`
- Verify PostgreSQL connection string
- Check database migrations: `npm run db:migrate`

## Security Considerations

1. **Private Keys**: Never commit `.env.local` with real private keys
2. **Contract Verification**: Always verify contracts on Etherscan
3. **Rate Limiting**: Enable on all API endpoints
4. **CORS**: Configure strictly for production
5. **Secrets Management**: Use AWS Secrets Manager or similar
6. **Audits**: Get smart contracts audited before mainnet

## Support

For issues and questions:
- GitHub: [zayx-os/issues](https://github.com/zayx-os/issues)
- Discord: [Join Community](https://discord.gg/zayx)
- Docs: https://docs.zayx.io
