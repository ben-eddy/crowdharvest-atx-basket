
import React from 'react';
import { Settings, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  frequency: string;
  setFrequency: (freq: string) => void;
  city: string;
  setCity: (city: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  frequency,
  setFrequency,
  city,
  setCity
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const cities = [
    'Austin',
    'Dallas',
    'Houston',
    'San Antonio',
    'Fort Worth',
    'El Paso',
    'Arlington',
    'Corpus Christi',
    'Plano',
    'Lubbock'
  ];

  return (
    <header className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-6">
          {/* Logo and Tagline */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <img 
              src="/lovable-uploads/7f0f62f7-f543-4959-8198-e0ce1b9f87e3.png" 
              alt="Local Pickup Box" 
              className="h-10 sm:h-16 w-auto object-contain flex-shrink-0"
            />
            <div className="text-farm-earth min-w-0 flex-1">
              <h1 className="text-sm sm:text-xl font-bold leading-tight mb-1">
                All the{' '}
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="inline-flex items-center bg-green-500 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-md font-semibold border-0 h-auto min-h-0 w-auto gap-1 text-xs sm:text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg z-50">
                    {cities.map((cityName) => (
                      <SelectItem key={cityName} value={cityName} className="text-sm">
                        {cityName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {' '}Local Farms in One Local Box
              </h1>
              {!isMobile && (
                <p className="text-xs sm:text-sm font-medium text-gray-600 leading-tight">
                  Subscribe to Meet Your Monthly Staple Needs Direct from Local Farmers, Supporting them Directly with your $$ and Saving you Both Time and Hassle.
                </p>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Pickup Frequency - Hide label on mobile */}
            <div className="flex items-center gap-1 sm:gap-2">
              {!isMobile && (
                <span className="text-xs sm:text-sm text-farm-earth font-medium whitespace-nowrap">Frequency:</span>
              )}
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="w-20 sm:w-32 text-xs sm:text-sm bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg z-50">
                  <SelectItem value="weekly" className="text-xs sm:text-sm">Weekly</SelectItem>
                  <SelectItem value="biweekly" className="text-xs sm:text-sm">Bi-weekly</SelectItem>
                  <SelectItem value="monthly" className="text-xs sm:text-sm">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 sm:p-2"
                onClick={() => navigate('/dashboard')}
              >
                <User className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
