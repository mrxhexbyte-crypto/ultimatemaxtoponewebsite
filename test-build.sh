#!/bin/bash

echo "========================================"
echo "ZAYX-OS Build Test Script"
echo "========================================"

echo ""
echo "[1/4] Checking Node version..."
node --version
npm --version

echo ""
echo "[2/4] Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi

echo ""
echo "[3/4] Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "[4/4] Build successful!"
echo "========================================"
echo "✅ All checks passed!"
echo "========================================"
echo ""
echo "To run development server:"
echo "  npm run dev"
echo ""
echo "To start production server:"
echo "  npm start"
