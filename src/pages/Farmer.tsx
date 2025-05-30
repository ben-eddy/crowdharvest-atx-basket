
import React, { useState } from 'react';
import { Edit, Save, X, Plus, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

  const totalCommitted = inventory.reduce((sum, item) => sum + (item.committed * item.price), 0);
  const totalRevenue = inventory.reduce((sum, item) => sum + (item.currentStock * item.price), 0);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
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
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventory.length}</div>
              <p className="text-xs text-muted-foreground">
                In marketplace
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Table */}
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
                        <span className={`font-medium ${item.available > 20 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.available} {item.unit}
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
      </div>
    </div>
  );
};

export default Farmer;
