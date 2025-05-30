
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
      
      {/* Interactive Butcher Cut Diagram */}
      <div className="relative w-full max-w-4xl mb-12">
        <div className="relative">
          {/* Base cow cuts image */}
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

          {/* Cut amount overlays positioned on the cow image */}
          {shareFraction > 0 && (
            <>
              {/* Ground Beef - lower body area */}
              <div className="absolute bottom-[15%] left-[25%] bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-green-200">
                <div className="text-xs font-medium text-green-800">Ground Beef</div>
                <div className="text-lg font-bold text-green-600">{getShareAmount(wholeCowCuts['Ground Beef'])}</div>
              </div>

              {/* Steaks - middle back area */}
              <div className="absolute top-[25%] left-[45%] bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-green-200">
                <div className="text-xs font-medium text-green-800">Steaks</div>
                <div className="text-lg font-bold text-green-600">{getShareAmount(wholeCowCuts['Steaks'])}</div>
              </div>

              {/* Roasts - shoulder/chuck area */}
              <div className="absolute top-[20%] left-[15%] bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-green-200">
                <div className="text-xs font-medium text-green-800">Roasts</div>
                <div className="text-lg font-bold text-green-600">{getShareAmount(wholeCowCuts['Roasts'])}</div>
              </div>

              {/* Short Ribs & Brisket - chest area */}
              <div className="absolute bottom-[25%] left-[15%] bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-green-200">
                <div className="text-xs font-medium text-green-800">Short Ribs & Brisket</div>
                <div className="text-lg font-bold text-green-600">{getShareAmount(wholeCowCuts['Short Ribs & Brisket'])}</div>
              </div>

              {/* Tenderloin - lower back area */}
              <div className="absolute top-[45%] left-[50%] bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-green-200">
                <div className="text-xs font-medium text-green-800">Tenderloin</div>
                <div className="text-lg font-bold text-green-600">{getShareAmount(wholeCowCuts['Tenderloin'])}</div>
              </div>

              {/* Flank & Skirt - belly area */}
              <div className="absolute bottom-[35%] left-[40%] bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-green-200">
                <div className="text-xs font-medium text-green-800">Flank & Skirt</div>
                <div className="text-lg font-bold text-green-600">{getShareAmount(wholeCowCuts['Flank & Skirt'])}</div>
              </div>
            </>
          )}
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
        </div>
      </div>
    </div>
  );
};

export default BeefCutsDiagram;
