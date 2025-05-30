
import React, { useState } from 'react';
import { Edit, Save, X, Plus, TrendingUp, Package, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<InventoryItem>>({});

  const startEdit = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditValues(item);
  };

  const saveEdit = () => {
    if (editingId && editValues) {
      setInventory(prev => 
        prev.map(item => 
          item.id === editingId 
            ? { ...item, ...editValues, available: (editValues.currentStock || 0) - (editValues.committed || 0) }
            : item
        )
      );
      setEditingId(null);
      setEditValues({});
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'prepared': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalCommitted = inventory.reduce((sum, item) => sum + (item.committed * item.price), 0);
  const totalRevenue = inventory.reduce((sum, item) => sum + (item.currentStock * item.price), 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const totalOrders = orders.length;

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

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Order Management</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Schedule</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management & Fulfillment</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Delivery Date</TableHead>
                      <TableHead>Pickup Location</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.customerName}</div>
                            <div className="text-sm text-gray-500">{order.customerEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="text-sm">
                                {item.quantity} {item.unit} {item.product}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.deliveryDate}</TableCell>
                        <TableCell>{order.pickupLocation}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {order.status === 'pending' && (
                              <Button 
                                size="sm" 
                                onClick={() => updateOrderStatus(order.id, 'prepared')}
                              >
                                Mark Prepared
                              </Button>
                            )}
                            {order.status === 'prepared' && (
                              <Button 
                                size="sm" 
                                onClick={() => updateOrderStatus(order.id, 'ready')}
                              >
                                Mark Ready
                              </Button>
                            )}
                            {order.status === 'ready' && (
                              <Button 
                                size="sm" 
                                onClick={() => updateOrderStatus(order.id, 'delivered')}
                              >
                                Mark Delivered
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Product</th>
                        <th className="text-left py-3 px-4 font-medium">Stock</th>
                        <th className="text-left py-3 px-4 font-medium">Committed</th>
                        <th className="text-left py-3 px-4 font-medium">Available</th>
                        <th className="text-left py-3 px-4 font-medium">Price</th>
                        <th className="text-left py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            {editingId === item.id ? (
                              <Input
                                value={editValues.product || ''}
                                onChange={(e) => setEditValues(prev => ({ ...prev, product: e.target.value }))}
                                className="w-full"
                              />
                            ) : (
                              <span className="font-medium">{item.product}</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {editingId === item.id ? (
                              <Input
                                type="number"
                                value={editValues.currentStock || 0}
                                onChange={(e) => setEditValues(prev => ({ ...prev, currentStock: parseInt(e.target.value) || 0 }))}
                                className="w-20"
                              />
                            ) : (
                              <span>{item.currentStock} {item.unit}</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-orange-600 font-medium">
                              {item.committed} {item.unit}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-medium ${item.available > 20 ? 'text-green-600' : item.available > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {item.available} {item.unit}
                              {item.available === 0 && <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded">SOLD OUT</span>}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {editingId === item.id ? (
                              <Input
                                type="number"
                                step="0.01"
                                value={editValues.price || 0}
                                onChange={(e) => setEditValues(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                                className="w-24"
                              />
                            ) : (
                              <span>${item.price.toFixed(2)}/{item.unit}</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {editingId === item.id ? (
                              <div className="flex space-x-2">
                                <Button size="sm" onClick={saveEdit}>
                                  <Save className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={cancelEdit}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            ) : (
                              <Button size="sm" variant="outline" onClick={() => startEdit(item)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery Schedule Tab */}
          <TabsContent value="delivery">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Farmer;
