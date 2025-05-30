
import React from 'react';
import { Users, TrendingUp } from 'lucide-react';

interface CommunityProgressBarProps {
  animal: string;
  currentAmount: number;
  targetAmount: number;
  unit: string;
  priceDropAmount: string;
  currentPrice: number;
  targetPrice: number;
  compact?: boolean;
}

const CommunityProgressBar: React.FC<CommunityProgressBarProps> = ({
  animal,
  currentAmount,
  targetAmount,
  unit,
  priceDropAmount,
  currentPrice,
  targetPrice,
  compact = false
}) => {
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100);
  const remaining = Math.max(targetAmount - currentAmount, 0);
  const isNearTarget = percentage > 75;
  const isComplete = percentage >= 100;

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-farm-green">
            {animal} Community Buy
          </span>
          <span className="text-xs text-farm-earth">
            {Math.round(percentage)}% complete
          </span>
        </div>
        <div className="progress-bar bg-gray-200 rounded-full h-2 mb-2">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              isComplete ? 'animate-pulse-green' : 'bg-farm-lightgreen'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-farm-earth">
          {remaining} {unit} left to unlock ${priceDropAmount} price drop
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 farm-gradient rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-farm-green">
              {animal} Community Buy
            </h3>
            <p className="text-sm text-farm-earth">
              {currentAmount} / {targetAmount} {unit} committed
            </p>
          </div>
        </div>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
          isNearTarget ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
        }`}>
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">
            {remaining} {unit} left
          </span>
        </div>
      </div>

      <div className="progress-bar bg-gray-200 rounded-full h-4 mb-4">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isComplete ? 'animate-pulse-green' : 'bg-gradient-to-r from-farm-lightgreen to-farm-sky'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-farm-earth">Current price: </span>
          <span className="font-semibold text-farm-green">
            ${currentPrice.toFixed(2)}/{unit.slice(0, -1)}
          </span>
        </div>
        <div className="text-sm">
          <span className="text-farm-earth">Target price: </span>
          <span className="font-semibold text-green-600">
            ${targetPrice.toFixed(2)}/{unit.slice(0, -1)}
          </span>
        </div>
        <div className={`text-sm font-semibold ${
          isComplete ? 'text-green-600' : 'text-orange-600'
        }`}>
          {isComplete ? '🎉 Target Reached!' : `${Math.round(percentage)}% Complete`}
        </div>
      </div>
    </div>
  );
};

export default CommunityProgressBar;
