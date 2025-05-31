
import React, { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Farmer {
  id: string;
  name: string;
  location: string;
  description: string;
  specialties: string[];
  image: string;
  certifications: string[];
}

interface FarmerInfoProps {
  farmers: Farmer[];
}

const FarmerInfo: React.FC<FarmerInfoProps> = ({ farmers }) => {
  const [expandedFarmer, setExpandedFarmer] = useState<string | null>(null);

  const toggleFarmer = (farmerId: string) => {
    setExpandedFarmer(expandedFarmer === farmerId ? null : farmerId);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-farm-green mb-4">Our Local Farmers</h2>
      <div className="space-y-4">
        {farmers.map((farmer) => (
          <div key={farmer.id} className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={farmer.image}
                    alt={farmer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-farm-green">{farmer.name}</h3>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-farm-earth" />
                      <span className="text-sm text-farm-earth">{farmer.location}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFarmer(farmer.id)}
                  className="text-farm-green"
                >
                  {expandedFarmer === farmer.id ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </div>
              
              {expandedFarmer === farmer.id && (
                <div className="mt-4 pt-4 border-t border-green-100">
                  <p className="text-sm text-farm-earth mb-3">{farmer.description}</p>
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-farm-green mb-1">Specialties:</h4>
                    <div className="flex flex-wrap gap-1">
                      {farmer.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  {farmer.certifications.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-farm-green mb-1">Certifications:</h4>
                      <div className="flex flex-wrap gap-1">
                        {farmer.certifications.map((cert, index) => (
                          <span
                            key={index}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerInfo;
