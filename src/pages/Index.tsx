import React, { useState } from 'react';
import Header from '@/components/Header';
import CategorySidebar from '@/components/CategorySidebar';
import ProductCard from '@/components/ProductCard';
import OrderSummary from '@/components/OrderSummary';
import CategoryProgressSlider from '@/components/CategoryProgressSlider';
import FarmerInfo from '@/components/FarmerInfo';
import Footer from '@/components/Footer';

const Index = () => {
  // State management
  const [zipCode, setZipCode] = useState('78701');
  const [purchaseType, setPurchaseType] = useState<'single' | 'subscription'>('subscription');
  const [frequency, setFrequency] = useState('weekly');
  const [selectedCategory, setSelectedCategory] = useState('beef');
  const [pickupLocation, setPickupLocation] = useState('');
  
  // Simplified cart state - just quantity per product
  const [cart, setCart] = useState<{[productId: string]: { quantity: number }}>({});

  // Updated categories
  const categories = [
    { id: 'beef', name: 'Beef', icon: '🐄', count: 1 },
    { id: 'poultry', name: 'Poultry', icon: '🍗', count: 2 },
    { id: 'eggs', name: 'Eggs', icon: '🥚', count: 1 },
    { id: 'dairy', name: 'Dairy', icon: '🥛', count: 2 },
    { id: 'fruit', name: 'Fruit', icon: '🍑', count: 2 }
  ];

  // Mock data for category progress - now tracking whole animals
  const categoryProgress = [
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
  ];

  // Updated products with beef shares and monthly focus
  const products = [
    // Beef - now using shares
    {
      id: 'beef-shares',
      name: 'Beef Shares',
      category: 'beef',
      description: 'Get your monthly share of whole grass-fed beef. Includes mix of cuts.',
      price: 200, // Base price for 1/40 share
      unit: 'share',
      image: '/api/placeholder/300/200',
      maxMonthly: 7, // 0-7 index for share options
      shareOptions: [
        { value: 0, label: '1/40 share', priceMultiplier: 1 },      // $200
        { value: 1, label: '1/30 share', priceMultiplier: 1.33 },   // $266
        { value: 2, label: '1/20 share', priceMultiplier: 2 },      // $400
        { value: 3, label: '1/15 share', priceMultiplier: 2.67 },   // $534
        { value: 4, label: '1/10 share', priceMultiplier: 4 },      // $800
        { value: 5, label: '1/8 share', priceMultiplier: 5 },       // $1000
        { value: 6, label: '1/6 share', priceMultiplier: 6.67 },    // $1334
        { value: 7, label: '1/4 share', priceMultiplier: 10 }       // $2000
      ]
    },
    // Poultry
    {
      id: 'whole-chicken',
      name: 'Whole Chickens',
      category: 'poultry',
      description: 'Free-range whole chickens, 3-4 lbs each',
      price: 6.99,
      unit: 'chicken',
      image: '/api/placeholder/300/200',
      maxMonthly: 8
    },
    {
      id: 'half-chicken',
      name: 'Half Chickens',
      category: 'poultry',
      description: 'Split chickens, perfect for grilling',
      price: 3.99,
      unit: 'half',
      image: '/api/placeholder/300/200',
      maxMonthly: 12
    },
    // Eggs
    {
      id: 'eggs',
      name: 'Farm Fresh Eggs',
      category: 'eggs',
      description: 'Pasture-raised eggs from happy hens',
      price: 4.99,
      unit: 'dozen',
      image: '/api/placeholder/300/200',
      maxMonthly: 20
    },
    // Dairy
    {
      id: 'milk',
      name: 'Whole Milk',
      category: 'dairy',
      description: 'Fresh, non-homogenized whole milk',
      price: 6.99,
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
    // Fruit
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
    }
  ];

  // Farmers data
  const farmers = [
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
  ];

  // Filter products by category
  const filteredProducts = products.filter(product => product.category === selectedCategory);

  // Simplified cart functions
  const handleQuantityChange = (productId: string, quantity: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: { quantity: quantity }
    }));
  };

  // Create cart items for order summary
  const cartItems = Object.entries(cart)
    .filter(([_, item]) => item.quantity > 0)
    .map(([productId, item]) => {
      const product = products.find(p => p.id === productId)!;
      const isBeefShare = product.shareOptions && product.shareOptions.length > 0;
      
      let price = product.price;
      let size = product.unit;
      
      if (isBeefShare && product.shareOptions) {
        const shareInfo = product.shareOptions[item.quantity] || product.shareOptions[0];
        price = product.price * shareInfo.priceMultiplier;
        size = shareInfo.label;
      }
      
      return {
        productId,
        name: product.name,
        farm: 'Local Farm Collective',
        price: price,
        quantity: 1, // Always 1 for shares, or actual quantity for others
        size: size,
        unit: product.unit
      };
    });

  const nextBillingDate = purchaseType === 'subscription' 
    ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    : undefined;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header
        zipCode={zipCode}
        setZipCode={setZipCode}
        purchaseType={purchaseType}
        setPurchaseType={setPurchaseType}
        frequency={frequency}
        setFrequency={setFrequency}
      />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Product Grid */}
          <div className="flex-1 p-6">
            {/* Category Progress Slider */}
            <CategoryProgressSlider categoryProgress={categoryProgress} />

            {/* Products */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-farm-green mb-4">
                Choose Your Monthly {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-farm-earth mb-6">
                {selectedCategory === 'beef' 
                  ? 'Select your monthly beef share. Each share includes a variety of cuts from grass-fed local cattle.'
                  : 'Use the sliders to select how much you\'d like each month. You can adjust anytime.'
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={cart[product.id]?.quantity || 0}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
            </div>

            {/* Farmer Information */}
            <FarmerInfo farmers={farmers} />
          </div>

          {/* Order Summary */}
          <OrderSummary
            cartItems={cartItems}
            pickupLocation={pickupLocation}
            setPickupLocation={setPickupLocation}
            purchaseType={purchaseType}
            frequency={frequency}
            nextBillingDate={nextBillingDate}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
