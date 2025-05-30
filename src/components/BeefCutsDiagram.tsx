
import React from 'react';

interface BeefCutsDiagramProps {
  shareSize: string;
  shareFraction: number;
}

const BeefCutsDiagram: React.FC<BeefCutsDiagramProps> = ({ shareSize, shareFraction }) => {
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

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 mt-4">
      <h4 className="text-lg font-semibold text-farm-green mb-3 text-center">
        Your {shareSize} Monthly Share
      </h4>
      
      {/* Cow Diagram */}
      <div className="relative mb-4 flex justify-center">
        <svg width="300" height="180" viewBox="0 0 300 180" className="drop-shadow-sm">
          {/* Cow body silhouette */}
          <path
            d="M50 120 Q40 110 45 100 Q50 90 60 85 L70 80 Q80 75 90 75 L100 70 Q110 65 120 65 L180 65 Q190 65 200 70 L210 75 Q220 75 230 80 L240 85 Q250 90 255 100 Q260 110 250 120 L245 130 Q240 140 230 145 L220 150 Q210 155 200 155 L100 155 Q90 155 80 150 L70 145 Q60 140 55 130 Z"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="2"
          />
          
          {/* Head */}
          <ellipse cx="35" cy="105" rx="15" ry="20" fill="#8B4513" stroke="#654321" strokeWidth="2" />
          
          {/* Legs */}
          <rect x="75" y="155" width="8" height="20" fill="#8B4513" stroke="#654321" strokeWidth="1" />
          <rect x="95" y="155" width="8" height="20" fill="#8B4513" stroke="#654321" strokeWidth="1" />
          <rect x="190" y="155" width="8" height="20" fill="#8B4513" stroke="#654321" strokeWidth="1" />
          <rect x="210" y="155" width="8" height="20" fill="#8B4513" stroke="#654321" strokeWidth="1" />
          
          {/* Cut divisions */}
          <line x1="90" y1="75" x2="90" y2="155" stroke="#654321" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="140" y1="65" x2="140" y2="155" stroke="#654321" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="180" y1="65" x2="180" y2="155" stroke="#654321" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="70" y1="110" x2="230" y2="110" stroke="#654321" strokeWidth="1" strokeDasharray="3,3" />
          
          {/* Cut labels */}
          <text x="75" y="95" fontSize="10" fill="#4A2C17" fontWeight="bold" textAnchor="middle">CHUCK</text>
          <text x="115" y="85" fontSize="10" fill="#4A2C17" fontWeight="bold" textAnchor="middle">RIB</text>
          <text x="160" y="85" fontSize="10" fill="#4A2C17" fontWeight="bold" textAnchor="middle">LOIN</text>
          <text x="200" y="85" fontSize="10" fill="#4A2C17" fontWeight="bold" textAnchor="middle">ROUND</text>
          <text x="75" y="135" fontSize="9" fill="#4A2C17" fontWeight="bold" textAnchor="middle">BRISKET</text>
          <text x="115" y="135" fontSize="9" fill="#4A2C17" fontWeight="bold" textAnchor="middle">PLATE</text>
          <text x="160" y="135" fontSize="9" fill="#4A2C17" fontWeight="bold" textAnchor="middle">FLANK</text>
          <text x="200" y="135" fontSize="9" fill="#4A2C17" fontWeight="bold" textAnchor="middle">SHANK</text>
        </svg>
      </div>

      {/* Cut breakdown */}
      <div className="space-y-2">
        <h5 className="font-medium text-farm-green text-center mb-3">Estimated Monthly Cuts:</h5>
        <div className="grid grid-cols-1 gap-2 text-sm">
          {Object.entries(wholeCowCuts).map(([cut, amount]) => (
            <div key={cut} className="flex justify-between items-center bg-white rounded px-3 py-2">
              <span className="text-farm-earth">{cut}</span>
              <span className="font-medium text-farm-green">{getShareAmount(amount)}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-3 p-2 bg-green-100 rounded text-center">
          <p className="text-xs text-farm-green">
            <strong>Total: ~{(Object.values(wholeCowCuts).reduce((a, b) => a + b, 0) * shareFraction).toFixed(1)} lbs</strong>
          </p>
          <p className="text-xs text-farm-earth mt-1">
            Cut mix may vary based on availability
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeefCutsDiagram;
