export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-white">ZAYX-OS</h1>
          <nav className="hidden sm:flex gap-4 sm:gap-6 text-sm sm:text-base text-slate-300">
            <a href="#products" className="hover:text-cyan-400">Products</a>
            <a href="#features" className="hover:text-cyan-400">Features</a>
          </nav>
          <button className="px-4 sm:px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 font-medium text-sm sm:text-base">
            Connect
          </button>
        </div>
      </header>

      <main>
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6">
              Web3 E-Commerce
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-8 sm:mb-12 max-w-3xl mx-auto">
              Decentralized marketplace for physical and digital products. Crypto payments, NFT receipts, DAO governance.
            </p>
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 font-bold text-sm sm:text-base transition">
              Launch App
            </button>
          </div>
        </section>

        <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <div className="p-6 sm:p-8 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition">
                <div className="text-4xl mb-4">💳</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Crypto Payments</h3>
                <p className="text-sm sm:text-base text-slate-400">ETH, USDC, USDT, DAI with instant settlement.</p>
              </div>
              <div className="p-6 sm:p-8 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition">
                <div className="text-4xl mb-4">🎫</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">NFT Receipts</h3>
                <p className="text-sm sm:text-base text-slate-400">Automatic ERC-721 minting for proof of purchase.</p>
              </div>
              <div className="p-6 sm:p-8 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition">
                <div className="text-4xl mb-4">🏛️</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">DAO Governance</h3>
                <p className="text-sm sm:text-base text-slate-400">Community voting and treasury control.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                { name: 'Neural Interface', price: 0.5 },
                { name: 'Quantum Node', price: 0.75 },
                { name: 'AI NFT', price: 1.0 },
                { name: 'API Access', price: 1.25 },
                { name: 'Hologram Kit', price: 1.5 },
                { name: 'Crypto Vault', price: 2.0 }
              ].map((product, i) => (
                <div key={i} className="rounded-lg bg-slate-800/30 border border-slate-700 p-4 sm:p-6 hover:border-cyan-500/50 transition">
                  <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg mb-4"></div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{product.name}</h3>
                  <p className="text-cyan-400 font-bold mt-2">{product.price} ETH</p>
                  <button className="mt-4 w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm sm:text-base rounded font-medium transition">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">Ready to Get Started?</h2>
            <p className="text-slate-400 mb-8 text-sm sm:text-base">Connect your wallet and join the Web3 commerce revolution.</p>
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-bold text-sm sm:text-base hover:shadow-lg hover:shadow-cyan-500/50 transition">
              Connect Now
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p className="text-sm sm:text-base">ZAYX-OS - Decentralized Commerce Platform</p>
          <p className="text-xs sm:text-sm mt-2">Web3 enabled. Community driven. Open source.</p>
        </div>
      </footer>
    </div>
  );
}
