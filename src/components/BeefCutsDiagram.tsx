
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface BeefCutsDiagramProps {
  shareSize: string;
  shareFraction: number;
  onShareChange: (value: number) => void;
  currentShareIndex: number;
  shareOptions: { value: number; label: string; priceMultiplier: number }[];
}

const BeefCutsDiagram: React.FC<BeefCutsDiagramProps> = ({ 
  shareSize, 
  shareFraction, 
  onShareChange, 
  currentShareIndex,
  shareOptions 
}) => {
  // Base amounts for a whole cow (in pounds)
  const wholeCowCuts = {
    'Ground Beef': 120,
    'Steaks': 80,
    'Roasts': 100,
    'Short Ribs & Brisket': 40,
    'Tenderloin': 12,
    'Flank & Skirt': 8
  };

  // Calculate amounts based on share fraction
  const getShareAmount = (baseAmount: number) => {
    const amount = baseAmount * shareFraction;
    return amount < 1 ? `${(amount * 16).toFixed(1)} oz` : `${amount.toFixed(1)} lbs`;
  };

  const handleSliderChange = (values: number[]) => {
    onShareChange(values[0]);
  };

  // Calculate opacity for visual feedback based on share size
  const getOpacity = () => {
    return Math.max(0.3, Math.min(1, shareFraction * 3));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50 flex flex-col items-center justify-center px-8 py-16">
      
      {/* Butcher Cut Diagram */}
      <div className="relative w-full max-w-4xl mb-12">
        <div className="relative">
          <img
            src="/lovable-uploads/34a51eef-7412-465d-a983-cda5374f8b37.png"
            alt="Beef Cuts Diagram"
            className="w-full h-auto drop-shadow-2xl"
            style={{
              opacity: getOpacity(),
              transition: 'opacity 0.3s ease-in-out'
            }}
          />
          
          {/* Overlay to show share amount visually */}
          <div 
            className="absolute inset-0 bg-green-200 mix-blend-multiply rounded-lg"
            style={{
              opacity: Math.max(0.1, shareFraction * 0.5),
              transition: 'opacity 0.3s ease-in-out'
            }}
          />
        </div>
      </div>

      {/* Enhanced Share Selection */}
      <div className="w-full max-w-4xl">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
          <div className="flex items-center justify-between mb-8">
            <div className="text-left">
              <p className="text-3xl font-bold text-green-600">{shareSize}</p>
              <p className="text-lg text-gray-600">Monthly delivery</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-green-600">
                ${(200 * shareOptions[currentShareIndex]?.priceMultiplier || 200).toFixed(2)}
              </p>
              <p className="text-lg text-gray-600">per month</p>
            </div>
          </div>
          
          <div className="px-4">
            <Slider
              value={[currentShareIndex]}
              onValueChange={handleSliderChange}
              max={shareOptions.length - 1}
              min={0}
              step={1}
              className="w-full h-6"
            />
            
            <div className="flex justify-between text-sm text-gray-500 mt-6 font-medium">
              <span>{shareOptions[0]?.label}</span>
              <span className="text-center">Perfect for most families</span>
              <span>{shareOptions[shareOptions.length - 1]?.label}</span>
            </div>
          </div>
          
          {/* Total amount summary */}
          <div className="mt-6 text-center bg-green-50 rounded-xl p-4">
            <p className="text-xl font-bold text-green-700">
              Total: ~{(Object.values(wholeCowCuts).reduce((a, b) => a + b, 0) * shareFraction).toFixed(1)} lbs per month
            </p>
            <p className="text-sm text-green-600 mt-1">
              Premium grass-fed beef • Hormone-free • Locally sourced
            </p>
          </div>

          {/* Cut breakdown cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {Object.entries(wholeCowCuts).map(([cut, amount]) => (
              <div key={cut} className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 text-sm">{cut}</h4>
                <p className="text-2xl font-bold text-green-600">{getShareAmount(amount)}</p>
                <p className="text-xs text-green-600">per month</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeefCutsDiagram;
