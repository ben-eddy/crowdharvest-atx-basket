
import React from 'react';
import { MapPin, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HeaderProps {
  zipCode: string;
  setZipCode: (zip: string) => void;
  purchaseType: 'single' | 'subscription';
  setPurchaseType: (type: 'single' | 'subscription') => void;
  frequency: string;
  setFrequency: (freq: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  zipCode,
  setZipCode,
  purchaseType,
  setPurchaseType,
  frequency,
  setFrequency
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 farm-gradient rounded-lg flex items-center justify-center text-white font-bold text-lg">
              CH
            </div>
            <div>
              <h1 className="text-xl font-bold text-farm-green">CrowdHarvest</h1>
              <p className="text-xs text-farm-earth">Austin Pilot</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-6">
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

            {/* Purchase Type Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={purchaseType === 'single' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPurchaseType('single')}
                className="text-xs"
              >
                Single Purchase
              </Button>
              <Button
                variant={purchaseType === 'subscription' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPurchaseType('subscription')}
                className="text-xs"
              >
                Subscription
              </Button>
            </div>

            {/* Frequency */}
            {purchaseType === 'subscription' && (
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="w-28 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            )}

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
