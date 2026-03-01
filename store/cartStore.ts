export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  priceEth: number;
  priceUsd: number;
  type: 'physical' | 'digital' | 'nft';
  image: string;
  stock: number | Infinity;
}

export interface CartItem extends Product {
  quantity: number;
}

// Simple in-memory cart store - use useState in components instead
export const createCartFunctions = () => {
  const addToCart = (items: CartItem[], product: Product): CartItem[] => {
    const existingItem = items.find((item) => item.id === product.id);
    if (existingItem) {
      return items.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...items, { ...product, quantity: 1 }];
  };

  const removeFromCart = (items: CartItem[], productId: number): CartItem[] => {
    return items.filter((item) => item.id !== productId);
  };

  const clearCart = (): CartItem[] => [];

  const totalItems = (items: CartItem[]): number =>
    items.reduce((total, item) => total + item.quantity, 0);

  const totalPriceUsd = (items: CartItem[]): number =>
    items.reduce((total, item) => total + item.priceUsd * item.quantity, 0);

  return { addToCart, removeFromCart, clearCart, totalItems, totalPriceUsd };
};

