export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'physical' | 'digital' | 'nft';
  stock: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Neural Interface',
    price: 0.5,
    image: '🧠',
    description: 'Advanced brain-computer interface for seamless connectivity with Web3 networks.',
    category: 'digital',
    stock: Infinity
  },
  {
    id: 2,
    name: 'Quantum Node',
    price: 0.75,
    image: '⚛️',
    description: 'Quantum computing node for distributed blockchain calculations and verification.',
    category: 'physical',
    stock: 50
  },
  {
    id: 3,
    name: 'AI NFT',
    price: 1.0,
    image: '🤖',
    description: 'Exclusive AI-generated collectible NFT with smart contract integration.',
    category: 'nft',
    stock: 100
  },
  {
    id: 4,
    name: 'API Access',
    price: 1.25,
    image: '🔌',
    description: 'Lifetime API access to all ZAYX services and future upgrades included.',
    category: 'digital',
    stock: Infinity
  },
  {
    id: 5,
    name: 'Hologram Kit',
    price: 1.5,
    image: '🎆',
    description: 'Complete holographic projection system with AR integration.',
    category: 'physical',
    stock: 25
  },
  {
    id: 6,
    name: 'Crypto Vault',
    price: 2.0,
    image: '🏆',
    description: 'Premium hardware wallet with military-grade encryption and multi-sig support.',
    category: 'physical',
    stock: 10
  }
];

export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getProductByName(name: string): Product | undefined {
  return PRODUCTS.find(p => p.name.toLowerCase() === name.toLowerCase());
}

export function searchProducts(query: string): Product[] {
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );
}

