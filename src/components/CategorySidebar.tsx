
import React from 'react';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
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
  return (
    <aside className="w-64 bg-white border-r border-green-100 h-full">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-farm-green mb-4">Categories</h3>
        <nav className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`category-icon w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                selectedCategory === category.id
                  ? 'bg-farm-lightgreen text-white'
                  : 'hover:bg-green-50 text-farm-green'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-green-100 text-farm-earth'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default CategorySidebar;
