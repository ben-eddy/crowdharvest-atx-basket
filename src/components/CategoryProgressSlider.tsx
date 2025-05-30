
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Users, TrendingUp } from 'lucide-react';

interface CategoryProgress {
  category: string;
  icon: string;
  currentAmount: number;
  targetAmount: number;
  unit: string;
  priceDropAmount: string;
  emoji: string;
}

interface CategoryProgressSliderProps {
  categoryProgress: CategoryProgress[];
}

const CategoryProgressSlider: React.FC<CategoryProgressSliderProps> = ({ categoryProgress }) => {
  const totalSubscribers = 128;
  
  // Sample data with emoji representations
  const sampleCategories = [
    {
      category: 'Beef',
      icon: '🐄',
      currentAmount: 10,
      targetAmount: 20,
      unit: 'cows',
      priceDropAmount: '$50',
      emoji: '🐄'
    },
    {
      category: 'Lamb',
      icon: '🐑',
      currentAmount: 12,
      targetAmount: 25,
      unit: 'lambs',
      priceDropAmount: '$30',
      emoji: '🐑'
    },
    {
      category: 'Chicken',
      icon: '🐔',
      currentAmount: 35,
      targetAmount: 60,
      unit: 'chickens',
      priceDropAmount: '$15',
      emoji: '🐔'
    },
    {
      category: 'Turkey',
      icon: '🦃',
      currentAmount: 8,
      targetAmount: 15,
      unit: 'turkeys',
      priceDropAmount: '$40',
      emoji: '🦃'
    },
    {
      category: 'Milk',
      icon: '🥛',
      currentAmount: 120,
      targetAmount: 200,
      unit: 'gallons',
      priceDropAmount: '$3',
      emoji: '🥛'
    },
    {
      category: 'Vegetables',
      icon: '🥕',
      currentAmount: 100,
      targetAmount: 180,
      unit: 'lbs',
      priceDropAmount: '$2',
      emoji: '🥕'
    },
    {
      category: 'Fruit',
      icon: '🍎',
      currentAmount: 150,
      targetAmount: 250,
      unit: 'lbs',
      priceDropAmount: '$2',
      emoji: '🍎'
    },
    {
      category: 'Eggs',
      icon: '🥚',
      currentAmount: 150,
      targetAmount: 300,
      unit: 'dozen',
      priceDropAmount: '$1',
      emoji: '🥚'
    },
    {
      category: 'Cheese',
      icon: '🧀',
      currentAmount: 25,
      targetAmount: 50,
      unit: 'blocks',
      priceDropAmount: '$5',
      emoji: '🧀'
    },
    {
      category: 'Nuts',
      icon: '🥜',
      currentAmount: 75,
      targetAmount: 120,
      unit: 'lbs',
      priceDropAmount: '$3',
      emoji: '🥜'
    }
  ];

  const categories = categoryProgress.length > 0 ? categoryProgress : sampleCategories;
  
  // Calculate total monthly commitment value
  const totalCommitmentValue = categories.reduce((sum, category) => {
    return sum + (category.currentAmount * 15); // Assuming average $15 per unit
  }, 0);

  const renderEmojiVisual = (category: any) => {
    const maxDisplay = 20; // Maximum emojis to display for readability
    const displayCount = Math.min(category.currentAmount, maxDisplay);
    const emojis = Array(displayCount).fill(category.emoji);
    
    return (
      <div className="flex flex-wrap justify-center gap-1 mb-3">
        {emojis.map((emoji, index) => (
          <span key={index} className="text-lg">{emoji}</span>
        ))}
        {category.currentAmount > maxDisplay && (
          <span className="text-sm text-gray-600 ml-2">
            +{category.currentAmount - maxDisplay} more
          </span>
        )}
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Subscriber Stats */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-green-200">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-farm-green mb-2">
              {totalSubscribers} Austin Subscribers Strong! 🎉
            </h2>
            <p className="text-lg text-farm-earth mb-4">
              Our community is committed to buying this much from local farms every month
            </p>
            <div className="bg-green-100 rounded-lg p-4 inline-block">
              <span className="text-2xl font-bold text-green-800">
                ${totalCommitmentValue.toLocaleString()}/month
              </span>
              <p className="text-sm text-green-700 mt-1">Total Monthly Commitment</p>
            </div>
          </div>
        </div>

        {/* Visual Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => {
            const percentage = Math.min((category.currentAmount / category.targetAmount) * 100, 100);
            const remaining = Math.max(category.targetAmount - category.currentAmount, 0);
            const subscribersForThis = Math.floor((category.currentAmount / category.targetAmount) * totalSubscribers);

            return (
              <div key={category.category} className="bg-white rounded-xl shadow-lg border border-green-100 overflow-hidden transform hover:scale-105 transition-transform duration-300">
                {/* Header with icon and stats */}
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{category.icon}</span>
                    <div className="text-right">
                      <div className="text-lg font-bold">{subscribersForThis}</div>
                      <div className="text-xs opacity-90">subscribers</div>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg">{category.category}</h3>
                </div>

                {/* Emoji Visual Display */}
                <div className="p-4">
                  {renderEmojiVisual(category)}
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-farm-green">Progress</span>
                      <span className="text-farm-earth">{Math.round(percentage)}%</span>
                    </div>
                    <Progress value={percentage} className="h-3" />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Committed:</span>
                      <span className="font-semibold text-green-600">
                        {category.currentAmount} {category.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-semibold">
                        {category.targetAmount} {category.unit}
                      </span>
                    </div>
                    {remaining > 0 && (
                      <div className="bg-orange-50 rounded-lg p-2 mt-2">
                        <div className="text-orange-800 text-xs text-center">
                          <TrendingUp className="w-3 h-3 inline mr-1" />
                          {remaining} {category.unit} until sold out!
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Community Impact Banner */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-green-200">
          <div className="text-center">
            <h3 className="text-xl font-bold text-farm-green mb-2">
              💡 Community Impact
            </h3>
            <p className="text-farm-earth mb-4">
              Our {totalSubscribers} subscribers are supporting local Austin farms with guaranteed monthly purchases!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="font-semibold text-green-800">Farmers Supported</div>
                <div className="text-2xl font-bold text-green-600">12+</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="font-semibold text-blue-800">Monthly Revenue</div>
                <div className="text-2xl font-bold text-blue-600">${totalCommitmentValue.toLocaleString()}</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <div className="font-semibold text-orange-800">Referral Rewards</div>
                <div className="text-2xl font-bold text-orange-600">Earn $25</div>
              </div>
            </div>
            <p className="text-sm text-farm-earth mt-4">
              <strong>Spread the word!</strong> Share your referral link and earn $25 when friends join our community 🎉
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryProgressSlider;
