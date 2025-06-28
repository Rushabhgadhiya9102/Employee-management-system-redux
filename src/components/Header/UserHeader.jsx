import React, { useEffect, useState } from "react";
import { FaBell, FaUserShield } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";
import { TbLogout2 } from "react-icons/tb";

const UserHeader = () => {
  // ----------- states and props -----------

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees } = useSelector((state) => state.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { selectedEmail } = location.state || {};

  // -------------- use effect -------------

  useEffect(() => {
    const employee = employees.find((emp) => emp.email === selectedEmail);
    setSelectedEmployee(employee);
  }, [selectedEmail, employees]);

  // ----------- handle logout -----------

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <>
      <header className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 mb-6">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600">
              <FaUserShield size={24} color="white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">
              Employee Dashboard
            </h1>
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
                <p className="text-sm font-medium text-gray-700">
                  Employee User
                </p>
                <p className="text-xs text-gray-500">
                  {selectedEmployee?.employeeName || "User"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full bg-gray-200"
            >
              <TbLogout2 size={25} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default UserHeader;
