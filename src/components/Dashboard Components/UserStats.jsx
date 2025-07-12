import React from 'react';
import { FaHeart, FaShoppingCart, FaTags, FaBoxOpen } from 'react-icons/fa';

const stats = [
  {
    title: 'Total Purchases',
    value: '12',
    icon: <FaShoppingCart className="text-2xl text-indigo-500" />,
  },
  {
    title: 'Wishlist Items',
    value: '8',
    icon: <FaHeart className="text-2xl text-pink-500" />,
  },
  {
    title: 'Listed Products',
    value: '5',
    icon: <FaTags className="text-2xl text-green-500" />,
  },
  {
    title: 'Orders Delivered',
    value: '9',
    icon: <FaBoxOpen className="text-2xl text-yellow-500" />,
  },
];

const UserStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white/20 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-md flex flex-col items-center text-white"
        >
          {stat.icon}
          <h3 className="mt-2 text-lg font-semibold">{stat.value}</h3>
          <p className="text-sm text-white/80">{stat.title}</p>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
