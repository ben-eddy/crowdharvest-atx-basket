import React from 'react';
import ProductGrid from './ProductGrid';
import BeefCutsDiagram from './BeefCutsDiagram';
import LambCutsDiagram from './LambCutsDiagram';

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

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface CategoryContentProps {
  selectedCategory: string;
  products: Product[];
  farmers: Farmer[];
  categories: Category[];
  previewQuantities: {[productId: string]: number};
  cart: {[productId: string]: { quantity: number }};
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
  const filteredProducts = products.filter(product => product.category === selectedCategory);
  const categoryName = categories.find(c => c.id === selectedCategory)?.name || "";
  
  // Find beef share product and current selection
  const beefShareProduct = products.find(p => p.id === 'beef-shares');
  const beefPreviewQuantity = previewQuantities['beef-shares'] || 0;
  const isBeefInCart = cart['beef-shares']?.quantity > 0;
  
  const lambShareProduct = products.find(p => p.id === 'lamb-shares');
  const lambPreviewQuantity = previewQuantities['lamb-shares'] || 0;
  const isLambInCart = cart['lamb-shares']?.quantity > 0;

  if (selectedCategory === 'beef' && beefShareProduct) {
    return (
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
        onShareChange={(value) => onPreviewQuantityChange('beef-shares', value)}
        currentShareIndex={beefPreviewQuantity}
        shareOptions={beefShareProduct.shareOptions || []}
        onAddToCart={onAddBeefToCart}
        isInCart={isBeefInCart}
      />
    );
  } 
  
  if (selectedCategory === 'lamb' && lambShareProduct) {
    return (
      <LambCutsDiagram
        shareSize={lambShareProduct.shareOptions?.[lambPreviewQuantity]?.label || lambShareProduct.shareOptions?.[0]?.label || '1/8 share'}
        shareFraction={{
          '1/8 share': 1/8,
          '1/6 share': 1/6,
          '1/4 share': 1/4,
          '1/2 share': 1/2
        }[lambShareProduct.shareOptions?.[lambPreviewQuantity]?.label || '1/8 share'] || 1/8}
        onShareChange={(value) => onPreviewQuantityChange('lamb-shares', value)}
        currentShareIndex={lambPreviewQuantity}
        shareOptions={lambShareProduct.shareOptions || []}
        onAddToCart={onAddLambToCart}
        isInCart={isLambInCart}
      />
    );
  }
  
  // For all other categories, show the regular product grid
  return (
    <ProductGrid
      products={filteredProducts}
      farmers={farmers}
      categoryName={categoryName}
      previewQuantities={previewQuantities}
      cart={cart}
      onPreviewQuantityChange={onPreviewQuantityChange}
      onAddToCart={onAddToCart}
    />
  );
};

export default CategoryContent;
