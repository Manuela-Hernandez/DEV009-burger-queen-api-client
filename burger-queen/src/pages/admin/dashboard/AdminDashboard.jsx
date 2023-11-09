import { useState } from 'react';
import AllUsers from '../users/Users';
import AllProducts from '../products/Products';

export default function Dashboard(){
  const [activeTab, setActiveTab] = useState('users');

  const navigateTo = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="w-11/12 m-auto p-8">
      <div className="flex mb-6">
      <button
          className={`p-4 mr-2 ${activeTab === 'users' ? 'bg-bgqueen-primary text-white' : 'bg-bgqueen-gray'}`}
          onClick={() => navigateTo('users')}
        >
          Manage users
        </button>
        <button
          className={`p-4 ${activeTab === 'menu' ? 'bg-bgqueen-primary text-white' : 'bg-bgqueen-gray'}`}
          onClick={() => navigateTo('menu')}
        >
          Manage menu
        </button>
      </div>
      <div className="border p-4">
        {activeTab === 'users' && <AllUsers />}
        {activeTab === 'menu' && <AllProducts />}
      </div>
    </div>
  );
};
