export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  specs: string[];
  sizes: string[];
  type: string;
  tag?: string;
}

export const cleatsData: Product[] = [
  {
    id: 1,
    name: "Nike Mercurial Vapor 16 Club",
    price: 149.99,
    type: "Artificial grass",
    tag: "Childish",
    description: "Engineered for ultimate speed on Firm Ground. Featuring a 360-degree lightweight Flyknit upper and an aggressive chevron stud pattern.",
    image: "/images/cleats/cleat1.jpeg",
    specs: ["Ultra-Lightweight", "Carbon Plate", "Multi-Ground Grip", "Reinforced Toe"],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11", "12"]
  },
  {
    id: 2,
    name: "Adidas Predator Essentials 25",
    price: 139.99,
    type: "Futsal",
    tag: "Childish",
    description: "Engineered for ultimate speed on Firm Ground. Featuring a 360-degree lightweight Flyknit upper and an aggressive chevron stud pattern.",
    image: "/images/cleats/cleat2.jpeg",
    specs: ["Ultra-Lightweight", "Carbon Plate", "Multi-Ground Grip", "Reinforced Toe"],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11", "12"]
  },
  {
    id: 3,
    name: "Nike Mercurial Vapor 12 Pro",
    price: 249.99,
    type: "Artificial grass",
    tag: "Adult",
    description: "Engineered for ultimate speed on Firm Ground. Featuring a 360-degree lightweight Flyknit upper and an aggressive chevron stud pattern.",
    image: "/images/cleats/cleat3.jpeg",
    specs: ["Ultra-Lightweight", "Carbon Plate", "Multi-Ground Grip", "Reinforced Toe"],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11", "12"]
  },
  {
    id: 4,
    name: "Nike Mercurial Vapor 15 Academy",
    price: 149.99,
    type: "Artificial grass",
    tag: "Childish",
    description: "Engineered for ultimate speed on Firm Ground. Featuring a 360-degree lightweight Flyknit upper and an aggressive chevron stud pattern.",
    image: "/images/cleats/cleat4.jpeg",
    specs: ["Ultra-Lightweight", "Carbon Plate", "Multi-Ground Grip", "Reinforced Toe"],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11", "12"]
  },
  { 
    id: 5,
    name: "Puma Future 8",
    price: 129.99,
    type: "Futsal",
    tag: "Childish",
    description: "Engineered for ultimate speed on Firm Ground. Featuring a 360-degree lightweight Flyknit upper and an aggressive chevron stud pattern.",
    image: "/images/cleats/cleat5.jpeg",
    specs: ["Ultra-Lightweight", "Carbon Plate", "Multi-Ground Grip", "Reinforced Toe"],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11", "12"]
  },
  {
    id: 6,
    name: "Nike Air Zoom Mercurial Vapor 16 Elite",
    price: 349.99,
    type: "Natural grass",
    tag: "Adult",
    description: "Engineered for ultimate speed on Firm Ground. Featuring a 360-degree lightweight Flyknit upper and an aggressive chevron stud pattern.",
    image: "/images/cleats/cleat6.jpeg",
    specs: ["Ultra-Lightweight", "Carbon Plate", "Multi-Ground Grip", "Reinforced Toe"],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11", "12"]
  },
  {
    id: 7,
    name: "Nike Air Zoom Mercurial Vapor 16",
    price: 349.99,
    type: "Natural grass",
    tag: "Adult",
    description: "Engineered for ultimate speed on Firm Ground. Featuring a 360-degree lightweight Flyknit upper and an aggressive chevron stud pattern.",
    image: "/images/cleats/cleat7.jpeg",
    specs: ["Ultra-Lightweight", "Carbon Plate", "Multi-Ground Grip", "Reinforced Toe"],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11", "12"]
  },
  {
    id: 8,
    name: "Nike Mercurial Vapor 12 Pro",
    price: 249.99,
    type: "Artificial grass",
    tag: "Adult",
    description: "Engineered for ultimate speed on Firm Ground. Featuring a 360-degree lightweight Flyknit upper and an aggressive chevron stud pattern.",
    image: "/images/cleats/cleat8.jpeg",
    specs: ["Ultra-Lightweight", "Carbon Plate", "Multi-Ground Grip", "Reinforced Toe"],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11", "12"]
  },
  {
    id: 9,
    name: "Adidas F50 Elite FG Campo",
    price: 199.99,
    type: "Natural grass",
    tag: "Adult",
    description: "Engineered for ultimate speed on Firm Ground. Featuring a 360-degree lightweight Flyknit upper and an aggressive chevron stud pattern.",
    image: "/images/cleats/cleat9.jpeg",
    specs: ["Ultra-Lightweight", "Carbon Plate", "Multi-Ground Grip", "Reinforced Toe"],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11", "12"]
  },
  {
    id: 10,
    name: "Adidas F50 Elite FG",
    price: 199.99,
    type: "Artificial grass",
    tag: "Adult",
    description: "Engineered for ultimate speed on Firm Ground. Featuring a 360-degree lightweight Flyknit upper and an aggressive chevron stud pattern.",
    image: "/images/cleats/cleat10.jpeg",
    specs: ["Ultra-Lightweight", "Carbon Plate", "Multi-Ground Grip", "Reinforced Toe"],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11", "12"]
  },
  {
    id: 11,
    name: "Puma Ultra 4.3 IT",
    price: 179.99,
    type: "Futsal",
    tag: "Adult",
    description: "Engineered for ultimate speed on Firm Ground. Featuring a 360-degree lightweight Flyknit upper and an aggressive chevron stud pattern.",
    image: "/images/cleats/cleat11.jpeg",
    specs: ["Ultra-Lightweight", "Carbon Plate", "Multi-Ground Grip", "Reinforced Toe"],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11", "12"]
  },
  {
    id: 12,
    name: "Nike Zoom Mercurial Vapor 16 Elite",
    price: 249.99,
    type: "Artificial grass",
    tag: "Childish",
    description: "Engineered for ultimate speed on Firm Ground. Featuring a 360-degree lightweight Flyknit upper and an aggressive chevron stud pattern.",
    image: "/images/cleats/cleat12.jpeg",
    specs: ["Ultra-Lightweight", "Carbon Plate", "Multi-Ground Grip", "Reinforced Toe"],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11", "12"]
  },
];