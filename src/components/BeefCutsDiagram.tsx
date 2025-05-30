
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
    <div className="w-full min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      {/* Hero Section with Large Cow Diagram - Full Screen */}
      <div className="w-full h-screen flex flex-col justify-center items-center px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-farm-green mb-6">
            Your Monthly Beef Share
          </h1>
          <p className="text-2xl text-farm-earth max-w-3xl mx-auto">
            Choose your perfect portion of grass-fed, locally-raised beef delivered fresh every month
          </p>
        </div>
        
        {/* Massive Cow Diagram - Takes most of the screen */}
        <div className="flex justify-center items-center flex-1 w-full max-w-7xl">
          <div className="relative w-full h-full flex justify-center items-center">
            <img 
              src="/lovable-uploads/c691a872-86bf-44cb-83de-55e01efc469b.png" 
              alt="Beef Cuts Diagram" 
              className="max-w-full max-h-full object-contain drop-shadow-2xl"
              style={{ height: '70vh', width: 'auto' }}
            />
            
            {/* Share indicator overlay */}
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-farm-green/30 to-transparent border-4 border-farm-green border-dashed"
              style={{ 
                width: `${shareFraction * 100}%`,
                transition: 'width 0.3s ease-in-out'
              }}
            />
            
            {/* Share label */}
            <div className="absolute top-8 left-8 bg-farm-green text-white px-8 py-4 rounded-xl shadow-xl">
              <p className="text-2xl font-bold">Your {shareSize}</p>
              <p className="text-lg opacity-90">Highlighted portion shows your monthly share</p>
            </div>
          </div>
        </div>
      </div>

      {/* Share Selection Slider - Full Width Section */}
      <div className="w-full bg-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-semibold text-farm-green mb-6">
              Choose Your Monthly Share Size
            </h2>
            <p className="text-2xl text-farm-earth">
              Slide to select how much premium beef you'd like delivered each month
            </p>
          </div>
          
          <div className="space-y-12">
            <div className="flex items-center justify-between mb-12 bg-gradient-to-r from-green-50 to-blue-50 p-12 rounded-3xl shadow-lg">
              <div className="text-left">
                <p className="text-4xl font-bold text-farm-green">{shareSize}</p>
                <p className="text-xl text-farm-earth">Monthly delivery</p>
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold text-farm-green">
                  ${(200 * shareOptions[currentShareIndex]?.priceMultiplier || 200).toFixed(2)}
                </p>
                <p className="text-xl text-farm-earth">per month</p>
              </div>
            </div>
            
            <div className="px-8">
              <Slider
                value={[currentShareIndex]}
                onValueChange={handleSliderChange}
                max={shareOptions.length - 1}
                min={0}
                step={1}
                className="w-full h-6"
              />
              
              <div className="flex justify-between text-lg text-gray-500 mt-6">
                <span className="font-medium">{shareOptions[0]?.label}</span>
                <span className="font-medium">{shareOptions[shareOptions.length - 1]?.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cut Breakdown - Full Width Section */}
      <div className="w-full bg-gradient-to-b from-green-50 to-green-100 py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-5xl font-semibold text-farm-green text-center mb-16">
            Your Monthly Cut Breakdown
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {Object.entries(wholeCowCuts).map(([cut, amount]) => (
              <div key={cut} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="text-center">
                  <h4 className="text-2xl font-semibold text-farm-green mb-4">{cut}</h4>
                  <p className="text-4xl font-bold text-farm-earth">{getShareAmount(amount)}</p>
                  <p className="text-lg text-gray-600 mt-2">per month</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-farm-green text-white rounded-3xl p-12 text-center shadow-2xl">
            <h4 className="text-3xl font-bold mb-4">
              Total Monthly Amount: ~{(Object.values(wholeCowCuts).reduce((a, b) => a + b, 0) * shareFraction).toFixed(1)} lbs
            </h4>
            <p className="text-xl opacity-90">
              Premium grass-fed beef from local farms • Cut mix may vary based on availability
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeefCutsDiagram;
