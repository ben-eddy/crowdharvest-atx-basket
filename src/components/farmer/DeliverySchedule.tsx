
import React from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    product: string;
    quantity: number;
    unit: string;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'prepared' | 'ready' | 'delivered';
  orderDate: string;
  deliveryDate: string;
  pickupLocation: string;
}

interface DeliveryScheduleProps {
  orders: Order[];
}

const DeliverySchedule: React.FC<DeliveryScheduleProps> = ({ orders }) => {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'prepared': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Schedule & Drop-off Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Next Delivery Summary */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Next Delivery: February 1, 2024</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded border p-3">
                <h4 className="font-medium text-green-700 mb-2">Mueller Central</h4>
                <p className="text-sm text-gray-600">1910 Aldrich St</p>
                <p className="text-sm font-medium mt-1">1 order ready</p>
              </div>
              <div className="bg-white rounded border p-3">
                <h4 className="font-medium text-green-700 mb-2">South Lamar</h4>
                <p className="text-sm text-gray-600">1100 S Lamar Blvd</p>
                <p className="text-sm font-medium mt-1">1 order ready</p>
              </div>
              <div className="bg-white rounded border p-3">
                <h4 className="font-medium text-green-700 mb-2">Round Rock</h4>
                <p className="text-sm text-gray-600">201 W Main St</p>
                <p className="text-sm font-medium mt-1">1 order ready</p>
              </div>
            </div>
          </div>

          {/* Orders by Location */}
          <div className="space-y-4">
            {['Mueller Central', 'South Lamar', 'Round Rock'].map(location => {
              const locationOrders = orders.filter(order => order.pickupLocation === location);
              return (
                <div key={location} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">{location}</h4>
                  <div className="space-y-2">
                    {locationOrders.map(order => (
                      <div key={order.id} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">{order.customerName}</span>
                          <span className="ml-2 text-sm text-gray-500">({order.id})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <span className="text-sm font-medium">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliverySchedule;
