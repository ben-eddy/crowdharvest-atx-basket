
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
    'Steaks (Ribeye, Sirloin, T-bone)': 80,
    'Roasts (Chuck, Rump, Round)': 100,
    'Short Ribs & Brisket': 40,
    'Tenderloin': 12,
    'Flank & Skirt Steaks': 8
  };

  // Calculate amounts based on share fraction
  const getShareAmount = (baseAmount: number) => {
    const amount = baseAmount * shareFraction;
    return amount < 1 ? `${(amount * 16).toFixed(1)} oz` : `${amount.toFixed(1)} lbs`;
  };

  const handleSliderChange = (values: number[]) => {
    onShareChange(values[0]);
  };

  return (
    <div className="w-full bg-gradient-to-b from-amber-50 to-orange-100 min-h-screen">
      {/* Hero Section with Large Cow Diagram */}
      <div className="relative w-full py-16 px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-farm-green mb-4">
            Your Monthly Beef Share
          </h1>
          <p className="text-xl text-farm-earth max-w-2xl mx-auto">
            Choose your perfect portion of grass-fed, locally-raised beef delivered fresh every month
          </p>
        </div>
        
        {/* Large Cow Diagram */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img 
              src="/lovable-uploads/c691a872-86bf-44cb-83de-55e01efc469b.png" 
              alt="Beef Cuts Diagram" 
              className="w-full max-w-5xl h-auto drop-shadow-2xl rounded-lg"
            />
            
            {/* Share indicator overlay */}
            <div 
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-farm-green/30 to-transparent rounded-lg border-4 border-farm-green border-dashed"
              style={{ 
                width: `${shareFraction * 100}%`,
                transition: 'width 0.3s ease-in-out'
              }}
            />
            
            {/* Share label */}
            <div className="absolute top-4 left-4 bg-farm-green text-white px-6 py-3 rounded-lg shadow-lg">
              <p className="text-xl font-bold">Your {shareSize}</p>
              <p className="text-sm opacity-90">Highlighted portion shows your monthly share</p>
            </div>
          </div>
        </div>
      </div>

      {/* Share Selection Slider - Full Width */}
      <div className="w-full bg-white py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-farm-green mb-4">
              Choose Your Monthly Share Size
            </h2>
            <p className="text-xl text-farm-earth">
              Slide to select how much premium beef you'd like delivered each month
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl">
              <div className="text-left">
                <p className="text-2xl font-bold text-farm-green">{shareSize}</p>
                <p className="text-farm-earth">Monthly delivery</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-farm-green">
                  ${(200 * shareOptions[currentShareIndex]?.priceMultiplier || 200).toFixed(2)}
                </p>
                <p className="text-farm-earth">per month</p>
              </div>
            </div>
            
            <div className="px-4">
              <Slider
                value={[currentShareIndex]}
                onValueChange={handleSliderChange}
                max={shareOptions.length - 1}
                min={0}
                step={1}
                className="w-full h-4"
              />
              
              <div className="flex justify-between text-sm text-gray-500 mt-4">
                <span className="font-medium">{shareOptions[0]?.label}</span>
                <span className="font-medium">{shareOptions[shareOptions.length - 1]?.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cut Breakdown - Full Width */}
      <div className="w-full bg-gradient-to-b from-green-50 to-green-100 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-semibold text-farm-green text-center mb-12">
            Your Monthly Cut Breakdown
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Object.entries(wholeCowCuts).map(([cut, amount]) => (
              <div key={cut} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-farm-green mb-2">{cut}</h4>
                  <p className="text-3xl font-bold text-farm-earth">{getShareAmount(amount)}</p>
                  <p className="text-sm text-gray-600 mt-1">per month</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-farm-green text-white rounded-2xl p-8 text-center shadow-xl">
            <h4 className="text-2xl font-bold mb-2">
              Total Monthly Amount: ~{(Object.values(wholeCowCuts).reduce((a, b) => a + b, 0) * shareFraction).toFixed(1)} lbs
            </h4>
            <p className="text-lg opacity-90">
              Premium grass-fed beef from local farms • Cut mix may vary based on availability
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeefCutsDiagram;
