
import React from 'react';
import { MapPin, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HeaderProps {
  zipCode: string;
  setZipCode: (zip: string) => void;
  frequency: string;
  setFrequency: (freq: string) => void;
  city: string;
  setCity: (city: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  zipCode,
  setZipCode,
  frequency,
  setFrequency,
  city,
  setCity
}) => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center space-x-4 max-w-2xl">
            <img 
              src="/lovable-uploads/7f0f62f7-f543-4959-8198-e0ce1b9f87e3.png" 
              alt="Local Pickup Box" 
              className="h-20 w-auto object-contain flex-shrink-0"
            />
            <div className="text-farm-earth">
              <h1 className="text-lg font-bold leading-tight">
                All the <span className="bg-green-500 text-white px-2 py-1 rounded font-semibold">{city}</span> Local Farms in One Local Box
              </h1>
              <p className="text-sm font-medium mt-1 leading-tight">
                Subscribe to Meet Your Monthly Staple Needs Direct from Local Farmers, Supporting them Directly with your $$ and Saving you Both Time and Hassle.
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-6">
            {/* City Selection */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-farm-earth">City:</span>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="w-28 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((cityName) => (
                    <SelectItem key={cityName} value={cityName}>
                      {cityName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Zip Code */}
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-farm-earth" />
              <Input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="78701"
                className="w-20 text-sm"
              />
            </div>

            {/* Monthly Pickup Frequency */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-farm-earth">Pickup frequency:</span>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="w-32 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
