
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  featured: boolean;
  inventory: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Minimalist Desk Lamp",
    description: "A sleek, modern desk lamp with adjustable brightness and color temperature. Perfect for your home office or reading nook.",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    category: "home",
    featured: true,
    inventory: 15
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    description: "Designed for comfort during long work sessions, this chair offers lumbar support and breathable mesh material.",
    price: 249.99,
    imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
    category: "furniture",
    featured: true,
    inventory: 8
  },
  {
    id: 3,
    name: "Wireless Bluetooth Earbuds",
    description: "High-quality sound, water resistance, and long battery life make these perfect for workouts or daily use.",
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2570&q=80",
    category: "electronics",
    featured: true,
    inventory: 20
  },
  {
    id: 4,
    name: "Smart Home Speaker",
    description: "Voice-controlled speaker with integrated virtual assistant. Stream music, get answers, control your smart home, and more.",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1589003077984-89623feb26dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1664&q=80",
    category: "electronics",
    featured: false,
    inventory: 12
  },
  {
    id: 5,
    name: "Handcrafted Ceramic Planter",
    description: "Beautiful handmade planter for your favorite indoor plants. Each piece is unique with slight variations in glaze.",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80",
    category: "home",
    featured: true,
    inventory: 7
  },
  {
    id: 6,
    name: "Luxury Scented Candle",
    description: "Hand-poured soy wax candle with essential oil fragrance. Burns for up to 60 hours.",
    price: 45.99,
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    category: "home",
    featured: false,
    inventory: 25
  },
  {
    id: 7,
    name: "Premium Coffee Maker",
    description: "Programmable drip coffee maker with built-in grinder. Brew the perfect cup every morning.",
    price: 159.99,
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    category: "kitchen",
    featured: true,
    inventory: 10
  },
  {
    id: 8,
    name: "Bamboo Bath Towel Set",
    description: "Ultra-soft, absorbent bamboo towels. Set includes 2 bath towels, 2 hand towels, and 2 washcloths.",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1583917528427-d9c699280ab5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    category: "bath",
    featured: false,
    inventory: 18
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
