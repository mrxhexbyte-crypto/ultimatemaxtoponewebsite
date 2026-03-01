# Quick Command Reference

## Install Dependencies
```bash
npm install
# Or with legacy peer deps if needed:
npm install --legacy-peer-deps
```

## Development
```bash
npm run dev
# Server runs at http://localhost:3000
```

## Build for Production
```bash
npm run build
```

## Run Production Build Locally
```bash
npm run start
```

## Deploy to Vercel
```bash
npm run deploy
```

## Smart Contracts
```bash
# Compile contracts
npm run contracts:compile

# Test contracts
npm run contracts:test

# Deploy to Sepolia (testnet)
npm run contracts:deploy:sepolia

# Deploy to Mainnet
npm run contracts:deploy:mainnet
```

## Database
```bash
# Generate schema
npm run db:generate

# Push schema to database
npm run db:push

# Run migrations
npm run db:migrate

# Open database studio
npm run db:studio
```

## Testing
```bash
# Run unit tests
npm run test

# Watch mode
npm run test:watch

# E2E tests
npm run test:e2e
```

## Code Quality
```bash
# Lint code
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

## Installation Issues?

If you see npm peer dependency errors:
```bash
npm install --legacy-peer-deps
```

## All Systems Ready

✅ Web3 (Wagmi, RainbowKit, ethers, web3.js)
✅ Payments (Stripe, Coinbase)
✅ 3D Graphics (Three.js, React Three Fiber, Rapier)
✅ Smart Contracts (Hardhat, OpenZeppelin)
✅ Database (Drizzle ORM, SQLite, PostgreSQL)
✅ Authentication (NextAuth, JWT, bcrypt)
✅ UI (Tailwind, Shadcn, Radix)
✅ Form Handling (React Hook Form, Zod)
