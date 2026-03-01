import { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'ZAYX-OS Hoodie',
    description: 'A comfortable and stylish hoodie featuring the ZAYX-OS logo.',
    price: 59.99,
    image: '/images/hoodie.jpg',
    category: 'physical',
  },
  {
    id: '2',
    name: 'ZAYX-OS T-Shirt',
    description: 'A classic t-shirt with the ZAYX-OS logo, made from 100% organic cotton.',
    price: 29.99,
    image: '/images/t-shirt.jpg',
    category: 'physical',
  },
  {
    id: '3',
    name: 'ZAYX-OS Cap',
    description: 'A stylish cap to show your support for the ZAYX-OS ecosystem.',
    price: 24.99,
    image: '/images/cap.jpg',
    category: 'physical',
  },
  {
    id: '4',
    name: 'ZAYX-OS Genesis NFT',
    description: 'A limited-edition NFT that grants you early access to new features and a vote in the DAO.',
    price: 150,
    image: '/images/genesis-nft.jpg',
    category: 'digital',
  },
  {
    id: '5',
    name: 'ZAYX-OS Digital Art',
    description: 'A unique piece of digital art from a featured artist in the ZAYX-OS community.',
    price: 75,
    image: '/images/digital-art.jpg',
    category: 'digital',
  },
];
