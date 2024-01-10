export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
  rating: number;
  reviews: number;
  description: string;
}

export interface ResponseProductData {
  products: Product[];
}

export const data: ResponseProductData = {
  products: [
    {
      id: 1,
      name: "Pikachu",
      image: "/images/pikachu.webp",
      price: 120,
      stock: 3,
      rating: 4.2,
      reviews: 8,
      description: "First pokemon!",
    },
    {
      id: 2,
      name: "Dragon",
      image: "/images/dragon.webp",
      price: 120,
      stock: 10,
      rating: 4.3,
      reviews: 10,
      description: "Second pokemon!",
    },
    {
      id: 3,
      name: "Frog",
      image: "/images/frog.webp",
      price: 120,
      stock: 14,
      rating: 4.7,
      reviews: 16,
      description: "Third pokemon!",
    },
    {
      id: 4,
      name: "Squirtle",
      image: "/images/squirtle.webp",
      price: 120,
      stock: 9,
      rating: 4.8,
      reviews: 8,
      description: "Fourth pokemon!",
    },
  ],
};
