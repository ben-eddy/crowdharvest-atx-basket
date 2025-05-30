
import React from 'react';
import { Calendar, Clock, DollarSign, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const SubscriptionOverview = () => {
  // Mock data - in real app this would come from backend
  const subscription = {
    status: 'active',
    plan: 'Weekly Fresh Box',
    startDate: '2024-01-15',
    nextBilling: '2024-02-08',
    totalSpent: 156.75,
    timeSubscribed: '3 weeks',
    nextPickup: {
      date: '2024-02-01',
      location: 'Mueller Central',
      address: '1910 Aldrich St'
    }
  };

  const currentItems = [
    { name: 'Beef Share - Quarter', quantity: 1, price: 89.99 },
    { name: 'Seasonal Vegetables', quantity: 1, price: 24.99 },
    { name: 'Fresh Eggs', quantity: 2, price: 12.00 }
  ];

  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscription Status</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Active</div>
            <p className="text-xs text-muted-foreground">{subscription.plan}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Subscribed</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-farm-green">{subscription.timeSubscribed}</div>
            <p className="text-xs text-muted-foreground">Since {subscription.startDate}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-farm-green">${subscription.totalSpent}</div>
            <p className="text-xs text-muted-foreground">Supporting local farms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-farm-green">{subscription.nextBilling}</div>
            <p className="text-xs text-muted-foreground">Auto-renewal</p>
          </CardContent>
        </Card>
      </div>

      {/* Next Pickup */}
      <Card>
        <CardHeader>
          <CardTitle>Next Pickup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-farm-green">{subscription.nextPickup.date}</h3>
                <p className="text-farm-earth">{subscription.nextPickup.location}</p>
                <p className="text-sm text-gray-500">{subscription.nextPickup.address}</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">Ready Soon</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Current Items */}
      <Card>
        <CardHeader>
          <CardTitle>Your Current Box Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="ml-2 text-sm text-gray-500">x{item.quantity}</span>
                </div>
                <span className="font-medium text-farm-green">${item.price}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center font-semibold">
                <span>Total this delivery:</span>
                <span className="text-farm-green">${currentItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="h-auto p-4">
          <div className="text-center">
            <Package className="w-6 h-6 mx-auto mb-2" />
            <div className="font-medium">Modify Box</div>
            <div className="text-sm text-gray-500">Change items for next delivery</div>
          </div>
        </Button>

        <Button variant="outline" className="h-auto p-4">
          <div className="text-center">
            <Calendar className="w-6 h-6 mx-auto mb-2" />
            <div className="font-medium">Skip Delivery</div>
            <div className="text-sm text-gray-500">Pause next pickup</div>
          </div>
        </Button>

        <Button variant="outline" className="h-auto p-4">
          <div className="text-center">
            <DollarSign className="w-6 h-6 mx-auto mb-2" />
            <div className="font-medium">Billing History</div>
            <div className="text-sm text-gray-500">View past payments</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionOverview;
