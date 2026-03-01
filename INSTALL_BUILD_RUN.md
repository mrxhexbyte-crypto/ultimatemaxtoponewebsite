# Install, Build & Run - Your ZAYX-OS Website

## 3-Step Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

**What happens**: npm downloads all 120+ dependencies including React 18, Web3 libraries, Stripe, Coinbase, smart contract tools, and UI components.

### Step 2: Start Development
```bash
npm run dev
```

**What happens**: Next.js starts a development server on port 3000 with hot reload.

### Step 3: Open in Browser
```
http://localhost:3000
```

You should see the ZAYX-OS homepage with:
- Cosmic dark theme
- Hero section with gradient effects
- Features showcase (Crypto Payments, NFT Receipts, DAO)
- Product grid
- Call-to-action buttons

## Additional Commands

### Build for Production
```bash
npm run build
npm start
```

### Run Tests
```bash
npm test          # Unit tests
npm test:watch    # Watch mode
npm test:e2e      # End-to-end tests
```

### Smart Contracts
```bash
npm run contracts:compile        # Compile Solidity
npm run contracts:test           # Run contract tests
npm run contracts:deploy:sepolia # Deploy to Sepolia testnet
```

### Database
```bash
npm run db:generate    # Generate migrations
npm run db:push        # Apply migrations
npm run db:migrate     # Run migrations
npm run db:studio      # Open Drizzle Studio
```

### Linting & Formatting
```bash
npm run lint           # Check for linting errors
npm run format         # Auto-format code
npm run type-check     # TypeScript type checking
```

## What's Included

✅ **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
✅ **UI Components**: Shadcn UI with Radix UI primitives
✅ **Web3**: Wagmi, ethers.js, RainbowKit wallet integration
✅ **Payments**: Stripe + Coinbase Commerce
✅ **Smart Contracts**: Solidity contracts + Hardhat
✅ **3D Graphics**: Three.js with React Three Fiber
✅ **Database**: Drizzle ORM with SQLite/PostgreSQL
✅ **State Management**: Zustand + React Query
✅ **Forms**: React Hook Form + Zod validation
✅ **AI**: OpenAI integration
✅ **IPFS**: Pinata integration for file storage

## Common Issues & Solutions

### "npm ERR! Could not resolve dependency tree"
**Solution**: All dependencies are now compatible. Run:
```bash
npm install --legacy-peer-deps
```

### "Port 3000 already in use"
**Solution**: Use a different port:
```bash
npm run dev -- -p 3001
```

### "Module not found errors"
**Solution**: Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Environment Variables

Create a `.env.local` file:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ALCHEMY_API_KEY=your_key_here
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_id_here
DATABASE_URL=file:./dev.db
STRIPE_SECRET_KEY=sk_test_...
```

See `.env.example` for all available variables.

## Deployment

### Deploy to Vercel
```bash
npm run deploy
```

Or connect your GitHub repo to Vercel for auto-deployment.

### Deploy to Other Platforms

**Docker**:
```bash
docker build -t zayx-os .
docker run -p 3000:3000 zayx-os
```

**Standalone Server**:
```bash
npm run build
npm start
```

## Troubleshooting

| Error | Solution |
|-------|----------|
| `ETARGET no matching version` | Fixed - all versions are now compatible |
| `ERESOLVE unable to resolve dependency` | Fixed - React 18.3.1 works with all packages |
| `Port 3000 in use` | Use `npm run dev -- -p 3001` |
| `Database connection failed` | Check DATABASE_URL in .env.local |

## Support

- **Docs**: See ARCHITECTURE.md, WEB3_INTEGRATION_SUMMARY.md, QUICKSTART.md
- **Issues**: Check GitHub issues or create a new one
- **Smart Contracts**: See contracts/ folder
- **API**: See app/api/ folder

---

**Your website is ready! Start with: `npm install && npm run dev`**
