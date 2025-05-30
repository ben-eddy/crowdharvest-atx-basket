
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

  // Calculate total pounds and monthly price based on $14/lb
  const totalPounds = Object.values(wholeCowCuts).reduce((a, b) => a + b, 0) * shareFraction;
  const costPerPound = 14; // Fixed at $14/lb
  const monthlyPrice = totalPounds * costPerPound;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50 flex flex-col items-center justify-center px-4 py-4">
      
      {/* Compact Container - sized to fit content */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 w-full max-w-lg">
        
        {/* Cow Image */}
        <div className="w-full mb-4">
          <img
            src="/lovable-uploads/34a51eef-7412-465d-a983-cda5374f8b37.png"
            alt="Beef Cuts Diagram"
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

        {/* Cut Amounts Grid */}
        {shareFraction > 0 && (
          <div className="w-full">
            <h3 className="text-lg font-bold text-green-700 text-center mb-3">Estimated Monthly Share Breakdown</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {Object.entries(wholeCowCuts).map(([cutName, baseAmount]) => (
                <div key={cutName} className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
                  <div className="text-sm font-medium text-green-800 mb-1">{cutName}</div>
                  <div className="text-base font-bold text-green-600">{getShareAmount(baseAmount)}</div>
                </div>
              ))}
            </div>
            
            {/* Total amount and cost summary */}
            <div className="text-center bg-green-100 rounded-lg p-3 mb-3">
              <p className="text-base font-bold text-green-700">
                Total: ~{totalPounds.toFixed(1)} lbs per month • ${costPerPound.toFixed(2)}/lb
              </p>
              <p className="text-sm text-green-600 mt-1">
                Premium grass-fed beef • Hormone-free • Locally sourced
              </p>
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-gray-600 text-center italic bg-gray-50 rounded-lg p-2">
              *Share breakdown is an estimate. Your particular box and cow share size will always vary organically based on the individual animal and seasonal factors.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeefCutsDiagram;
