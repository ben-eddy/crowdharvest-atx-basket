
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
    return Math.max(0.3, Math.min(1, shareFraction * 8)); // More visible based on share size
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50 flex flex-col items-center justify-center px-8 py-16">
      
      {/* Improved Cow Diagram */}
      <div className="relative w-full max-w-5xl mb-12">
        <svg viewBox="0 0 900 500" className="w-full h-full drop-shadow-2xl">
          {/* Enhanced definitions */}
          <defs>
            <linearGradient id="cowBase" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2d1810" />
              <stop offset="50%" stopColor="#3d2818" />
              <stop offset="100%" stopColor="#1a0f0a" />
            </linearGradient>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="3" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {/* Main cow body - more accurate proportions */}
          <path
            d="M150 250 Q120 200 160 180 Q200 160 280 170 Q400 150 500 170 Q600 160 680 180 Q720 200 690 250 Q680 300 650 320 L620 370 Q600 390 570 380 L520 370 L460 380 Q440 390 420 380 L370 370 Q340 350 150 250 Z"
            fill="url(#cowBase)"
            stroke="#0f0a08"
            strokeWidth="3"
            filter="url(#shadow)"
          />
          
          {/* Head - more realistic */}
          <ellipse cx="130" cy="230" rx="45" ry="40" fill="url(#cowBase)" stroke="#0f0a08" strokeWidth="3" filter="url(#shadow)"/>
          
          {/* Nose */}
          <ellipse cx="110" cy="240" rx="15" ry="12" fill="#1a0f0a" stroke="#0f0a08" strokeWidth="2"/>
          
          {/* Eyes */}
          <circle cx="125" cy="220" r="4" fill="#000"/>
          <circle cx="140" cy="215" r="4" fill="#000"/>
          
          {/* Ears */}
          <ellipse cx="135" cy="195" rx="12" ry="20" fill="url(#cowBase)" stroke="#0f0a08" strokeWidth="2" transform="rotate(-20 135 195)"/>
          <ellipse cx="155" cy="200" rx="12" ry="20" fill="url(#cowBase)" stroke="#0f0a08" strokeWidth="2" transform="rotate(15 155 200)"/>
          
          {/* Legs - more proportional */}
          <rect x="240" y="370" width="20" height="60" fill="url(#cowBase)" rx="10" filter="url(#shadow)"/>
          <rect x="320" y="370" width="20" height="60" fill="url(#cowBase)" rx="10" filter="url(#shadow)"/>
          <rect x="500" y="370" width="20" height="60" fill="url(#cowBase)" rx="10" filter="url(#shadow)"/>
          <rect x="580" y="370" width="20" height="60" fill="url(#cowBase)" rx="10" filter="url(#shadow)"/>
          
          {/* Hooves */}
          <ellipse cx="250" cy="435" rx="15" ry="8" fill="#0f0a08"/>
          <ellipse cx="330" cy="435" rx="15" ry="8" fill="#0f0a08"/>
          <ellipse cx="510" cy="435" rx="15" ry="8" fill="#0f0a08"/>
          <ellipse cx="590" cy="435" rx="15" ry="8" fill="#0f0a08"/>
          
          {/* Tail */}
          <path d="M690 270 Q720 290 715 320 Q710 340 705 360" stroke="#0f0a08" strokeWidth="12" fill="none" strokeLinecap="round"/>
          
          {/* Udder */}
          <ellipse cx="450" cy="350" rx="35" ry="20" fill="url(#cowBase)" stroke="#0f0a08" strokeWidth="2"/>

          {/* Interactive Cut Sections with proper butcher cut layout */}
          
          {/* NECK */}
          <path
            d="M160 180 Q200 160 240 170 Q220 200 180 210 Q160 190 160 180 Z"
            fill="rgba(239, 68, 68, 0.8)"
            opacity={getOpacity()}
            stroke="#dc2626"
            strokeWidth="3"
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          <text x="200" y="185" textAnchor="middle" className="text-sm font-bold fill-white pointer-events-none">NECK</text>
          
          {/* CHUCK */}
          <path
            d="M240 170 Q280 170 350 180 Q340 230 290 240 Q240 220 240 170 Z"
            fill="rgba(168, 85, 247, 0.8)"
            opacity={getOpacity()}
            stroke="#7c3aed"
            strokeWidth="3"
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          <text x="295" y="205" textAnchor="middle" className="text-sm font-bold fill-white pointer-events-none">CHUCK</text>
          
          {/* RIB */}
          <path
            d="M350 180 Q400 150 450 170 Q440 230 390 240 Q350 220 350 180 Z"
            fill="rgba(34, 197, 94, 0.8)"
            opacity={getOpacity()}
            stroke="#16a34a"
            strokeWidth="3"
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          <text x="400" y="205" textAnchor="middle" className="text-sm font-bold fill-white pointer-events-none">RIB</text>
          
          {/* SHORT LOIN */}
          <path
            d="M450 170 Q500 150 550 170 Q540 230 490 240 Q450 220 450 170 Z"
            fill="rgba(245, 158, 11, 0.8)"
            opacity={getOpacity()}
            stroke="#d97706"
            strokeWidth="3"
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          <text x="500" y="205" textAnchor="middle" className="text-sm font-bold fill-white pointer-events-none">SHORT LOIN</text>
          
          {/* SIRLOIN */}
          <path
            d="M550 170 Q600 160 650 180 Q640 230 590 240 Q550 220 550 170 Z"
            fill="rgba(59, 130, 246, 0.8)"
            opacity={getOpacity()}
            stroke="#2563eb"
            strokeWidth="3"
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          <text x="600" y="205" textAnchor="middle" className="text-sm font-bold fill-white pointer-events-none">SIRLOIN</text>
          
          {/* ROUND */}
          <path
            d="M650 180 Q680 180 690 250 Q660 300 620 290 Q650 230 650 180 Z"
            fill="rgba(220, 38, 127, 0.8)"
            opacity={getOpacity()}
            stroke="#be185d"
            strokeWidth="3"
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          <text x="665" y="235" textAnchor="middle" className="text-sm font-bold fill-white pointer-events-none">ROUND</text>
          
          {/* BRISKET */}
          <path
            d="M240 220 Q290 240 340 240 Q330 290 280 300 Q230 280 240 220 Z"
            fill="rgba(99, 102, 241, 0.8)"
            opacity={getOpacity()}
            stroke="#4338ca"
            strokeWidth="3"
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          <text x="290" y="265" textAnchor="middle" className="text-sm font-bold fill-white pointer-events-none">BRISKET</text>
          
          {/* SHORT PLATE */}
          <path
            d="M340 240 Q390 240 440 240 Q430 290 380 300 Q340 280 340 240 Z"
            fill="rgba(6, 182, 212, 0.8)"
            opacity={getOpacity()}
            stroke="#0891b2"
            strokeWidth="3"
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          <text x="390" y="265" textAnchor="middle" className="text-sm font-bold fill-white pointer-events-none">SHORT PLATE</text>
          
          {/* FLANK */}
          <path
            d="M440 240 Q490 240 540 240 Q530 290 480 300 Q440 280 440 240 Z"
            fill="rgba(239, 68, 68, 0.8)"
            opacity={getOpacity()}
            stroke="#dc2626"
            strokeWidth="3"
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          <text x="490" y="265" textAnchor="middle" className="text-sm font-bold fill-white pointer-events-none">FLANK</text>
          
          {/* FORE SHANK */}
          <path
            d="M280 300 Q330 290 340 320 Q320 350 280 360 Q240 340 280 300 Z"
            fill="rgba(134, 239, 172, 0.8)"
            opacity={getOpacity()}
            stroke="#16a34a"
            strokeWidth="3"
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          <text x="310" y="330" textAnchor="middle" className="text-xs font-bold fill-white pointer-events-none">FORE SHANK</text>
          
          {/* REAR SHANK */}
          <path
            d="M540 290 Q590 290 620 290 Q610 330 570 340 Q540 320 540 290 Z"
            fill="rgba(134, 239, 172, 0.8)"
            opacity={getOpacity()}
            stroke="#16a34a"
            strokeWidth="3"
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          <text x="580" y="315" textAnchor="middle" className="text-xs font-bold fill-white pointer-events-none">REAR SHANK</text>
        </svg>
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
