import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BadgeCheck, Truck, Box } from 'lucide-react';

const orders = [
  {
    id: '#ORD12345',
    status: 'Shipped',
    date: '2025-07-10',
    item: 'Nike Air Max 270',
    image: 'https://source.unsplash.com/400x400/?nike-shoes',
    icon: <Truck className="text-blue-500" size={18} />,
  },
  {
    id: '#ORD12346',
    status: 'Delivered',
    date: '2025-07-06',
    item: 'Classic Denim Jacket',
    image: 'https://source.unsplash.com/400x400/?jacket',
    icon: <BadgeCheck className="text-green-500" size={18} />,
  },
  {
    id: '#ORD12347',
    status: 'Processing',
    date: '2025-07-12',
    item: 'White Cotton Shirt',
    image: 'https://source.unsplash.com/400x400/?shirt',
    icon: <Box className="text-yellow-500" size={18} />,
  },
];

const OrdersList = () => {
  return (
    <Card className="w-full h-full bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-4">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <Card key={index} className="flex items-center gap-4 p-3 bg-white/60 dark:bg-black/20 rounded-xl shadow-sm hover:shadow-lg transition">
            <img
              src={order.image}
              alt={order.item}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-800 dark:text-gray-200">{order.item}</div>
              <div className="text-xs text-gray-500">{order.date}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Order ID: {order.id}</div>
            </div>
            <div className="flex items-center gap-1 text-sm">
              {order.icon}
              <span className="text-gray-700 dark:text-gray-300">{order.status}</span>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default OrdersList;
