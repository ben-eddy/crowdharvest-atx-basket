
import React, { useState } from 'react';
import { Edit, Save, X } from 'lucide-react';
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

interface InventoryManagementProps {
  inventory: InventoryItem[];
  onUpdateInventory: (updatedInventory: InventoryItem[]) => void;
}

const InventoryManagement: React.FC<InventoryManagementProps> = ({ inventory, onUpdateInventory }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<InventoryItem>>({});

  const startEdit = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditValues(item);
  };

  const saveEdit = () => {
    if (editingId && editValues) {
      const updatedInventory = inventory.map(item => 
        item.id === editingId 
          ? { ...item, ...editValues, available: (editValues.currentStock || 0) - (editValues.committed || 0) }
          : item
      );
      onUpdateInventory(updatedInventory);
      setEditingId(null);
      setEditValues({});
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  return (
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
  );
};

export default InventoryManagement;
