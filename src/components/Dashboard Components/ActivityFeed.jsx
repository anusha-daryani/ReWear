import React from 'react';
import { Clock } from 'lucide-react';

const activities = [
  {
    id: 1,
    title: 'Ordered “Nike Air Max”',
    time: '2 hours ago',
  },
  {
    id: 2,
    title: 'Added “Puma T-Shirt” to Wishlist',
    time: 'Yesterday',
  },
  {
    id: 3,
    title: 'Rated “Levi’s Jeans” 5 stars',
    time: '2 days ago',
  },
  {
    id: 4,
    title: 'Delivered “HRX Jacket”',
    time: '5 days ago',
  },
];

const ActivityFeed = () => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 w-full max-w-xl shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-center gap-4">
            <div className="p-2 bg-white/20 rounded-full text-white">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-white/90 font-medium">{activity.title}</p>
              <p className="text-sm text-white/60">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
