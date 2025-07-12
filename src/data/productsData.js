// src/data/productsData.js

import jeansImg from '../assets/products/jeans.jpg';
import shirtImg from '../assets/products/shirt.jpg';
import tshirtImg from '../assets/products/tshirt.jpg';
import jacketImg from '../assets/products/jacket.jpg';
import sneakersImg from '../assets/products/sneakers.jpg';

export const productsData = [
  {
    _id: '1',
    name: 'Classic Blue Jeans',
    image: jeansImg,
    category: 'Jeans',
    price: 1499,
    description: 'Durable and stylish jeans for everyday wear.',
    features: ['Denim Fabric', 'Slim Fit', 'Machine Washable'],
  },
  {
    _id: '2',
    name: 'Casual Cotton Shirt',
    image: shirtImg,
    category: 'Shirts',
    price: 999,
    description: 'Breathable cotton shirt perfect for summer.',
    features: ['100% Cotton', 'Button Down', 'Comfort Fit'],
  },
  {
    _id: '3',
    name: 'Graphic T-Shirt',
    image: tshirtImg,
    category: 'T-Shirts',
    price: 799,
    description: 'Trendy graphic tee for casual style.',
    features: ['Soft Fabric', 'Printed Design', 'Unisex'],
  },
  {
    _id: '4',
    name: 'Denim Jacket',
    image: jacketImg,
    category: 'Jackets',
    price: 1999,
    description: 'Classic denim jacket for all seasons.',
    features: ['Multiple Pockets', 'Button Closure', 'Washed Denim'],
  },
  {
    _id: '5',
    name: 'Stylish Sneakers',
    image: sneakersImg,
    category: 'Shoes',
    price: 2499,
    description: 'Comfortable sneakers with a modern look.',
    features: ['Anti-slip Sole', 'Breathable Design', 'Cushioned Insole'],
  },
];
