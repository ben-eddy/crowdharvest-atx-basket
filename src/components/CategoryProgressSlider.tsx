
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface CategoryProgress {
  category: string;
  icon: string;
  currentAmount: number;
  targetAmount: number;
  unit: string;
  priceDropAmount: string;
}

interface CategoryProgressSliderProps {
  categoryProgress: CategoryProgress[];
}

const CategoryProgressSlider: React.FC<CategoryProgressSliderProps> = ({ categoryProgress }) => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-farm-green mb-2">
            Austin Subscribers are Committed to buying this Much From Local Farms per Month !!!
          </h2>
          <p className="text-farm-earth">
            See how our community is supporting local farmers with their monthly commitments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {categoryProgress.map((category) => {
            const percentage = Math.min((category.currentAmount / category.targetAmount) * 100, 100);
            const remaining = Math.max(category.targetAmount - category.currentAmount, 0);

            return (
              <div key={category.category} className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="font-semibold text-farm-green text-sm">
                      {category.category}
                    </h3>
                    <p className="text-xs text-farm-earth">
                      {category.currentAmount} / {category.targetAmount} {category.unit}
                    </p>
                  </div>
                </div>

                <Progress value={percentage} className="h-2 mb-2" />
                
                <div className="text-xs text-center">
                  <span className="font-medium text-farm-green">
                    {category.currentAmount} {category.unit} committed
                  </span>
                  {remaining > 0 && (
                    <p className="text-farm-earth mt-1">
                      {remaining} {category.unit} to target
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-farm-earth">
            When we reach our targets, prices drop for everyone! 🎉
          </p>
        </div>
      </div>
    </section>
  );
};

export default CategoryProgressSlider;
