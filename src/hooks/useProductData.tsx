
import { useState } from 'react';

// Define all product-related interfaces
interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface CategoryProgress {
  category: string;
  icon: string;
  currentAmount: number;
  targetAmount: number;
  unit: string;
  priceDropAmount: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  maxMonthly: number;
  shareOptions?: Array<{
    value: number;
    label: string;
    priceMultiplier: number;
  }>;
}

interface Farmer {
  id: string;
  name: string;
  location: string;
  description: string;
  specialties: string[];
  image: string;
  certifications: string[];
}

export const useProductData = () => {
  // Categories
  const [categories] = useState<Category[]>([
    { id: 'beef', name: 'Beef', icon: '🐄', count: 1 },
    { id: 'lamb', name: 'Lamb', icon: '🐑', count: 1 },
    { id: 'poultry', name: 'Poultry', icon: '🍗', count: 2 },
    { id: 'vegetables', name: 'Vegetables', icon: '🥕', count: 6 },
    { id: 'eggs', name: 'Eggs', icon: '🥚', count: 1 },
    { id: 'dairy', name: 'Dairy', icon: '🥛', count: 2 },
    { id: 'fruit', name: 'Fruit', icon: '🍑', count: 2 },
    { id: 'nuts', name: 'Nuts & Seeds', icon: '🥜', count: 4 },
    { id: 'bread', name: 'Bread', icon: '🍞', count: 2 },
    { id: 'honey', name: 'Honey', icon: '🍯', count: 2 }
  ]);

  // Category Progress
  const [categoryProgress] = useState<CategoryProgress[]>([
    {
      category: 'Beef',
      icon: '🐄',
      currentAmount: 78,
      targetAmount: 100,
      unit: 'animals',
      priceDropAmount: '1.25'
    },
    {
      category: 'Lamb',
      icon: '🐑',
      currentAmount: 16,
      targetAmount: 20,
      unit: 'animals',
      priceDropAmount: '2.00'
    },
    {
      category: 'Poultry',
      icon: '🍗',
      currentAmount: 120,
      targetAmount: 150,
      unit: 'birds',
      priceDropAmount: '1.50'
    },
    {
      category: 'Dairy',
      icon: '🥛',
      currentAmount: 45,
      targetAmount: 60,
      unit: 'gallons',
      priceDropAmount: '0.75'
    },
    {
      category: 'Vegetables',
      icon: '🥦',
      currentAmount: 180,
      targetAmount: 200,
      unit: 'boxes',
      priceDropAmount: '3.00'
    }
  ]);

  // Products
  const [products] = useState<Product[]>([
    // Beef - now using shares
    {
      id: 'beef-shares',
      name: 'Beef Shares',
      category: 'beef',
      description: 'Get your monthly share of whole grass-fed beef. Includes mix of cuts.',
      price: 14, // Changed to $14/lb base price
      unit: 'share',
      image: '/api/placeholder/300/200',
      maxMonthly: 7, // 0-7 index for share options
      shareOptions: [
        { value: 0, label: '1/40 share', priceMultiplier: 9 },      // 9 lbs * $14 = $126
        { value: 1, label: '1/30 share', priceMultiplier: 12 },     // 12 lbs * $14 = $168
        { value: 2, label: '1/20 share', priceMultiplier: 18 },     // 18 lbs * $14 = $252
        { value: 3, label: '1/15 share', priceMultiplier: 24 },     // 24 lbs * $14 = $336
        { value: 4, label: '1/10 share', priceMultiplier: 36 },     // 36 lbs * $14 = $504
        { value: 5, label: '1/8 share', priceMultiplier: 45 },      // 45 lbs * $14 = $630
        { value: 6, label: '1/6 share', priceMultiplier: 60 },      // 60 lbs * $14 = $840
        { value: 7, label: '1/4 share', priceMultiplier: 90 }       // 90 lbs * $14 = $1260
      ]
    },
    // Lamb - using shares with 1/8 minimum
    {
      id: 'lamb-shares',
      name: 'Lamb Shares',
      category: 'lamb',
      description: 'Get your monthly share of whole grass-fed lamb. Includes mix of cuts.',
      price: 18, // $18/lb base price for lamb
      unit: 'share',
      image: '/api/placeholder/300/200',
      maxMonthly: 4, // 0-4 index for share options
      shareOptions: [
        { value: 0, label: '1/8 share', priceMultiplier: 10 },      // 10 lbs * $18 = $180
        { value: 1, label: '1/6 share', priceMultiplier: 13 },      // 13 lbs * $18 = $234
        { value: 2, label: '1/4 share', priceMultiplier: 20 },      // 20 lbs * $18 = $360
        { value: 3, label: '1/3 share', priceMultiplier: 27 },      // 27 lbs * $18 = $486
        { value: 4, label: '1/2 share', priceMultiplier: 40 }       // 40 lbs * $18 = $720
      ]
    },
    // Poultry - chickens and turkeys
    {
      id: 'chickens',
      name: 'Chickens',
      category: 'poultry',
      description: 'Free-range chickens, whole or half birds',
      price: 20.00,
      unit: 'chicken',
      image: '/api/placeholder/300/200',
      maxMonthly: 12
    },
    {
      id: 'turkey-shares',
      name: 'Turkey Shares',
      category: 'poultry',
      description: 'Get your monthly share of heritage turkey. Perfect for special occasions.',
      price: 16, // $16/lb base price for turkey
      unit: 'share',
      image: '/api/placeholder/300/200',
      maxMonthly: 3, // 0-3 index for share options
      shareOptions: [
        { value: 0, label: '1/4 share', priceMultiplier: 6 },       // 6 lbs * $16 = $96
        { value: 1, label: '1/3 share', priceMultiplier: 8 },       // 8 lbs * $16 = $128
        { value: 2, label: '1/2 share', priceMultiplier: 12 },      // 12 lbs * $16 = $192
        { value: 3, label: 'whole turkey', priceMultiplier: 24 }    // 24 lbs * $16 = $384
      ]
    },
    // All remaining products
    {
      id: 'broccoli',
      name: 'Fresh Broccoli',
      category: 'vegetables',
      description: 'Crisp, green broccoli crowns',
      price: 3.99,
      unit: 'lb',
      image: '/api/placeholder/300/200',
      maxMonthly: 10
    },
    {
      id: 'beets',
      name: 'Red Beets',
      category: 'vegetables',
      description: 'Sweet, earthy red beets with greens',
      price: 2.99,
      unit: 'bunch',
      image: '/api/placeholder/300/200',
      maxMonthly: 8
    },
    {
      id: 'onions',
      name: 'Yellow Onions',
      category: 'vegetables',
      description: 'Storage onions perfect for cooking',
      price: 2.49,
      unit: 'lb',
      image: '/api/placeholder/300/200',
      maxMonthly: 15
    },
    {
      id: 'garlic',
      name: 'Fresh Garlic',
      category: 'vegetables',
      description: 'Aromatic hardneck garlic bulbs',
      price: 8.99,
      unit: 'lb',
      image: '/api/placeholder/300/200',
      maxMonthly: 5
    },
    {
      id: 'celery',
      name: 'Celery',
      category: 'vegetables',
      description: 'Crisp celery stalks with leaves',
      price: 2.99,
      unit: 'bunch',
      image: '/api/placeholder/300/200',
      maxMonthly: 6
    },
    {
      id: 'greens',
      name: 'Mixed Greens',
      category: 'vegetables',
      description: 'Seasonal mix of leafy greens and lettuce',
      price: 4.99,
      unit: 'bag',
      image: '/api/placeholder/300/200',
      maxMonthly: 12
    },
    {
      id: 'eggs',
      name: 'Farm Fresh Eggs',
      category: 'eggs',
      description: 'Pasture-raised eggs from happy hens',
      price: 10.00,
      unit: 'dozen',
      image: '/api/placeholder/300/200',
      maxMonthly: 20
    },
    {
      id: 'milk',
      name: 'Whole Milk',
      category: 'dairy',
      description: 'Fresh, non-homogenized whole milk',
      price: 14.00,
      unit: 'gallon',
      image: '/api/placeholder/300/200',
      maxMonthly: 10
    },
    {
      id: 'cheese',
      name: 'Artisan Cheese',
      category: 'dairy',
      description: 'Rotating selection of farmstead cheeses',
      price: 12.99,
      unit: '8oz block',
      image: '/api/placeholder/300/200',
      maxMonthly: 8
    },
    {
      id: 'peaches',
      name: 'Fresh Peaches',
      category: 'fruit',
      description: 'Sweet, juicy Texas peaches (seasonal)',
      price: 4.99,
      unit: 'lb',
      image: '/api/placeholder/300/200',
      maxMonthly: 15
    },
    {
      id: 'watermelon',
      name: 'Watermelons',
      category: 'fruit',
      description: 'Sweet, crisp watermelons (seasonal)',
      price: 8.99,
      unit: 'melon',
      image: '/api/placeholder/300/200',
      maxMonthly: 6
    },
    {
      id: 'pecans',
      name: 'Texas Pecans',
      category: 'nuts',
      description: 'Fresh, local pecans from Texas orchards',
      price: 14.99,
      unit: 'lb',
      image: '/api/placeholder/300/200',
      maxMonthly: 4
    },
    {
      id: 'walnuts',
      name: 'Texas Walnuts',
      category: 'nuts',
      description: 'Premium Texas walnuts, halves and pieces',
      price: 12.99,
      unit: 'lb',
      image: '/api/placeholder/300/200',
      maxMonthly: 4
    },
    {
      id: 'cashews',
      name: 'Raw Cashews',
      category: 'nuts',
      description: 'Whole raw cashews, perfect for snacking',
      price: 16.99,
      unit: 'lb',
      image: '/api/placeholder/300/200',
      maxMonthly: 3
    },
    {
      id: 'pecan-butter',
      name: 'Pecan Butter',
      category: 'nuts',
      description: 'Smooth, creamy pecan butter made from local pecans',
      price: 18.99,
      unit: 'jar',
      image: '/api/placeholder/300/200',
      maxMonthly: 3
    },
    {
      id: 'cracked-wheat',
      name: 'Cracked Wheat Bread',
      category: 'bread',
      description: 'Hearty, nutritious bread made with cracked wheat',
      price: 8.00,
      unit: 'loaf',
      image: '/api/placeholder/300/200',
      maxMonthly: 8
    },
    {
      id: 'sourdough',
      name: 'Sourdough Bread',
      category: 'bread',
      description: 'Traditional sourdough with tangy flavor and crisp crust',
      price: 12.00,
      unit: 'loaf',
      image: '/api/placeholder/300/200',
      maxMonthly: 8
    },
    {
      id: 'honey',
      name: 'Raw Honey',
      category: 'honey',
      description: 'Pure, unfiltered honey from local beehives',
      price: 12.99,
      unit: 'jar',
      image: '/api/placeholder/300/200',
      maxMonthly: 4
    },
    {
      id: 'bee-pollen',
      name: 'Bee Pollen',
      category: 'honey',
      description: 'Nutrient-rich bee pollen granules',
      price: 8.99,
      unit: '4oz container',
      image: '/api/placeholder/300/200',
      maxMonthly: 6
    }
  ]);

  // Farmers
  const [farmers] = useState<Farmer[]>([
    {
      id: 'circle-s',
      name: 'Circle S Ranch',
      location: 'Bastrop, TX',
      description: 'Family-owned ranch specializing in grass-fed beef. We rotate our cattle through native Texas pastures, ensuring the healthiest animals and most sustainable practices.',
      specialties: ['Grass-Fed Beef', 'Rotational Grazing', 'Hormone-Free'],
      image: '/api/placeholder/60/60',
      certifications: ['Certified Naturally Grown', 'Texas Organic']
    },
    {
      id: 'hill-country',
      name: 'Hill Country Poultry',
      location: 'Dripping Springs, TX',
      description: 'Raising heritage breed chickens on pasture with mobile coops. Our birds live natural lives with access to fresh grass and insects.',
      specialties: ['Heritage Breeds', 'Pasture-Raised', 'Mobile Coops'],
      image: '/api/placeholder/60/60',
      certifications: ['Animal Welfare Approved', 'Certified Humane']
    },
    {
      id: 'sunshine-dairy',
      name: 'Sunshine Dairy',
      location: 'Georgetown, TX',
      description: 'Small-scale dairy focusing on Jersey cows and artisan cheese making. Our cows graze on organic pastures year-round.',
      specialties: ['Jersey Cows', 'Artisan Cheese', 'Raw Milk'],
      image: '/api/placeholder/60/60',
      certifications: ['USDA Organic', 'Texas Department of Health']
    }
  ]);

  return {
    categories,
    categoryProgress,
    products,
    farmers
  };
};
