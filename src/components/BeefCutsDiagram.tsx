
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
      {/* Hero Section with Custom Cow Diagram */}
      <div className="w-full h-screen flex flex-col justify-center items-center px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-farm-green mb-6">
            Choose Your Beef Share
          </h1>
          <p className="text-2xl text-farm-earth max-w-3xl mx-auto">
            Select your perfect portion of premium grass-fed beef delivered monthly
          </p>
        </div>
        
        {/* Custom Cow Share Diagram */}
        <div className="relative w-full max-w-6xl h-96 mb-12">
          {/* Cow silhouette using CSS */}
          <div className="relative w-full h-full flex justify-center items-center">
            <svg viewBox="0 0 800 400" className="w-full h-full max-w-4xl">
              {/* Cow body outline */}
              <path
                d="M150 250 Q120 220 140 180 Q160 160 200 170 Q250 150 300 160 Q400 140 500 160 Q600 150 650 170 Q680 180 670 220 Q650 250 620 260 L600 300 Q580 320 550 310 L500 300 L450 310 Q420 320 400 310 L350 300 L300 310 Q280 320 250 310 L200 300 Q170 280 150 250 Z"
                fill="#8B4513"
                stroke="#654321"
                strokeWidth="3"
                className="drop-shadow-lg"
              />
              
              {/* Cow head */}
              <ellipse cx="120" cy="200" rx="40" ry="35" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
              
              {/* Cow legs */}
              <rect x="200" y="300" width="15" height="40" fill="#8B4513"/>
              <rect x="280" y="300" width="15" height="40" fill="#8B4513"/>
              <rect x="480" y="300" width="15" height="40" fill="#8B4513"/>
              <rect x="560" y="300" width="15" height="40" fill="#8B4513"/>
              
              {/* Cut sections with labels */}
              {/* Chuck */}
              <rect x="140" y="180" width="80" height="60" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5"/>
              <text x="180" y="215" textAnchor="middle" className="text-sm font-semibold fill-green-700">Chuck</text>
              
              {/* Rib */}
              <rect x="220" y="160" width="80" height="70" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5"/>
              <text x="260" y="200" textAnchor="middle" className="text-sm font-semibold fill-red-700">Rib</text>
              
              {/* Loin */}
              <rect x="300" y="150" width="120" height="80" fill="rgba(168, 85, 247, 0.3)" stroke="#a855f7" strokeWidth="2" strokeDasharray="5,5"/>
              <text x="360" y="195" textAnchor="middle" className="text-sm font-semibold fill-purple-700">Loin</text>
              
              {/* Round */}
              <rect x="420" y="160" width="100" height="70" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5"/>
              <text x="470" y="200" textAnchor="middle" className="text-sm font-semibold fill-blue-700">Round</text>
              
              {/* Brisket */}
              <rect x="180" y="240" width="70" height="40" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5"/>
              <text x="215" y="265" textAnchor="middle" className="text-sm font-semibold fill-amber-700">Brisket</text>
              
              {/* Share overlay - shows selected portion */}
              <rect 
                x="140" 
                y="150" 
                width={`${shareFraction * 400}`} 
                height="140" 
                fill="rgba(34, 197, 94, 0.4)" 
                stroke="#16a34a" 
                strokeWidth="4"
                strokeDasharray="10,5"
                className="transition-all duration-500"
              />
            </svg>
            
            {/* Share indicator */}
            <div className="absolute top-4 left-4 bg-farm-green text-white px-6 py-3 rounded-xl shadow-xl">
              <p className="text-xl font-bold">Your {shareSize}</p>
              <p className="text-sm opacity-90">Green area shows your portion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Share Selection Slider */}
      <div className="w-full bg-white py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-farm-green mb-4">
              Select Your Share Size
            </h2>
            <p className="text-xl text-farm-earth">
              Choose how much premium beef you'd like delivered each month
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-2xl">
              <div className="text-left">
                <p className="text-3xl font-bold text-farm-green">{shareSize}</p>
                <p className="text-lg text-farm-earth">Monthly delivery</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-farm-green">
                  ${(200 * shareOptions[currentShareIndex]?.priceMultiplier || 200).toFixed(2)}
                </p>
                <p className="text-lg text-farm-earth">per month</p>
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

      {/* Cut Breakdown */}
      <div className="w-full bg-gradient-to-b from-green-50 to-green-100 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-semibold text-farm-green text-center mb-12">
            Your Monthly Cut Breakdown
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Object.entries(wholeCowCuts).map(([cut, amount]) => (
              <div key={cut} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <h4 className="text-xl font-semibold text-farm-green mb-3">{cut}</h4>
                  <p className="text-3xl font-bold text-farm-earth">{getShareAmount(amount)}</p>
                  <p className="text-sm text-gray-600 mt-1">per month</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-farm-green text-white rounded-2xl p-8 text-center shadow-xl">
            <h4 className="text-2xl font-bold mb-3">
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
