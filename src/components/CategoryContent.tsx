import React from 'react';
import ProductGrid from '@/components/ProductGrid';
import BeefCutsDiagram from '@/components/BeefCutsDiagram';
import LambCutsDiagram from '@/components/LambCutsDiagram';
import FarmerInfo from '@/components/FarmerInfo';
import { useIsMobile } from '@/hooks/use-mobile';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  shareOptions?: { label: string; priceMultiplier: number }[];
}

interface Farmer {
  id: string;
  name: string;
  bio: string;
  image: string;
  products: Product[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  progress: number;
}

interface CategoryContentProps {
  selectedCategory: string;
  products: Product[];
  farmers: Farmer[];
  categories: Category[];
  previewQuantities: { [productId: string]: number };
  cart: { [productId: string]: { quantity: number } };
  onPreviewQuantityChange: (productId: string, quantity: number) => void;
  onAddToCart: (productId: string) => void;
  onAddBeefToCart: () => void;
  onAddLambToCart: () => void;
}

const CategoryContent: React.FC<CategoryContentProps> = ({
  selectedCategory,
  products,
  farmers,
  categories,
  previewQuantities,
  cart,
  onPreviewQuantityChange,
  onAddToCart,
  onAddBeefToCart,
  onAddLambToCart
}) => {
  const isMobile = useIsMobile();
  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const categoryProducts = products.filter(product => product.category === selectedCategory);
  const categoryFarmers = farmers.filter(farmer => 
    farmer.products.some(product => product.category === selectedCategory)
  );

  return (
    <div className={`${isMobile ? 'h-full flex flex-col' : 'p-6'}`}>
      {/* Category Header */}
      <div className={`${isMobile ? 'p-4 pb-2' : 'mb-6'}`}>
        <div className="flex items-center space-x-3 mb-2">
          {currentCategory && (
            <>
              <currentCategory.icon className="w-6 h-6 text-farm-lightgreen" />
              <h1 className="text-2xl font-bold text-farm-green">{currentCategory.name}</h1>
            </>
          )}
        </div>
        <p className={`text-gray-600 ${isMobile ? 'text-sm' : ''}`}>
          {selectedCategory === 'beef' && 'Premium grass-fed beef from local ranches'}
          {selectedCategory === 'lamb' && 'Pasture-raised lamb from heritage breeds'}
          {selectedCategory === 'seafood' && 'Fresh, sustainable seafood from Gulf waters'}
          {selectedCategory === 'produce' && 'Seasonal fruits and vegetables from local farms'}
          {selectedCategory === 'dairy' && 'Fresh dairy products from local creameries'}
          {selectedCategory === 'pantry' && 'Artisanal pantry staples and preserves'}
        </p>
      </div>

      {/* Scrollable Content Area */}
      <div className={`${isMobile ? 'flex-1 overflow-auto px-4' : ''}`}>
        {/* Special sections for beef and lamb */}
        {selectedCategory === 'beef' && (
          <div className={`${isMobile ? 'mb-4' : 'mb-8'}`}>
            <BeefCutsDiagram 
              onAddToCart={onAddBeefToCart}
              previewQuantities={previewQuantities}
              onPreviewQuantityChange={onPreviewQuantityChange}
            />
          </div>
        )}

        {selectedCategory === 'lamb' && (
          <div className={`${isMobile ? 'mb-4' : 'mb-8'}`}>
            <LambCutsDiagram 
              onAddToCart={onAddLambToCart}
              previewQuantities={previewQuantities}
              onPreviewQuantityChange={onPreviewQuantityChange}
            />
          </div>
        )}

        {/* Products Grid */}
        {categoryProducts.length > 0 && (
          <div className={`${isMobile ? 'mb-4' : 'mb-8'}`}>
            <h2 className={`font-semibold text-farm-green mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`}>
              Available Products
            </h2>
            <ProductGrid 
              products={categoryProducts}
              previewQuantities={previewQuantities}
              cart={cart}
              onPreviewQuantityChange={onPreviewQuantityChange}
              onAddToCart={onAddToCart}
            />
          </div>
        )}

        {/* Farmer Information */}
        {categoryFarmers.length > 0 && (
          <div className={`${isMobile ? 'mb-20' : ''}`}>
            <h2 className={`font-semibold text-farm-green mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`}>
              Featured Farmers
            </h2>
            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
              {categoryFarmers.map((farmer, index) => (
                <FarmerInfo key={index} farmer={farmer} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryContent;
