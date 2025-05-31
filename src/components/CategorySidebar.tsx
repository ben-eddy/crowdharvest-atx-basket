
import React from 'react';
import { Beef, Fish, Wheat, Apple, Milk, Egg } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  progress: number;
}

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Mobile: Horizontal scrolling row
    return (
      <div className="bg-white border-b border-green-100 sticky top-16 z-40">
        <div className="flex overflow-x-auto scrollbar-hide px-4 py-3 space-x-3">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`flex-shrink-0 flex flex-col items-center p-3 rounded-lg transition-all duration-200 min-w-[80px] ${
                  isSelected
                    ? 'bg-farm-lightgreen text-white shadow-md transform scale-105'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <IconComponent className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium text-center leading-tight">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop: Vertical sidebar
  return (
    <div className="bg-white border-r border-green-100 h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-farm-green mb-4">Categories</h2>
        <div className="space-y-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  isSelected
                    ? 'bg-farm-lightgreen text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <div className="flex-1 text-left">
                  <span className="font-medium">{category.name}</span>
                  <div className={`w-full bg-gray-200 rounded-full h-1.5 mt-1 ${isSelected ? 'bg-white/30' : ''}`}>
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isSelected ? 'bg-white' : category.color
                      }`}
                      style={{ width: `${category.progress}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
