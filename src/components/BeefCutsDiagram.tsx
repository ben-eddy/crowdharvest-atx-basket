
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
      {/* Hero Section with Enhanced Cow Diagram */}
      <div className="w-full h-screen flex flex-col justify-center items-center px-8 py-16">
        {/* Custom Cow Share Diagram */}
        <div className="relative w-full max-w-5xl h-80 mb-16">
          <div className="relative w-full h-full flex justify-center items-center">
            <svg viewBox="0 0 800 400" className="w-full h-full max-w-4xl drop-shadow-2xl">
              {/* Enhanced Cow body outline with better proportions */}
              <path
                d="M150 250 Q120 210 140 170 Q160 150 200 160 Q250 140 300 150 Q400 130 500 150 Q600 140 650 160 Q680 170 670 210 Q650 250 620 270 L600 310 Q580 330 550 320 L500 310 L450 320 Q420 330 400 320 L350 310 L300 320 Q280 330 250 320 L200 310 Q170 290 150 250 Z"
                fill="#A0522D"
                stroke="#8B4513"
                strokeWidth="4"
                className="drop-shadow-lg"
              />
              
              {/* Enhanced Cow head */}
              <ellipse cx="120" cy="190" rx="45" ry="40" fill="#A0522D" stroke="#8B4513" strokeWidth="3"/>
              
              {/* Cow ears */}
              <ellipse cx="105" cy="175" rx="12" ry="20" fill="#8B4513"/>
              <ellipse cx="135" cy="175" rx="12" ry="20" fill="#8B4513"/>
              
              {/* Simple eye */}
              <circle cx="130" cy="185" r="4" fill="#333"/>
              
              {/* Enhanced legs with hooves */}
              <rect x="200" y="310" width="18" height="45" fill="#8B4513"/>
              <rect x="280" y="310" width="18" height="45" fill="#8B4513"/>
              <rect x="480" y="310" width="18" height="45" fill="#8B4513"/>
              <rect x="560" y="310" width="18" height="45" fill="#8B4513"/>
              
              {/* Hooves */}
              <ellipse cx="209" cy="360" rx="12" ry="6" fill="#333"/>
              <ellipse cx="289" cy="360" rx="12" ry="6" fill="#333"/>
              <ellipse cx="489" cy="360" rx="12" ry="6" fill="#333"/>
              <ellipse cx="569" cy="360" rx="12" ry="6" fill="#333"/>
              
              {/* Cut sections with improved styling */}
              {/* Chuck */}
              <rect x="140" y="170" width="90" height="70" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="3" strokeDasharray="8,4" rx="5"/>
              <text x="185" y="210" textAnchor="middle" className="text-sm font-bold fill-green-800">Chuck</text>
              
              {/* Rib */}
              <rect x="230" y="150" width="90" height="80" fill="rgba(239, 68, 68, 0.4)" stroke="#ef4444" strokeWidth="3" strokeDasharray="8,4" rx="5"/>
              <text x="275" y="195" textAnchor="middle" className="text-sm font-bold fill-red-800">Rib</text>
              
              {/* Loin */}
              <rect x="320" y="140" width="120" height="90" fill="rgba(168, 85, 247, 0.4)" stroke="#a855f7" strokeWidth="3" strokeDasharray="8,4" rx="5"/>
              <text x="380" y="190" textAnchor="middle" className="text-sm font-bold fill-purple-800">Loin</text>
              
              {/* Round */}
              <rect x="440" y="150" width="100" height="80" fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" strokeWidth="3" strokeDasharray="8,4" rx="5"/>
              <text x="490" y="195" textAnchor="middle" className="text-sm font-bold fill-blue-800">Round</text>
              
              {/* Brisket */}
              <rect x="180" y="250" width="80" height="45" fill="rgba(245, 158, 11, 0.4)" stroke="#f59e0b" strokeWidth="3" strokeDasharray="8,4" rx="5"/>
              <text x="220" y="278" textAnchor="middle" className="text-sm font-bold fill-amber-800">Brisket</text>
              
              {/* Enhanced share overlay */}
              <rect 
                x="140" 
                y="140" 
                width={`${shareFraction * 400}`} 
                height="160" 
                fill="rgba(34, 197, 94, 0.3)" 
                stroke="#16a34a" 
                strokeWidth="6"
                strokeDasharray="15,8"
                className="transition-all duration-700 ease-in-out"
                rx="8"
              />
            </svg>
            
            {/* Enhanced share indicator */}
            <div className="absolute top-6 left-6 bg-gradient-to-r from-farm-green to-farm-lightgreen text-white px-8 py-4 rounded-2xl shadow-2xl border-2 border-white">
              <p className="text-2xl font-bold">{shareSize}</p>
              <p className="text-sm opacity-90">Your monthly portion</p>
            </div>
          </div>
        </div>

        {/* Enhanced Share Selection */}
        <div className="w-full max-w-4xl">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
            <div className="flex items-center justify-between mb-8">
              <div className="text-left">
                <p className="text-4xl font-bold text-farm-green">{shareSize}</p>
                <p className="text-lg text-farm-earth opacity-80">Monthly delivery</p>
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold text-farm-green">
                  ${(200 * shareOptions[currentShareIndex]?.priceMultiplier || 200).toFixed(2)}
                </p>
                <p className="text-lg text-farm-earth opacity-80">per month</p>
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
              
              <div className="flex justify-between text-sm text-gray-600 mt-6 font-medium">
                <span>{shareOptions[0]?.label}</span>
                <span>{shareOptions[shareOptions.length - 1]?.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Cut Breakdown */}
      <div className="w-full bg-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-5xl font-bold text-farm-green text-center mb-16">
            Your Monthly Cut Breakdown
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {Object.entries(wholeCowCuts).map(([cut, amount]) => (
              <div key={cut} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-green-100">
                <div className="text-center">
                  <h4 className="text-xl font-bold text-farm-green mb-4">{cut}</h4>
                  <p className="text-4xl font-bold text-farm-earth mb-2">{getShareAmount(amount)}</p>
                  <p className="text-sm text-gray-600">per month</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-farm-green to-farm-lightgreen text-white rounded-3xl p-10 text-center shadow-2xl">
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
