import React from "react";
import { FaBell, FaUserShield } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <header className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 mb-6">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600">
              <FaUserShield size={24} color="white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <FaBell color="gray" size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-medium">A</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">Rushabh Gadhiya</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
