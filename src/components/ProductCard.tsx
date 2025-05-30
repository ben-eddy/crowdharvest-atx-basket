
import React from 'react';
import { Slider } from '@/components/ui/slider';
import BeefCutsDiagram from './BeefCutsDiagram';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  maxMonthly: number;
  shareOptions?: { value: number; label: string; priceMultiplier: number }[];
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: string, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantity,
  onQuantityChange
}) => {
  const handleSliderChange = (values: number[]) => {
    onQuantityChange(product.id, values[0]);
  };

  // For beef shares, use the shareOptions
  const isBeefShare = product.shareOptions && product.shareOptions.length > 0;
  
  // If this is a beef share product, render the special beef diagram instead
  if (isBeefShare && product.shareOptions) {
    const shareInfo = product.shareOptions[quantity] || product.shareOptions[0];
    const shareFraction = {
      '1/40 share': 1/40,
      '1/30 share': 1/30,
      '1/20 share': 1/20,
      '1/15 share': 1/15,
      '1/10 share': 1/10,
      '1/8 share': 1/8,
      '1/6 share': 1/6,
      '1/4 share': 1/4
    }[shareInfo.label] || 0;

    return (
      <div className="w-full">
        <BeefCutsDiagram
          shareSize={shareInfo.label}
          shareFraction={shareFraction}
          onShareChange={(value) => onQuantityChange(product.id, value)}
          currentShareIndex={quantity}
          shareOptions={product.shareOptions}
          onAddToCart={() => {}} // Empty function since this is embedded
          isInCart={false} // Always false since this is just for display
        />
      </div>
    );
  }

  // Regular product card for non-beef products
  const displayPrice = product.price * quantity;
  const displayQuantity = `${quantity} ${product.unit}${quantity !== 1 ? 's' : ''}`;

  return (
    <div className="product-card bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden">
      {/* Simplified Hero Section */}
      <div className="relative h-32 bg-gradient-to-br from-green-50 to-blue-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-farm-green text-sm leading-tight">{product.name}</h3>
          <p className="text-xs text-farm-earth mt-1">{product.description}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="font-bold text-farm-green">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-xs text-farm-earth">
              per {product.unit}
            </p>
          </div>
        </div>

        {/* Quantity Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-farm-earth">Monthly Amount</span>
            <span className="text-sm font-medium text-farm-green">
              {displayQuantity}
            </span>
          </div>
          
          <Slider
            value={[quantity]}
            onValueChange={handleSliderChange}
            max={product.maxMonthly}
            min={0}
            step={1}
            className="w-full"
          />
          
          <div className="flex justify-between text-xs text-gray-400">
            <span>0</span>
            <span>{product.maxMonthly}</span>
          </div>
        </div>

        {/* Monthly Total */}
        {quantity > 0 && (
          <div className="text-center mt-3">
            <div className="text-sm font-medium text-farm-green bg-green-50 rounded px-2 py-1">
              Monthly: ${displayPrice.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
