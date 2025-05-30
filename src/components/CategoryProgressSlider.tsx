
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-farm-green mb-4">Active Community Buys</h2>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {categoryProgress.map((category, index) => {
            const percentage = Math.min((category.currentAmount / category.targetAmount) * 100, 100);
            const remaining = Math.max(category.targetAmount - category.currentAmount, 0);
            const isNearTarget = percentage > 75;
            const isComplete = percentage >= 100;

            return (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <div className="bg-white rounded-xl shadow-sm border border-green-100 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <h3 className="font-semibold text-farm-green">{category.category}</h3>
                        <p className="text-xs text-farm-earth">
                          {category.currentAmount} / {category.targetAmount} {category.unit}
                        </p>
                      </div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      isComplete ? 'bg-green-100 text-green-800' :
                      isNearTarget ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {Math.round(percentage)}%
                    </div>
                  </div>

                  <div className="progress-bar bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isComplete ? 'animate-pulse-green' : 'bg-farm-lightgreen'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="text-center">
                    {isComplete ? (
                      <p className="text-xs font-semibold text-green-600">🎉 Target Reached!</p>
                    ) : (
                      <p className="text-xs text-farm-earth">
                        {remaining} {category.unit} left for ${category.priceDropAmount} drop
                      </p>
                    )}
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryProgressSlider;
