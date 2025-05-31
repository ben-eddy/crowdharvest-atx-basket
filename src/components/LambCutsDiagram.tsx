
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface LambCutsDiagramProps {
  onAddToCart: () => void;
  previewQuantities: { [productId: string]: number };
  onPreviewQuantityChange: (productId: string, quantity: number) => void;
}

const LambCutsDiagram: React.FC<LambCutsDiagramProps> = ({ 
  onAddToCart,
  previewQuantities,
  onPreviewQuantityChange
}) => {
  // Share options for lamb
  const shareOptions = [
    { value: 0, label: '1/8 share', priceMultiplier: 5 },
    { value: 1, label: '1/6 share', priceMultiplier: 7 },
    { value: 2, label: '1/4 share', priceMultiplier: 10 },
    { value: 3, label: '1/2 share', priceMultiplier: 20 }
  ];

  const currentShareIndex = previewQuantities['lamb-shares'] || 0;
  const currentShare = shareOptions[currentShareIndex];
  const shareFraction = currentShare.priceMultiplier / (40 / 18); // Convert to fraction of whole lamb
  
  // Base amounts for a whole lamb (in pounds) - adjusted for lamb anatomy
  const wholeLambCuts = {
    'Ground Lamb': 8,
    'Chops': 6,
    'Leg Roast': 8,
    'Shoulder Roast': 6,
    'Rack': 3,
    'Shanks': 4
  };

  // Calculate amounts based on share fraction
  const getShareAmount = (baseAmount: number) => {
    const amount = baseAmount * shareFraction;
    return amount < 1 ? `${(amount * 16).toFixed(1)} oz` : `${amount.toFixed(1)} lbs`;
  };

  const handleSliderChange = (values: number[]) => {
    onPreviewQuantityChange('lamb-shares', values[0]);
  };

  // Calculate opacity for visual feedback based on share size
  const getOpacity = () => {
    return Math.max(0.3, Math.min(1, shareFraction * 4));
  };

  // Calculate total pounds and monthly price based on $18/lb
  const totalPounds = Object.values(wholeLambCuts).reduce((a, b) => a + b, 0) * shareFraction;
  const costPerPound = 18; // Fixed at $18/lb
  const monthlyPrice = totalPounds * costPerPound;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center px-4 py-4">
      
      {/* Compact Container - sized to fit content */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 w-full max-w-lg">
        
        {/* Lamb Image */}
        <div className="w-full mb-4">
          <img
            src="/lovable-uploads/2e5c1eea-1c0a-4833-882b-af15026a881f.png"
            alt="Lamb Cuts Diagram"
            className="w-full h-auto object-contain"
            style={{
              opacity: getOpacity(),
              transition: 'opacity 0.3s ease-in-out'
            }}
          />
        </div>

        {/* Share Selection Slider */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-left">
              <p className="text-lg font-bold text-purple-600">{currentShare.label}</p>
              <p className="text-sm text-gray-600">Monthly delivery</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-purple-600">
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
              <span className="text-center">Premium lamb cuts</span>
              <span>{shareOptions[shareOptions.length - 1]?.label}</span>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mb-4">
          <Button
            onClick={onAddToCart}
            className="w-full py-3 text-lg font-semibold bg-purple-500 hover:bg-purple-600 text-white"
          >
            Add to Cart
          </Button>
        </div>

        {/* Cut Amounts Grid */}
        {shareFraction > 0 && (
          <div className="w-full">
            <h3 className="text-lg font-bold text-purple-700 text-center mb-3">Estimated Monthly Share Breakdown</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {Object.entries(wholeLambCuts).map(([cutName, baseAmount]) => (
                <div key={cutName} className="bg-purple-50 rounded-lg p-3 text-center border border-purple-200">
                  <div className="text-sm font-medium text-purple-800 mb-1">{cutName}</div>
                  <div className="text-base font-bold text-purple-600">{getShareAmount(baseAmount)}</div>
                </div>
              ))}
            </div>
            
            {/* Total amount and cost summary */}
            <div className="text-center bg-purple-100 rounded-lg p-3 mb-3">
              <p className="text-base font-bold text-purple-700">
                Total: ~{totalPounds.toFixed(1)} lbs per month • ${costPerPound.toFixed(2)}/lb
              </p>
              <p className="text-sm text-purple-600 mt-1">
                Premium grass-fed lamb • Pasture-raised • Heritage breeds
              </p>
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-gray-600 text-center italic bg-gray-50 rounded-lg p-2">
              *Share breakdown is an estimate. Your particular box and lamb share size will always vary organically based on the individual animal and seasonal factors.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LambCutsDiagram;
