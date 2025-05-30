
export interface InventoryItem {
  id: string;
  product: string;
  currentStock: number;
  committed: number;
  available: number;
  price: number;
  unit: string;
}

export interface Order {
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

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface CategoryProgress {
  category: string;
  icon: string;
  currentAmount: number;
  targetAmount: number;
  unit: string;
  priceDropAmount: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  maxMonthly: number;
  shareOptions?: Array<{
    value: number;
    label: string;
    priceMultiplier: number;
  }>;
}

export interface Farmer {
  id: string;
  name: string;
  location: string;
  description: string;
  specialties: string[];
  image: string;
  certifications: string[];
}

export interface CartItem {
  productId: string;
  name: string;
  farm: string;
  price: number;
  quantity: number;
  size: string;
  unit: string;
}
