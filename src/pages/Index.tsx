import React, { useState } from 'react';
import Header from '@/components/Header';
import CategorySidebar from '@/components/CategorySidebar';
import ProductCard from '@/components/ProductCard';
import OrderSummary from '@/components/OrderSummary';
import CategoryProgressSlider from '@/components/CategoryProgressSlider';
import FarmerInfo from '@/components/FarmerInfo';
import Footer from '@/components/Footer';
import BeefCutsDiagram from '@/components/BeefCutsDiagram';

const Index = () => {
  // State management
  const [zipCode, setZipCode] = useState('78701');
  const [frequency, setFrequency] = useState('weekly');
  const [selectedCategory, setSelectedCategory] = useState('beef');
  const [pickupLocation, setPickupLocation] = useState('');
  
  // Separate state for cart (actual items added) and preview quantities (slider values)
  const [cart, setCart] = useState<{[productId: string]: { quantity: number }}>({});
  const [previewQuantities, setPreviewQuantities] = useState<{[productId: string]: number}>({});

  // Updated categories
  const categories = [
    { id: 'beef', name: 'Beef', icon: '🐄', count: 1 },
    { id: 'poultry', name: 'Poultry', icon: '🍗', count: 1 },
    { id: 'vegetables', name: 'Vegetables', icon: '🥕', count: 6 },
    { id: 'eggs', name: 'Eggs', icon: '🥚', count: 1 },
    { id: 'dairy', name: 'Dairy', icon: '🥛', count: 2 },
    { id: 'fruit', name: 'Fruit', icon: '🍑', count: 2 },
    { id: 'nuts', name: 'Nuts & Seeds', icon: '🥜', count: 4 },
    { id: 'bread', name: 'Bread', icon: '🍞', count: 2 },
    { id: 'honey', name: 'Honey', icon: '🍯', count: 2 }
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
    // Poultry - single chicken product
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
    // Vegetables
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
    // Eggs
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
    // Dairy
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
    },
    // Nuts & Seeds
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
    // Bread
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
    // Honey
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

  // Handle slider changes - only updates preview, not cart
  const handlePreviewQuantityChange = (productId: string, quantity: number) => {
    console.log(`Preview quantity change: ${productId} -> ${quantity}`);
    setPreviewQuantities(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  // Handle adding items to cart - this actually updates the cart
  const handleAddToCart = (productId: string) => {
    const previewQuantity = previewQuantities[productId] || 0;
    console.log(`Adding to cart: ${productId} with quantity ${previewQuantity}`);
    
    if (previewQuantity > 0) {
      setCart(prev => {
        const newCart = {
          ...prev,
          [productId]: { quantity: previewQuantity }
        };
        console.log(`New cart state:`, newCart);
        return newCart;
      });
    }
  };

  // Add function to handle adding beef share to cart
  const handleAddBeefToCart = () => {
    const beefShareQuantity = previewQuantities['beef-shares'] || 0;
    handleAddToCart('beef-shares');
  };

  // Create cart items for order summary
  const cartItems = Object.entries(cart)
    .filter(([_, item]) => item.quantity > 0)
    .map(([productId, item]) => {
      const product = products.find(p => p.id === productId)!;
      const isBeefShare = product.shareOptions && product.shareOptions.length > 0;
      
      let price = product.price;
      let size = product.unit;
      let quantity = item.quantity; // Use the actual cart quantity
      
      if (isBeefShare && product.shareOptions) {
        const shareInfo = product.shareOptions[item.quantity] || product.shareOptions[0];
        price = product.price * shareInfo.priceMultiplier;
        size = shareInfo.label;
        quantity = 1; // For shares, always show quantity as 1
      }
      
      return {
        productId,
        name: product.name,
        farm: 'Local Farm Collective',
        price: price,
        quantity: quantity, // Now uses the correct quantity
        size: size,
        unit: product.unit
      };
    });

  const nextBillingDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();

  // Find beef share product and current selection
  const beefShareProduct = products.find(p => p.id === 'beef-shares');
  const beefPreviewQuantity = previewQuantities['beef-shares'] || 0;
  const isBeefInCart = cart['beef-shares']?.quantity > 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header
        zipCode={zipCode}
        setZipCode={setZipCode}
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
          {/* Product Grid or Beef Diagram */}
          <div className="flex-1">
            {selectedCategory === 'beef' && beefShareProduct ? (
              // Full-page beef diagram
              <BeefCutsDiagram
                shareSize={beefShareProduct.shareOptions?.[beefPreviewQuantity]?.label || beefShareProduct.shareOptions?.[0]?.label || '1/40 share'}
                shareFraction={{
                  '1/40 share': 1/40,
                  '1/30 share': 1/30,
                  '1/20 share': 1/20,
                  '1/15 share': 1/15,
                  '1/10 share': 1/10,
                  '1/8 share': 1/8,
                  '1/6 share': 1/6,
                  '1/4 share': 1/4
                }[beefShareProduct.shareOptions?.[beefPreviewQuantity]?.label || '1/40 share'] || 1/40}
                onShareChange={(value) => handlePreviewQuantityChange('beef-shares', value)}
                currentShareIndex={beefPreviewQuantity}
                shareOptions={beefShareProduct.shareOptions || []}
                onAddToCart={handleAddBeefToCart}
                isInCart={isBeefInCart}
              />
            ) : (
              // Regular product grid for other categories
              <div className="p-6">
                {/* Products */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-farm-green mb-4">
                    Choose Your Monthly {categories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-farm-earth mb-6">
                    Use the sliders to select how much you'd like each month. You can adjust anytime.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        quantity={previewQuantities[product.id] || 0}
                        onQuantityChange={handlePreviewQuantityChange}
                        onAddToCart={() => handleAddToCart(product.id)}
                        isInCart={cart[product.id]?.quantity > 0}
                      />
                    ))}
                  </div>
                </div>

                {/* Farmer Information */}
                <FarmerInfo farmers={farmers} />
              </div>
            )}
          </div>

          {/* Order Summary */}
          <OrderSummary
            cartItems={cartItems}
            pickupLocation={pickupLocation}
            setPickupLocation={setPickupLocation}
            frequency={frequency}
            nextBillingDate={nextBillingDate}
          />
        </div>
      </div>

      {/* Community Buy Progress - above footer */}
      <div className="bg-white border-t border-green-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryProgressSlider categoryProgress={categoryProgress} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
