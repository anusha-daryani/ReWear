import React from 'react';

const UserProfile = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
        <img
          src="https://source.unsplash.com/random/200x200?person"
          alt="User"
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">Yash Bachwani</h3>
      <p className="text-sm text-gray-500">yash@example.com</p>
      <p className="text-sm text-gray-400">Indore, India</p>
    </div>
  );
};

export default UserProfile;
