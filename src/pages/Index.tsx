import React, { useState } from 'react';
import Header from '@/components/Header';
import CategorySidebar from '@/components/CategorySidebar';
import ProductCard from '@/components/ProductCard';
import OrderSummary from '@/components/OrderSummary';
import CategoryProgressSlider from '@/components/CategoryProgressSlider';
import Footer from '@/components/Footer';

const Index = () => {
  // State management
  const [zipCode, setZipCode] = useState('78701');
  const [purchaseType, setPurchaseType] = useState<'single' | 'subscription'>('subscription');
  const [frequency, setFrequency] = useState('weekly');
  const [selectedCategory, setSelectedCategory] = useState('beef');
  const [pickupLocation, setPickupLocation] = useState('');
  
  // Cart state
  const [cart, setCart] = useState<{[productId: string]: { quantity: number; size: string }}>({});

  // Mock data
  const categories = [
    { id: 'beef', name: 'Beef', icon: '🐄', count: 12 },
    { id: 'lamb', name: 'Lamb', icon: '🐑', count: 8 },
    { id: 'poultry', name: 'Poultry', icon: '🍗', count: 15 },
    { id: 'eggs', name: 'Eggs', icon: '🥚', count: 6 },
    { id: 'dairy', name: 'Dairy', icon: '🥛', count: 10 },
    { id: 'vegetables', name: 'Vegetables', icon: '🥦', count: 25 },
    { id: 'fruit', name: 'Fruit', icon: '🍑', count: 18 }
  ];

  // Mock data for category progress
  const categoryProgress = [
    {
      category: 'Beef',
      icon: '🐄',
      currentAmount: 312,
      targetAmount: 400,
      unit: 'lbs',
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

  const products = [
    {
      id: 'grass-fed-ribeye',
      name: 'Grass-Fed Ribeye Steak',
      farm: 'Circle S Ranch',
      location: 'Bastrop, TX',
      description: 'Premium grass-finished ribeye from cattle raised on native Texas pastures.',
      price: 24.99,
      unit: 'lb',
      image: '/api/placeholder/300/200',
      badges: ['Grass-Fed', 'Local', 'Hormone-Free'],
      sizes: ['8 oz', '12 oz', '16 oz']
    },
    {
      id: 'ground-beef',
      name: 'Ground Beef 85/15',
      farm: 'Circle S Ranch',
      location: 'Bastrop, TX',
      description: 'Fresh ground beef from grass-fed cattle, perfect for burgers and tacos.',
      price: 8.99,
      unit: 'lb',
      image: '/api/placeholder/300/200',
      badges: ['Grass-Fed', 'Fresh Ground'],
      sizes: ['1 lb', '2 lb', '5 lb']
    },
    {
      id: 'ny-strip',
      name: 'New York Strip',
      farm: 'Hill Country Beef',
      location: 'Dripping Springs, TX',
      description: 'Tender, well-marbled steaks cut fresh from grass-finished beef.',
      price: 19.99,
      unit: 'lb',
      image: '/api/placeholder/300/200',
      badges: ['Grass-Finished', 'Cut Fresh'],
      sizes: ['8 oz', '10 oz', '12 oz']
    },
    {
      id: 'brisket',
      name: 'Whole Packer Brisket',
      farm: 'Austin BBQ Farms',
      location: 'Lockhart, TX',
      description: 'Whole packer brisket perfect for your next BBQ gathering.',
      price: 6.99,
      unit: 'lb',
      image: '/api/placeholder/300/200',
      badges: ['BBQ Ready', 'Whole Cut'],
      sizes: ['10-12 lbs', '12-15 lbs', '15-18 lbs']
    }
  ];

  // Filter products by category
  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'beef') return true; // For demo, showing all as beef
    return false;
  });

  // Cart functions
  const handleQuantityChange = (productId: string, quantity: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantity: quantity,
        size: prev[productId]?.size || filteredProducts.find(p => p.id === productId)?.sizes[0] || ''
      }
    }));
  };

  const handleSizeChange = (productId: string, size: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        size: size,
        quantity: prev[productId]?.quantity || 0
      }
    }));
  };

  // Create cart items for order summary
  const cartItems = Object.entries(cart)
    .filter(([_, item]) => item.quantity > 0)
    .map(([productId, item]) => {
      const product = products.find(p => p.id === productId)!;
      return {
        productId,
        name: product.name,
        farm: product.farm,
        price: product.price,
        quantity: item.quantity,
        size: item.size,
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
                {categories.find(c => c.id === selectedCategory)?.name} Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={cart[product.id]?.quantity || 0}
                    selectedSize={cart[product.id]?.size || product.sizes[0]}
                    onQuantityChange={handleQuantityChange}
                    onSizeChange={handleSizeChange}
                  />
                ))}
              </div>
            </div>
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
