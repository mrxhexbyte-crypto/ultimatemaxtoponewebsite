# ZAYX-OS Debug & Diagnostic Guide

## Quick Fixes Applied

### 1. Package.json Issues
- ✅ Removed duplicate `typescript` declaration
- ✅ Updated `@stripe/react-stripe-js@2.9.0` (React 18 compatible)
- ✅ Fixed `@coinbase/onchainkit@0.29.5` (stable React 18)
- ✅ Updated `@react-three/fiber@9.0.4` (compatible with rapier v2.2.0)
- ✅ Created `.npmrc` for peer dependency handling

### 2. Dependency Conflicts Resolved

| Package | Issue | Fix |
|---------|-------|-----|
| @stripe/react-stripe-js | Peer conflict with React 18 | Updated to v2.9.0 |
| @coinbase/onchainkit | Requires React 18 | Updated to v0.29.5 |
| @react-three/rapier | Requires fiber v9.0.4+ | Fiber updated to v9.0.4 |
| typescript | Duplicate declaration | Removed from dependencies |

## Installation Instructions

### Step 1: Clean Install
```bash
rm -rf node_modules package-lock.json
npm install
```

### Step 2: Verify Installation
```bash
npm list react
npm list @stripe/react-stripe-js
npm list @coinbase/onchainkit
npm list @react-three/fiber
```

### Step 3: Build Test
```bash
npm run build
```

### Step 4: Development Server
```bash
npm run dev
# Open http://localhost:3000
```

## Common Issues & Solutions

### Issue: "Expected double-quoted property name in JSON"
**Cause**: Duplicate or malformed package.json entries
**Solution**: Already fixed - run `npm install` again

### Issue: "ERESOLVE unable to resolve dependency tree"
**Cause**: Peer dependency conflicts
**Solution**: `.npmrc` with `legacy-peer-deps=true` is now in place

### Issue: "Invalid tag name" for three.js
**Cause**: Used `^r158` instead of `0.158.0`
**Solution**: Already fixed in package.json

### Issue: React 19 Conflicts
**Cause**: Some packages don't support React 19
**Solution**: Already on React 18.3.1 (compatible with all packages)

## Testing Commands

```bash
# Check for missing dependencies
npm ls

# Verify React version
npm list react

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Start dev server
npm run dev

# Run tests
npm test
```

## Port Configuration

- Development: http://localhost:3000 (configurable via `npm run dev -- -p PORT`)
- Production: http://localhost:3000 (via `npm start`)

## Database Setup

The app uses SQLite for development:
- Database file: `dev.db` (created automatically)
- Migrations: `npm run db:push`
- Seed data: Manual seeding needed

## Smart Contracts

```bash
# Compile contracts
npm run contracts:compile

# Deploy to Sepolia testnet
npm run contracts:deploy:sepolia

# Verify on etherscan
npm run contracts:verify
```

## Deployment Checklist

- [ ] `npm install` successful
- [ ] `npm run build` passes
- [ ] `npm run dev` starts without errors
- [ ] http://localhost:3000 loads
- [ ] Environment variables in .env.local
- [ ] Database migrations run
- [ ] Smart contracts compiled

## Emergency Reset

If all else fails:
```bash
rm -rf node_modules package-lock.json .next
npm cache clean --force
npm install
npm run build
npm run dev
```

## Need Help?

Check the following files:
- `READY_TO_RUN.md` - Quick start guide
- `LAUNCH_CHECKLIST.md` - Pre-deployment checklist
- `.npmrc` - NPM configuration
- `next.config.js` - Next.js configuration

