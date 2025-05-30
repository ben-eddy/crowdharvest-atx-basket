
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

  const cutColors = {
    'Ground Beef': { bg: 'from-amber-100 to-amber-200', text: 'text-amber-800', border: 'border-amber-300' },
    'Steaks (Ribeye, Sirloin, T-bone)': { bg: 'from-red-100 to-red-200', text: 'text-red-800', border: 'border-red-300' },
    'Roasts (Chuck, Rump, Round)': { bg: 'from-orange-100 to-orange-200', text: 'text-orange-800', border: 'border-orange-300' },
    'Short Ribs & Brisket': { bg: 'from-yellow-100 to-yellow-200', text: 'text-yellow-800', border: 'border-yellow-300' },
    'Tenderloin': { bg: 'from-purple-100 to-purple-200', text: 'text-purple-800', border: 'border-purple-300' },
    'Flank & Skirt Steaks': { bg: 'from-blue-100 to-blue-200', text: 'text-blue-800', border: 'border-blue-300' }
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
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50">
      {/* Hero Section with Enhanced Cow Diagram */}
      <div className="w-full h-screen flex flex-col justify-center items-center px-8 py-16">
        {/* Enhanced Cow Share Diagram */}
        <div className="relative w-full max-w-6xl h-96 mb-16">
          <div className="relative w-full h-full flex justify-center items-center">
            <svg viewBox="0 0 900 450" className="w-full h-full max-w-5xl drop-shadow-2xl">
              {/* Enhanced cow with better proportions and shading */}
              <defs>
                <linearGradient id="cowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B4513" />
                  <stop offset="50%" stopColor="#A0522D" />
                  <stop offset="100%" stopColor="#654321" />
                </linearGradient>
                <linearGradient id="shareGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(34, 197, 94, 0.6)" />
                  <stop offset="100%" stopColor="rgba(16, 185, 129, 0.6)" />
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="4" dy="6" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                </filter>
              </defs>
              
              {/* Main cow body with improved shape */}
              <path
                d="M160 280 Q130 240 150 200 Q170 180 210 190 Q260 170 320 180 Q420 160 520 180 Q620 170 670 190 Q710 200 700 240 Q680 280 650 300 L630 340 Q610 360 580 350 L530 340 L480 350 Q450 360 430 350 L380 340 L330 350 Q310 360 280 350 L230 340 Q200 320 160 280 Z"
                fill="url(#cowGradient)"
                stroke="#654321"
                strokeWidth="3"
                filter="url(#shadow)"
              />
              
              {/* Enhanced cow head with better proportions */}
              <ellipse cx="130" cy="220" rx="50" ry="45" fill="url(#cowGradient)" stroke="#654321" strokeWidth="3" filter="url(#shadow)"/>
              
              {/* Detailed ears */}
              <ellipse cx="110" cy="200" rx="15" ry="25" fill="#654321" transform="rotate(-20 110 200)"/>
              <ellipse cx="150" cy="200" rx="15" ry="25" fill="#654321" transform="rotate(20 150 200)"/>
              
              {/* Eyes and nose details */}
              <circle cx="120" cy="210" r="6" fill="#333"/>
              <circle cx="140" cy="210" r="6" fill="#333"/>
              <circle cx="122" cy="208" r="2" fill="#fff"/>
              <circle cx="142" cy="208" r="2" fill="#fff"/>
              <ellipse cx="130" cy="235" rx="8" ry="5" fill="#333"/>
              <circle cx="127" cy="233" r="1.5" fill="#fff"/>
              <circle cx="133" cy="233" r="1.5" fill="#fff"/>
              
              {/* Enhanced legs with joints and hooves */}
              <rect x="220" y="340" width="20" height="50" fill="url(#cowGradient)" rx="10"/>
              <rect x="300" y="340" width="20" height="50" fill="url(#cowGradient)" rx="10"/>
              <rect x="500" y="340" width="20" height="50" fill="url(#cowGradient)" rx="10"/>
              <rect x="580" y="340" width="20" height="50" fill="url(#cowGradient)" rx="10"/>
              
              {/* Joint details */}
              <circle cx="230" cy="365" r="8" fill="#654321"/>
              <circle cx="310" cy="365" r="8" fill="#654321"/>
              <circle cx="510" cy="365" r="8" fill="#654321"/>
              <circle cx="590" cy="365" r="8" fill="#654321"/>
              
              {/* Enhanced hooves */}
              <ellipse cx="230" cy="395" rx="15" ry="8" fill="#333"/>
              <ellipse cx="310" cy="395" rx="15" ry="8" fill="#333"/>
              <ellipse cx="510" cy="395" rx="15" ry="8" fill="#333"/>
              <ellipse cx="590" cy="395" rx="15" ry="8" fill="#333"/>
              
              {/* Tail */}
              <path d="M700 260 Q720 280 715 300 Q710 320 705 340" stroke="#654321" strokeWidth="8" fill="none" strokeLinecap="round"/>
              <ellipse cx="705" cy="345" rx="6" ry="12" fill="#333"/>
              
              {/* Cut sections with improved styling and labels */}
              {/* Chuck */}
              <rect x="150" y="200" width="100" height="80" fill="rgba(239, 68, 68, 0.3)" stroke="#dc2626" strokeWidth="3" strokeDasharray="10,5" rx="8"/>
              <text x="200" y="245" textAnchor="middle" className="text-sm font-bold fill-red-700">CHUCK</text>
              
              {/* Rib */}
              <rect x="250" y="180" width="100" height="90" fill="rgba(168, 85, 247, 0.3)" stroke="#7c3aed" strokeWidth="3" strokeDasharray="10,5" rx="8"/>
              <text x="300" y="230" textAnchor="middle" className="text-sm font-bold fill-purple-700">RIB</text>
              
              {/* Loin */}
              <rect x="350" y="170" width="130" height="100" fill="rgba(34, 197, 94, 0.3)" stroke="#16a34a" strokeWidth="3" strokeDasharray="10,5" rx="8"/>
              <text x="415" y="225" textAnchor="middle" className="text-sm font-bold fill-green-700">LOIN</text>
              
              {/* Round */}
              <rect x="480" y="180" width="110" height="90" fill="rgba(59, 130, 246, 0.3)" stroke="#2563eb" strokeWidth="3" strokeDasharray="10,5" rx="8"/>
              <text x="535" y="230" textAnchor="middle" className="text-sm font-bold fill-blue-700">ROUND</text>
              
              {/* Brisket */}
              <rect x="200" y="280" width="90" height="50" fill="rgba(245, 158, 11, 0.3)" stroke="#d97706" strokeWidth="3" strokeDasharray="10,5" rx="8"/>
              <text x="245" y="310" textAnchor="middle" className="text-sm font-bold fill-amber-700">BRISKET</text>
              
              {/* Enhanced share overlay with animated gradient */}
              <rect 
                x="150" 
                y="170" 
                width={`${shareFraction * 440}`} 
                height="170" 
                fill="url(#shareGradient)" 
                stroke="#16a34a" 
                strokeWidth="4"
                strokeDasharray="20,10"
                className="transition-all duration-700 ease-in-out"
                rx="12"
              />
            </svg>
            
            {/* Enhanced share indicator with glass morphism */}
            <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-md text-gray-800 px-8 py-6 rounded-3xl shadow-2xl border border-white/50">
              <p className="text-3xl font-bold text-green-600">{shareSize}</p>
              <p className="text-sm text-gray-600 font-medium">Your monthly portion</p>
            </div>
          </div>
        </div>

        {/* Enhanced Share Selection */}
        <div className="w-full max-w-5xl">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/50">
            <div className="flex items-center justify-between mb-10">
              <div className="text-left">
                <p className="text-5xl font-bold text-green-600">{shareSize}</p>
                <p className="text-xl text-gray-600">Monthly delivery</p>
              </div>
              <div className="text-right">
                <p className="text-6xl font-bold text-green-600">
                  ${(200 * shareOptions[currentShareIndex]?.priceMultiplier || 200).toFixed(2)}
                </p>
                <p className="text-xl text-gray-600">per month</p>
              </div>
            </div>
            
            <div className="px-6">
              <Slider
                value={[currentShareIndex]}
                onValueChange={handleSliderChange}
                max={shareOptions.length - 1}
                min={0}
                step={1}
                className="w-full h-8"
              />
              
              <div className="flex justify-between text-base text-gray-500 mt-8 font-semibold">
                <span>{shareOptions[0]?.label}</span>
                <span>{shareOptions[shareOptions.length - 1]?.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Cut Breakdown */}
      <div className="w-full bg-white py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-6xl font-bold text-green-600 mb-6">
              Your Monthly Cut Breakdown
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium grass-fed beef from local farms, carefully portioned for your family
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {Object.entries(wholeCowCuts).map(([cut, amount]) => {
              const colors = cutColors[cut as keyof typeof cutColors];
              return (
                <div key={cut} className={`bg-gradient-to-br ${colors.bg} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 ${colors.border} relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative z-10">
                    <h4 className={`text-xl font-bold ${colors.text} mb-6 leading-tight`}>{cut}</h4>
                    <div className="text-center">
                      <p className={`text-5xl font-bold ${colors.text} mb-2`}>{getShareAmount(amount)}</p>
                      <p className={`text-sm ${colors.text} opacity-70 font-medium`}>per month</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h4 className="text-4xl font-bold mb-6">
                Total Monthly Amount: ~{(Object.values(wholeCowCuts).reduce((a, b) => a + b, 0) * shareFraction).toFixed(1)} lbs
              </h4>
              <p className="text-xl opacity-90 max-w-4xl mx-auto leading-relaxed">
                Premium grass-fed beef from local farms • Humanely raised • No hormones or antibiotics • Cut mix may vary based on availability
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeefCutsDiagram;
