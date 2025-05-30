
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatsCards from '@/components/farmer/StatsCards';
import OrderManagement from '@/components/farmer/OrderManagement';
import InventoryManagement from '@/components/farmer/InventoryManagement';
import DeliverySchedule from '@/components/farmer/DeliverySchedule';

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

const Farmer = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      product: 'Grass-Fed Ribeye',
      currentStock: 150,
      committed: 45,
      available: 105,
      price: 24.99,
      unit: 'lb'
    },
    {
      id: '2',
      product: 'Ground Beef 85/15',
      currentStock: 200,
      committed: 78,
      available: 122,
      price: 8.99,
      unit: 'lb'
    },
    {
      id: '3',
      product: 'NY Strip Steak',
      currentStock: 80,
      committed: 32,
      available: 48,
      price: 19.99,
      unit: 'lb'
    },
    {
      id: '4',
      product: 'Lamb Shoulder (1/8 share)',
      currentStock: 20,
      committed: 8,
      available: 12,
      price: 45.00,
      unit: 'share'
    },
    {
      id: '5',
      product: 'Free-Range Turkey (1/4 share)',
      currentStock: 15,
      committed: 6,
      available: 9,
      price: 35.00,
      unit: 'share'
    }
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@email.com',
      items: [
        { product: 'Grass-Fed Ribeye', quantity: 2, unit: 'lb', price: 24.99 },
        { product: 'Ground Beef 85/15', quantity: 5, unit: 'lb', price: 8.99 }
      ],
      total: 94.93,
      status: 'pending',
      orderDate: '2024-01-15',
      deliveryDate: '2024-02-01',
      pickupLocation: 'Mueller Central'
    },
    {
      id: 'ORD-002',
      customerName: 'Mike Chen',
      customerEmail: 'mike@email.com',
      items: [
        { product: 'Lamb Shoulder (1/8 share)', quantity: 1, unit: 'share', price: 45.00 },
        { product: 'NY Strip Steak', quantity: 3, unit: 'lb', price: 19.99 }
      ],
      total: 104.97,
      status: 'prepared',
      orderDate: '2024-01-14',
      deliveryDate: '2024-02-01',
      pickupLocation: 'South Lamar'
    },
    {
      id: 'ORD-003',
      customerName: 'Emily Davis',
      customerEmail: 'emily@email.com',
      items: [
        { product: 'Free-Range Turkey (1/4 share)', quantity: 1, unit: 'share', price: 35.00 }
      ],
      total: 35.00,
      status: 'ready',
      orderDate: '2024-01-13',
      deliveryDate: '2024-02-01',
      pickupLocation: 'Round Rock'
    }
  ]);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 farm-gradient rounded-lg flex items-center justify-center text-white font-bold text-lg">
                CF
              </div>
              <div>
                <h1 className="text-xl font-bold text-farm-green">Circle S Ranch</h1>
                <p className="text-xs text-farm-earth">Farmer Dashboard</p>
              </div>
            </div>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <StatsCards inventory={inventory} orders={orders} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Order Management</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <OrderManagement orders={orders} onUpdateOrderStatus={updateOrderStatus} />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryManagement inventory={inventory} onUpdateInventory={setInventory} />
          </TabsContent>

          <TabsContent value="delivery">
            <DeliverySchedule orders={orders} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Farmer;
