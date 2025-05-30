
import React from 'react';
import { ShoppingCart, MapPin, Calendar, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CartItem {
  productId: string;
  name: string;
  farm: string;
  price: number;
  quantity: number;
  size: string;
  unit: string;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  pickupLocation: string;
  setPickupLocation: (location: string) => void;
  frequency: string;
  nextBillingDate: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  pickupLocation,
  setPickupLocation,
  frequency,
  nextBillingDate
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 5.99;
  const total = subtotal + deliveryFee;

  const pickupLocations = [
    { id: 'mueller', name: 'Mueller Central', address: '1910 Aldrich St' },
    { id: 'lamar', name: 'South Lamar', address: '1100 S Lamar Blvd' },
    { id: 'roundrock', name: 'Round Rock', address: '201 W Main St' }
  ];

  return (
    <div className="w-80 bg-white border-l border-green-100 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-green-100">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="w-5 h-5 text-farm-green" />
          <h2 className="text-lg font-semibold text-farm-green">Your Monthly Order</h2>
          {cartItems.length > 0 && (
            <span className="bg-farm-lightgreen text-white text-xs px-2 py-1 rounded-full">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </div>
        <p className="text-xs text-farm-earth mt-1">Pickup {frequency}</p>
      </div>

      {/* Cart Items */}
      <div className="flex-1 p-6 overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Your basket is empty</p>
            <p className="text-sm text-gray-400">Add some fresh items to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={`${item.productId}-${index}`} className="flex justify-between items-start">
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

      {/* Pickup Location & Billing Info */}
      {cartItems.length > 0 && (
        <div className="p-6 border-t border-green-100 space-y-4">
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
          >
            <Truck className="w-4 h-4 mr-2" />
            Start Subscription
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
