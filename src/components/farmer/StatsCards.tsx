
import React from 'react';
import { TrendingUp, Package, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InventoryItem {
  id: string;
  product: string;
  currentStock: number;
  committed: number;
  available: number;
  price: number;
  unit: string;
}

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

interface StatsCardsProps {
  inventory: InventoryItem[];
  orders: Order[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ inventory, orders }) => {
  const totalCommitted = inventory.reduce((sum, item) => sum + (item.committed * item.price), 0);
  const totalRevenue = inventory.reduce((sum, item) => sum + (item.currentStock * item.price), 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const totalOrders = orders.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Across all products
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Committed Orders</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalCommitted.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            From community buys
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingOrders}</div>
          <p className="text-xs text-muted-foreground">
            Need preparation
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOrders}</div>
          <p className="text-xs text-muted-foreground">
            This month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
