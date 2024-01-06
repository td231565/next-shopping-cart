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
      image: "/images/pikachu.png",
      price: 120,
      stock: 3,
      rating: 5,
      reviews: 8,
      description: "First pokemon!",
    },
    {
      id: 2,
      name: "Dragon",
      image: "/images/dragon.png",
      price: 120,
      stock: 10,
      rating: 4,
      reviews: 10,
      description: "Second pokemon!",
    },
    {
      id: 3,
      name: "Frog",
      image: "/images/frog.png",
      price: 120,
      stock: 14,
      rating: 4.2,
      reviews: 16,
      description: "Third pokemon!",
    },
    {
      id: 4,
      name: "Turtle",
      image: "/images/turtle.jpg",
      price: 120,
      stock: 9,
      rating: 3.8,
      reviews: 8,
      description: "Fourth pokemon!",
    },
  ],
};
