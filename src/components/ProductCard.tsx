
import React from 'react';
import { Minus, Plus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    <div className="product-card bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden">
      {/* Simplified Hero Section */}
      <div className="relative h-32 bg-gradient-to-br from-green-50 to-blue-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.badges.length > 0 && (
          <span className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-white/90 text-farm-green rounded-full">
            {product.badges[0]}
          </span>
        )}
      </div>

      {/* Compact Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-farm-green text-sm leading-tight">{product.name}</h3>
            <div className="flex items-center space-x-1 mt-1">
              <MapPin className="w-3 h-3 text-farm-earth" />
              <span className="text-xs text-farm-earth">{product.farm}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-farm-green">${product.price.toFixed(2)}</p>
            <p className="text-xs text-farm-earth">per {product.unit}</p>
          </div>
        </div>

        {/* Size and Quantity Row */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex-1">
            <Select value={selectedSize} onValueChange={(value) => onSizeChange(product.id, value)}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size} className="text-xs">
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecrease}
              disabled={quantity === 0}
              className="w-6 h-6 p-0"
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="w-6 text-center text-sm font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleIncrease}
              className="w-6 h-6 p-0"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Total Price */}
        {quantity > 0 && (
          <div className="text-center">
            <div className="text-sm font-medium text-farm-green bg-green-50 rounded px-2 py-1">
              Total: ${(product.price * quantity).toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
