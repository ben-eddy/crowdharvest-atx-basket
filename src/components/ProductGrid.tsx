import React from 'react';
import ProductCard from './ProductCard';
import FarmerInfo from './FarmerInfo';
import { useIsMobile } from '../hooks/use-mobile';

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

interface ProductGridProps {
  products: Product[];
  farmers: Farmer[];
  categoryName: string;
  previewQuantities: {[productId: string]: number};
  cart: {[productId: string]: { quantity: number }};
  onPreviewQuantityChange: (productId: string, quantity: number) => void;
  onAddToCart: (productId: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  farmers,
  categoryName,
  previewQuantities,
  cart,
  onPreviewQuantityChange,
  onAddToCart
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`p-3 md:p-6`}>
      <div className="mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-farm-green mb-2 md:mb-4">
          Choose Your Monthly {categoryName}
        </h2>
        <p className="text-sm md:text-base text-farm-earth mb-4 md:mb-6">
          Use the sliders to select how much you'd like each month. You can adjust anytime.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={previewQuantities[product.id] || 0}
              onQuantityChange={onPreviewQuantityChange}
              onAddToCart={() => onAddToCart(product.id)}
              isInCart={cart[product.id]?.quantity > 0}
            />
          ))}
        </div>
      </div>

      {/* Farmer Information */}
      <FarmerInfo farmers={farmers} />
    </div>
  );
};

export default ProductGrid;
