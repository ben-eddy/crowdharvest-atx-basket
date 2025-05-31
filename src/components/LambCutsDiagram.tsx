
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface LambCutsDiagramProps {
  shareSize: string;
  shareFraction: number;
  onShareChange: (value: number) => void;
  currentShareIndex: number;
  shareOptions: { value: number; label: string; priceMultiplier: number }[];
  onAddToCart: () => void;
  isInCart: boolean;
}

const LambCutsDiagram: React.FC<LambCutsDiagramProps> = ({ 
  shareSize, 
  shareFraction, 
  onShareChange, 
  currentShareIndex,
  shareOptions,
  onAddToCart,
  isInCart
}) => {
  // Lamb cut breakdowns based on share size
  const getLambCuts = () => {
    switch (shareSize) {
      case '1/2 share':
        return {
          'Leg Roast': '4 lbs',
          'Shoulder Roast/Kebab': '2-3 lbs',
          'Rib Chops': '2 lbs (8 chops)',
          'Loin Chops': '1 lb (4 chops)',
          'Shanks': '1.5 lbs (2 shanks)',
          'Ground/Stew Meat': '8 lbs',
          'Organs/Stock Bones': '1 lb'
        };
      case '1/4 share':
        return {
          'Leg/Shoulder Roast': '3-4 lbs',
          'Rib Chops': '1 lb (4 chops)',
          'Loin Chops': '0.5-0.75 lb (2 chops)',
          'Shank/Neck': '0.75 lb',
          'Ground/Stew Meat': '3 lbs',
          'Soup Bones/Liver': 'included'
        };
      case '1/6 share':
        return {
          'Shoulder Roast': '3 lbs',
          'Rib Chops': '0.5 lb (2 chops)',
          'Loin Chops': '0.5 lb (2 chops)',
          'Shank/Neck': '0.5 lb',
          'Ground/Stew Meat': '2 lbs'
        };
      case '1/8 share':
      default:
        return {
          'Loin/Rib Chops': '0.75 lb (2-3 chops)',
          'Small Roast': '2 lbs',
          'Shank/Neck': '0.5 lb',
          'Ground/Stew Meat': '1.5 lbs',
          'Stock Bones': 'optional'
        };
    }
  };

  const handleSliderChange = (values: number[]) => {
    onShareChange(values[0]);
  };

  // Calculate total pounds and monthly price based on $18/lb
  const totalPounds = shareOptions[currentShareIndex]?.priceMultiplier || 5;
  const costPerPound = 18; // Fixed at $18/lb
  const monthlyPrice = totalPounds * costPerPound;

  const lambCuts = getLambCuts();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50 flex flex-col items-center justify-center px-4 py-4">
      
      {/* Compact Container - sized to fit content */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 w-full max-w-lg">
        
        {/* Lamb Image */}
        <div className="w-full mb-4">
          <img
            src="/lovable-uploads/2e5c1eea-1c0a-4833-882b-af15026a881f.png"
            alt="Lamb Cuts Diagram"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Share Selection Slider */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-left">
              <p className="text-lg font-bold text-green-600">{shareSize}</p>
              <p className="text-sm text-gray-600">Monthly delivery</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-green-600">
                ${monthlyPrice.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">per month</p>
            </div>
          </div>
          
          <div className="px-2">
            <Slider
              value={[currentShareIndex]}
              onValueChange={handleSliderChange}
              max={shareOptions.length - 1}
              min={0}
              step={1}
              className="w-full h-6"
            />
            
            <div className="flex justify-between text-sm text-gray-500 mt-2 font-medium">
              <span>{shareOptions[0]?.label}</span>
              <span className="text-center">Perfect for most families</span>
              <span>{shareOptions[shareOptions.length - 1]?.label}</span>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mb-4">
          <Button
            onClick={onAddToCart}
            className={`w-full py-3 text-lg font-semibold ${
              isInCart 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isInCart ? 'Update Cart' : 'Add to Cart'}
          </Button>
        </div>

        {/* Cut Amounts Grid */}
        <div className="w-full">
          <h3 className="text-lg font-bold text-green-700 text-center mb-3">Estimated Monthly Share Breakdown</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {Object.entries(lambCuts).map(([cutName, amount]) => (
              <div key={cutName} className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
                <div className="text-sm font-medium text-green-800 mb-1">{cutName}</div>
                <div className="text-base font-bold text-green-600">{amount}</div>
              </div>
            ))}
          </div>
          
          {/* Total amount and cost summary */}
          <div className="text-center bg-green-100 rounded-lg p-3 mb-3">
            <p className="text-base font-bold text-green-700">
              Total: ~{totalPounds} lbs per month • ${costPerPound.toFixed(2)}/lb
            </p>
            <p className="text-sm text-green-600 mt-1">
              Premium grass-fed lamb • Hormone-free • Locally sourced
            </p>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-gray-600 text-center italic bg-gray-50 rounded-lg p-2">
            *Share breakdown is an estimate. Your particular box and lamb share size will always vary organically based on the individual animal and seasonal factors.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LambCutsDiagram;
