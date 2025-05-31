import React, { useState } from 'react';
import Header from '@/components/Header';
import CategorySidebar from '@/components/CategorySidebar';
import OrderSummary from '@/components/OrderSummary';
import MobileCartButton from '@/components/MobileCartButton';
import CategoryProgressSlider from '@/components/CategoryProgressSlider';
import Footer from '@/components/Footer';
import HowItWorks from '@/components/HowItWorks';
import CategoryContent from '@/components/CategoryContent';
import ReferralDashboard from '@/components/ReferralDashboard';
import { ReferralProvider } from '@/contexts/ReferralContext';
import { useProductData } from '@/hooks/useProductData';

const Index = () => {
  // State management
  const [frequency, setFrequency] = useState('weekly');
  const [city, setCity] = useState('Austin');
  const [selectedCategory, setSelectedCategory] = useState('beef');
  const [pickupLocation, setPickupLocation] = useState('');
  
  // Separate state for cart (actual items added) and preview quantities (slider values)
  const [cart, setCart] = useState<{[productId: string]: { quantity: number }}>({});
  const [previewQuantities, setPreviewQuantities] = useState<{[productId: string]: number}>({});

  // Get product data from custom hook
  const { categories, categoryProgress, products, farmers } = useProductData();

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
    handleAddToCart('beef-shares');
  };

  // Add function to handle adding lamb share to cart
  const handleAddLambToCart = () => {
    handleAddToCart('lamb-shares');
  };

  // Create cart items for order summary
  const cartItems = Object.entries(cart)
    .filter(([_, item]) => item.quantity > 0)
    .map(([productId, item]) => {
      const product = products.find(p => p.id === productId)!;
      const isShare = product.shareOptions && product.shareOptions.length > 0;
      
      let price = product.price;
      let size = product.unit;
      let quantity = item.quantity;
      
      if (isShare && product.shareOptions) {
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
        quantity: quantity,
        size: size,
        unit: product.unit
      };
    });

  const nextBillingDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <ReferralProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <Header
          frequency={frequency}
          setFrequency={setFrequency}
          city={city}
          setCity={setCity}
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
            {/* Product Grid or Categories Content */}
            <div className="flex-1">
              <CategoryContent 
                selectedCategory={selectedCategory}
                products={products}
                farmers={farmers}
                categories={categories}
                previewQuantities={previewQuantities}
                cart={cart}
                onPreviewQuantityChange={handlePreviewQuantityChange}
                onAddToCart={handleAddToCart}
                onAddBeefToCart={handleAddBeefToCart}
                onAddLambToCart={handleAddLambToCart}
              />
            </div>

            {/* Order Summary - hidden on mobile */}
            <OrderSummary
              cartItems={cartItems}
              pickupLocation={pickupLocation}
              setPickupLocation={setPickupLocation}
              frequency={frequency}
              nextBillingDate={nextBillingDate}
            />
          </div>
        </div>

        {/* Mobile Cart Button - only shows on mobile */}
        <MobileCartButton
          cartItems={cartItems}
          pickupLocation={pickupLocation}
          setPickupLocation={setPickupLocation}
          frequency={frequency}
          nextBillingDate={nextBillingDate}
        />

        {/* Community Buy Progress - above How It Works */}
        <div className="bg-white border-t border-green-100 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CategoryProgressSlider categoryProgress={categoryProgress} />
          </div>
        </div>

        {/* Referral Section */}
        <div className="bg-green-50 border-t border-green-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ReferralDashboard />
          </div>
        </div>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Footer */}
        <Footer />
      </div>
    </ReferralProvider>
  );
};

export default Index;
