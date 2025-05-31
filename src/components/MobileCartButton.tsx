
import React, { useState } from 'react';
import { ShoppingCart, MapPin, Calendar, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';

interface CartItem {
  productId: string;
  name: string;
  farm: string;
  price: number;
  quantity: number;
  size: string;
  unit: string;
}

interface MobileCartButtonProps {
  cartItems: CartItem[];
  pickupLocation: string;
  setPickupLocation: (location: string) => void;
  frequency: string;
  nextBillingDate: string;
}

const MobileCartButton: React.FC<MobileCartButtonProps> = ({
  cartItems,
  pickupLocation,
  setPickupLocation,
  frequency,
  nextBillingDate
}) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  if (!isMobile) return null;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 5.99;
  const total = subtotal + deliveryFee;

  const pickupLocations = [
    { id: 'mueller', name: 'Mueller Central', address: '1910 Aldrich St' },
    { id: 'lamar', name: 'South Lamar', address: '1100 S Lamar Blvd' },
    { id: 'roundrock', name: 'Round Rock', address: '201 W Main St' }
  ];

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          className={`fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 shadow-lg ${
            totalItems > 0 
              ? 'bg-green-600 hover:bg-green-700 text-white animate-pulse' 
              : 'bg-gray-400 hover:bg-gray-500 text-white'
          }`}
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
        </Button>
      </DrawerTrigger>
      
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-farm-green" />
            <span>Your Monthly Order</span>
            {totalItems > 0 && (
              <span className="bg-farm-lightgreen text-white text-xs px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </DrawerTitle>
          <DrawerDescription>
            Pickup {frequency}
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4 max-h-96 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Your basket is empty</p>
              <p className="text-sm text-gray-400">Add some fresh items to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={`${item.productId}-${index}`} className="flex justify-between items-start bg-gray-50 p-3 rounded-lg">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-farm-green">{item.name}</h4>
                    <p className="text-xs text-farm-earth">{item.farm}</p>
                    <p className="text-xs text-gray-500">
                      {item.size} • Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-farm-green">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <DrawerFooter className="space-y-4">
            {/* Pickup Location */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-farm-green mb-2">
                <MapPin className="w-4 h-4" />
                <span>Pickup Location</span>
              </label>
              <Select value={pickupLocation} onValueChange={setPickupLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pickup location" />
                </SelectTrigger>
                <SelectContent>
                  {pickupLocations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      <div>
                        <div className="font-medium">{location.name}</div>
                        <div className="text-xs text-gray-500">{location.address}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Next Billing */}
            <div className="flex items-center space-x-2 text-sm text-farm-earth">
              <Calendar className="w-4 h-4" />
              <span>Next billing: {nextBillingDate}</span>
            </div>

            {/* Order Summary */}
            <div className="space-y-2 pt-4 border-t border-green-100">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pickup Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-farm-green pt-2 border-t border-green-100">
                <span>Monthly Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button 
              className="w-full farm-gradient text-white font-medium"
              disabled={!pickupLocation}
              onClick={() => setIsOpen(false)}
            >
              <Truck className="w-4 h-4 mr-2" />
              Start Subscription
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileCartButton;
