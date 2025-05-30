
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
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Hero Cow Diagram */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 mb-8 shadow-lg">
        <h2 className="text-3xl font-bold text-farm-green mb-6 text-center">
          Your Monthly Beef Share
        </h2>
        
        <div className="flex justify-center mb-6">
          <svg width="600" height="350" viewBox="0 0 600 350" className="drop-shadow-lg">
            {/* Cow body silhouette - larger and more detailed */}
            <path
              d="M100 240 Q80 220 90 200 Q100 180 120 170 L140 160 Q160 150 180 150 L200 140 Q220 130 240 130 L360 130 Q380 130 400 140 L420 150 Q440 150 460 160 L480 170 Q500 180 510 200 Q520 220 500 240 L490 260 Q480 280 460 290 L440 300 Q420 310 400 310 L200 310 Q180 310 160 300 L140 290 Q120 280 110 260 Z"
              fill="#8B4513"
              stroke="#654321"
              strokeWidth="3"
            />
            
            {/* Head */}
            <ellipse cx="70" cy="210" rx="30" ry="40" fill="#8B4513" stroke="#654321" strokeWidth="3" />
            
            {/* Legs */}
            <rect x="150" y="310" width="16" height="40" fill="#8B4513" stroke="#654321" strokeWidth="2" />
            <rect x="190" y="310" width="16" height="40" fill="#8B4513" stroke="#654321" strokeWidth="2" />
            <rect x="380" y="310" width="16" height="40" fill="#8B4513" stroke="#654321" strokeWidth="2" />
            <rect x="420" y="310" width="16" height="40" fill="#8B4513" stroke="#654321" strokeWidth="2" />
            
            {/* Cut divisions */}
            <line x1="180" y1="150" x2="180" y2="310" stroke="#654321" strokeWidth="2" strokeDasharray="6,6" />
            <line x1="280" y1="130" x2="280" y2="310" stroke="#654321" strokeWidth="2" strokeDasharray="6,6" />
            <line x1="360" y1="130" x2="360" y2="310" stroke="#654321" strokeWidth="2" strokeDasharray="6,6" />
            <line x1="140" y1="220" x2="460" y2="220" stroke="#654321" strokeWidth="2" strokeDasharray="6,6" />
            
            {/* Cut labels - larger text */}
            <text x="150" y="185" fontSize="16" fill="#4A2C17" fontWeight="bold" textAnchor="middle">CHUCK</text>
            <text x="230" y="175" fontSize="16" fill="#4A2C17" fontWeight="bold" textAnchor="middle">RIB</text>
            <text x="320" y="175" fontSize="16" fill="#4A2C17" fontWeight="bold" textAnchor="middle">LOIN</text>
            <text x="400" y="175" fontSize="16" fill="#4A2C17" fontWeight="bold" textAnchor="middle">ROUND</text>
            <text x="150" y="255" fontSize="14" fill="#4A2C17" fontWeight="bold" textAnchor="middle">BRISKET</text>
            <text x="230" y="255" fontSize="14" fill="#4A2C17" fontWeight="bold" textAnchor="middle">PLATE</text>
            <text x="320" y="255" fontSize="14" fill="#4A2C17" fontWeight="bold" textAnchor="middle">FLANK</text>
            <text x="400" y="255" fontSize="14" fill="#4A2C17" fontWeight="bold" textAnchor="middle">SHANK</text>
            
            {/* Share indicator overlay */}
            <rect 
              x="100" 
              y="130" 
              width={360 * shareFraction} 
              height="180" 
              fill="rgba(45, 80, 22, 0.3)" 
              stroke="#2d5016" 
              strokeWidth="3"
              strokeDasharray="10,5"
              rx="8"
            />
          </svg>
        </div>
        
        <div className="text-center">
          <p className="text-xl font-semibold text-farm-green">
            You're getting: {shareSize}
          </p>
          <p className="text-farm-earth mt-2">
            Highlighted area shows your monthly portion
          </p>
        </div>
      </div>

      {/* Share Selection Slider */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-green-100">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-farm-green mb-2">
            Choose Your Monthly Share Size
          </h3>
          <p className="text-farm-earth">
            Slide to select how much beef you'd like each month
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-medium text-farm-green">
              {shareSize}
            </span>
            <span className="text-lg font-bold text-farm-green">
              ${(200 * shareOptions[currentShareIndex]?.priceMultiplier || 200).toFixed(2)}/month
            </span>
          </div>
          
          <Slider
            value={[currentShareIndex]}
            onValueChange={handleSliderChange}
            max={shareOptions.length - 1}
            min={0}
            step={1}
            className="w-full h-3"
          />
          
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{shareOptions[0]?.label}</span>
            <span>{shareOptions[shareOptions.length - 1]?.label}</span>
          </div>
        </div>
      </div>

      {/* Cut Breakdown Estimator */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-semibold text-farm-green text-center mb-6">
          Your Monthly Cut Breakdown
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {Object.entries(wholeCowCuts).map(([cut, amount]) => (
            <div key={cut} className="flex justify-between items-center bg-white rounded-lg px-4 py-3 shadow-sm">
              <span className="text-farm-earth font-medium">{cut}</span>
              <span className="font-bold text-farm-green text-lg">{getShareAmount(amount)}</span>
            </div>
          ))}
        </div>
        
        <div className="bg-farm-green text-white rounded-lg p-4 text-center">
          <p className="text-lg font-bold">
            Total Monthly Amount: ~{(Object.values(wholeCowCuts).reduce((a, b) => a + b, 0) * shareFraction).toFixed(1)} lbs
          </p>
          <p className="text-sm mt-2 opacity-90">
            Cut mix may vary based on availability and processing
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeefCutsDiagram;
