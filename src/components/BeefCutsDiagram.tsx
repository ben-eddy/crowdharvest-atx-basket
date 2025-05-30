
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

  // Calculate opacity for visual feedback
  const getOpacity = (baseAmount: number) => {
    const amount = baseAmount * shareFraction;
    return Math.max(0.2, Math.min(1, amount / 30)); // Scale opacity based on amount
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50 flex flex-col items-center justify-center px-8 py-16">
      
      {/* Main Interactive Cow Diagram */}
      <div className="relative w-full max-w-4xl mb-12">
        <svg viewBox="0 0 800 400" className="w-full h-full drop-shadow-2xl">
          {/* Enhanced cow silhouette */}
          <defs>
            <linearGradient id="cowBase" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2d1810" />
              <stop offset="100%" stopColor="#1a0f0a" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Base cow shape */}
          <path
            d="M120 200 Q100 160 130 140 Q160 120 200 130 Q280 110 380 130 Q480 120 520 140 Q550 160 530 200 Q520 240 490 260 L470 300 Q450 320 420 310 L370 300 L320 310 Q300 320 280 310 L230 300 Q200 280 120 200 Z"
            fill="url(#cowBase)"
            stroke="#0f0a08"
            strokeWidth="2"
          />
          
          {/* Head */}
          <ellipse cx="110" cy="180" rx="35" ry="30" fill="url(#cowBase)" stroke="#0f0a08" strokeWidth="2"/>
          
          {/* Legs */}
          <rect x="180" y="300" width="15" height="40" fill="url(#cowBase)" rx="7"/>
          <rect x="240" y="300" width="15" height="40" fill="url(#cowBase)" rx="7"/>
          <rect x="380" y="300" width="15" height="40" fill="url(#cowBase)" rx="7"/>
          <rect x="440" y="300" width="15" height="40" fill="url(#cowBase)" rx="7"/>
          
          {/* Hooves */}
          <ellipse cx="187" cy="345" rx="10" ry="5" fill="#0f0a08"/>
          <ellipse cx="247" cy="345" rx="10" ry="5" fill="#0f0a08"/>
          <ellipse cx="387" cy="345" rx="10" ry="5" fill="#0f0a08"/>
          <ellipse cx="447" cy="345" rx="10" ry="5" fill="#0f0a08"/>
          
          {/* Tail */}
          <path d="M530 210 Q550 230 545 250" stroke="#0f0a08" strokeWidth="8" fill="none" strokeLinecap="round"/>
          
          {/* Interactive Cut Sections */}
          
          {/* NECK */}
          <path
            d="M130 140 Q160 120 200 130 Q180 150 150 160 Q130 150 130 140 Z"
            fill="rgba(239, 68, 68, 0.7)"
            opacity={getOpacity(wholeCowCuts['Ground Beef'] * 0.2)}
            stroke="#dc2626"
            strokeWidth="2"
            filter="url(#glow)"
          />
          <text x="165" y="145" textAnchor="middle" className="text-xs font-bold fill-white">NECK</text>
          <text x="165" y="157" textAnchor="middle" className="text-xs fill-white">{getShareAmount(wholeCowCuts['Ground Beef'] * 0.2)}</text>
          
          {/* CHUCK */}
          <path
            d="M200 130 Q280 110 320 130 Q300 180 250 190 Q200 170 200 130 Z"
            fill="rgba(168, 85, 247, 0.7)"
            opacity={getOpacity(wholeCowCuts['Roasts'] * 0.6)}
            stroke="#7c3aed"
            strokeWidth="2"
            filter="url(#glow)"
          />
          <text x="260" y="150" textAnchor="middle" className="text-xs font-bold fill-white">CHUCK</text>
          <text x="260" y="162" textAnchor="middle" className="text-xs fill-white">{getShareAmount(wholeCowCuts['Roasts'] * 0.6)}</text>
          
          {/* RIB */}
          <path
            d="M320 130 Q380 120 420 130 Q400 180 360 190 Q320 170 320 130 Z"
            fill="rgba(34, 197, 94, 0.7)"
            opacity={getOpacity(wholeCowCuts['Steaks'] * 0.4)}
            stroke="#16a34a"
            strokeWidth="2"
            filter="url(#glow)"
          />
          <text x="370" y="150" textAnchor="middle" className="text-xs font-bold fill-white">RIB</text>
          <text x="370" y="162" textAnchor="middle" className="text-xs fill-white">{getShareAmount(wholeCowCuts['Steaks'] * 0.4)}</text>
          
          {/* LOIN */}
          <path
            d="M420 130 Q480 120 520 140 Q500 180 460 190 Q420 170 420 130 Z"
            fill="rgba(245, 158, 11, 0.7)"
            opacity={getOpacity(wholeCowCuts['Steaks'] * 0.6 + wholeCowCuts['Tenderloin'])}
            stroke="#d97706"
            strokeWidth="2"
            filter="url(#glow)"
          />
          <text x="470" y="150" textAnchor="middle" className="text-xs font-bold fill-white">LOIN</text>
          <text x="470" y="162" textAnchor="middle" className="text-xs fill-white">{getShareAmount(wholeCowCuts['Steaks'] * 0.6 + wholeCowCuts['Tenderloin'])}</text>
          
          {/* SIRLOIN */}
          <path
            d="M480 140 Q520 140 530 200 Q500 210 470 200 Q480 170 480 140 Z"
            fill="rgba(59, 130, 246, 0.7)"
            opacity={getOpacity(wholeCowCuts['Roasts'] * 0.4)}
            stroke="#2563eb"
            strokeWidth="2"
            filter="url(#glow)"
          />
          <text x="500" y="175" textAnchor="middle" className="text-xs font-bold fill-white">SIRLOIN</text>
          <text x="500" y="187" textAnchor="middle" className="text-xs fill-white">{getShareAmount(wholeCowCuts['Roasts'] * 0.4)}</text>
          
          {/* BRISKET */}
          <path
            d="M200 170 Q250 190 280 190 Q270 240 220 250 Q180 230 200 170 Z"
            fill="rgba(220, 38, 127, 0.7)"
            opacity={getOpacity(wholeCowCuts['Short Ribs & Brisket'] * 0.6)}
            stroke="#be185d"
            strokeWidth="2"
            filter="url(#glow)"
          />
          <text x="240" y="215" textAnchor="middle" className="text-xs font-bold fill-white">BRISKET</text>
          <text x="240" y="227" textAnchor="middle" className="text-xs fill-white">{getShareAmount(wholeCowCuts['Short Ribs & Brisket'] * 0.6)}</text>
          
          {/* SHORT PLATE */}
          <path
            d="M280 190 Q360 190 400 190 Q390 240 340 250 Q290 240 280 190 Z"
            fill="rgba(99, 102, 241, 0.7)"
            opacity={getOpacity(wholeCowCuts['Short Ribs & Brisket'] * 0.4)}
            stroke="#4338ca"
            strokeWidth="2"
            filter="url(#glow)"
          />
          <text x="340" y="215" textAnchor="middle" className="text-xs font-bold fill-white">SHORT PLATE</text>
          <text x="340" y="227" textAnchor="middle" className="text-xs fill-white">{getShareAmount(wholeCowCuts['Short Ribs & Brisket'] * 0.4)}</text>
          
          {/* FLANK */}
          <path
            d="M400 190 Q460 190 470 200 Q460 240 420 250 Q400 230 400 190 Z"
            fill="rgba(6, 182, 212, 0.7)"
            opacity={getOpacity(wholeCowCuts['Flank & Skirt'])}
            stroke="#0891b2"
            strokeWidth="2"
            filter="url(#glow)"
          />
          <text x="435" y="215" textAnchor="middle" className="text-xs font-bold fill-white">FLANK</text>
          <text x="435" y="227" textAnchor="middle" className="text-xs fill-white">{getShareAmount(wholeCowCuts['Flank & Skirt'])}</text>
          
          {/* ROUND */}
          <path
            d="M470 200 Q530 200 520 240 Q490 260 460 250 Q470 225 470 200 Z"
            fill="rgba(239, 68, 68, 0.7)"
            opacity={getOpacity(wholeCowCuts['Ground Beef'] * 0.8)}
            stroke="#dc2626"
            strokeWidth="2"
            filter="url(#glow)"
          />
          <text x="495" y="225" textAnchor="middle" className="text-xs font-bold fill-white">ROUND</text>
          <text x="495" y="237" textAnchor="middle" className="text-xs fill-white">{getShareAmount(wholeCowCuts['Ground Beef'] * 0.8)}</text>
          
          {/* SHANK */}
          <path
            d="M220 250 Q280 240 340 250 Q320 290 270 300 Q220 290 220 250 Z"
            fill="rgba(134, 239, 172, 0.7)"
            opacity={getOpacity(wholeCowCuts['Ground Beef'] * 0.3)}
            stroke="#16a34a"
            strokeWidth="2"
            filter="url(#glow)"
          />
          <text x="280" y="270" textAnchor="middle" className="text-xs font-bold fill-white">SHANK</text>
          <text x="280" y="282" textAnchor="middle" className="text-xs fill-white">{getShareAmount(wholeCowCuts['Ground Beef'] * 0.3)}</text>
        </svg>
        
        {/* Share indicator overlay */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-800 px-6 py-4 rounded-2xl shadow-xl border border-white/50">
          <p className="text-2xl font-bold text-green-600">{shareSize}</p>
          <p className="text-sm text-gray-600">Your monthly share</p>
        </div>
      </div>

      {/* Enhanced Share Selection with Pricing */}
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
