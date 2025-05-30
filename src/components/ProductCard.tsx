
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

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
  onAddToCart: () => void;
  isInCart: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  isInCart
}) => {
  const { toast } = useToast();

  const handleSliderChange = (values: number[]) => {
    console.log(`Slider changed for ${product.name}: ${values[0]}`);
    onQuantityChange(product.id, values[0]);
  };

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} ${product.unit}(s) of ${product.name} to cart`);
    console.log(`Current quantity state: ${quantity}`);
    console.log(`Product ID: ${product.id}`);
    
    onAddToCart();
    
    // Show toast notification
    if (quantity > 0) {
      toast({
        title: "Added to Cart",
        description: `${quantity} ${product.unit}${quantity !== 1 ? 's' : ''} of ${product.name}`,
      });
    }
  };

  // Check if this is a chicken product that allows half values
  const isChickenProduct = product.category === 'poultry';
  const step = isChickenProduct ? 0.5 : 1;
  
  // Regular product card for all products
  const displayPrice = product.price * quantity;
  const displayQuantity = `${quantity} ${product.unit}${quantity !== 1 ? 's' : ''}`;

  // Get symbol for each product category
  const getProductSymbol = () => {
    switch (product.category) {
      case 'poultry':
        return '🍗';
      case 'vegetables':
        if (product.name.toLowerCase().includes('broccoli')) return '🥦';
        if (product.name.toLowerCase().includes('beet')) return '🧅';
        if (product.name.toLowerCase().includes('onion')) return '🧅';
        if (product.name.toLowerCase().includes('garlic')) return '🧄';
        if (product.name.toLowerCase().includes('celery')) return '🥬';
        if (product.name.toLowerCase().includes('green')) return '🥬';
        return '🥕';
      case 'eggs':
        return '🥚';
      case 'dairy':
        if (product.name.toLowerCase().includes('milk')) return '🥛';
        if (product.name.toLowerCase().includes('cheese')) return '🧀';
        return '🥛';
      case 'fruit':
        if (product.name.toLowerCase().includes('peach')) return '🍑';
        if (product.name.toLowerCase().includes('watermelon')) return '🍉';
        return '🍓';
      case 'nuts':
        if (product.name.toLowerCase().includes('pecan')) return '🥜';
        if (product.name.toLowerCase().includes('walnut')) return '🥜';
        if (product.name.toLowerCase().includes('cashew')) return '🥜';
        if (product.name.toLowerCase().includes('butter')) return '🥜';
        return '🥜';
      case 'bread':
        return '🍞';
      case 'honey':
        if (product.name.toLowerCase().includes('pollen')) return '🌼';
        return '🍯';
      default:
        return '🥕';
    }
  };

  return (
    <div className="product-card bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden">
      {/* Hero Section with Symbol */}
      <div className="relative h-32 bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-6xl">
          {getProductSymbol()}
        </div>
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
            step={step}
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

        {/* Add to Cart Button */}
        {quantity > 0 && (
          <div className="mt-3">
            <Button 
              onClick={handleAddToCart}
              className={`w-full font-medium ${
                isInCart 
                  ? 'bg-gray-500 hover:bg-gray-600 text-white' 
                  : 'farm-gradient text-white'
              }`}
              size="sm"
            >
              {isInCart ? 'Update Cart' : 'Add to Cart'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
