
import React from 'react';
import { Minus, Plus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CommunityProgressBar from './CommunityProgressBar';

interface Product {
  id: string;
  name: string;
  farm: string;
  location: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  badges: string[];
  sizes: string[];
  communityBuy?: {
    animal: string;
    currentAmount: number;
    targetAmount: number;
    unit: string;
    priceDropAmount: string;
    currentPrice: number;
    targetPrice: number;
  };
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  selectedSize: string;
  onQuantityChange: (productId: string, quantity: number) => void;
  onSizeChange: (productId: string, size: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantity,
  selectedSize,
  onQuantityChange,
  onSizeChange
}) => {
  const handleIncrease = () => {
    onQuantityChange(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      onQuantityChange(product.id, quantity - 1);
    }
  };

  return (
    <div className="product-card bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
      {/* Hero Image */}
      <div className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {product.badges.map((badge, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-white/90 text-farm-green rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Community Progress (if applicable) */}
      {product.communityBuy && (
        <div className="p-4 pb-0">
          <CommunityProgressBar {...product.communityBuy} compact />
        </div>
      )}

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-farm-green">{product.name}</h3>
          <div className="text-right">
            <p className="text-lg font-bold text-farm-green">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-xs text-farm-earth">per {product.unit}</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 mb-2">
          <MapPin className="w-3 h-3 text-farm-earth" />
          <span className="text-sm text-farm-earth">{product.farm}</span>
          <span className="text-xs text-farm-earth">• {product.location}</span>
        </div>

        <p className="text-sm text-gray-600 mb-4">{product.description}</p>

        {/* Size Selection */}
        <div className="mb-4">
          <label className="text-sm font-medium text-farm-green mb-2 block">
            Size
          </label>
          <Select value={selectedSize} onValueChange={(value) => onSizeChange(product.id, value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {product.sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecrease}
              disabled={quantity === 0}
              className="w-8 h-8 p-0"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleIncrease}
              className="w-8 h-8 p-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {quantity > 0 && (
            <div className="text-sm font-medium text-farm-green">
              ${(product.price * quantity).toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
