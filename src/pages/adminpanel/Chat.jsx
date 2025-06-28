// src/pages/ChatPage.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../../features/chats/chatSlice";
import AdminAside from "../../components/Aside/AdminAside";
import { IoPersonCircleOutline } from "react-icons/io5";
import {
  FaEllipsisV,
  FaPaperclip,
  FaPaperPlane,
  FaPhone,
  FaSearch,
  FaSmile,
  FaVideo,
} from "react-icons/fa";
import Header from "../../components/Header/Header";

const Chat = () => {
  const employees = useSelector((state) => state.employees.employees);
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (messageText.trim() && selectedEmployee) {
      dispatch(
        addMessage({
          to: selectedEmployee.employeeName,
          from: "Manager",
          content: messageText,
          time: new Date().toLocaleTimeString(),
        })
      );
      setMessageText("");
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.to === selectedEmployee?.employeeName ||
      msg.from === selectedEmployee?.employeeName
  );

  return (
    <section className="flex md:gap-x-3 lg:gap-x-6 w-full h-full">
      <AdminAside />

      <div className="Dashboard-content bg-white rounded-2xl w-full h-full p-2 md:p-3 lg:p-6 overflow-y-scroll">
        <Header />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Employee Communication
          </h1>
          <p className="text-gray-600">Manage and communicate with your team</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
          {/* ------------ employee list ---------------- */}

          <div className="w-full h-full bg-gray-100 overflow-y-scroll rounded-2xl">
            <div className="p-5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Team Members</h2>
                <button className="p-2 rounded-full hover:bg-indigo-700 transition">
                  <FaSearch />
                </button>
              </div>
              <form className="mt-4 relative">
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="w-full px-4 py-2 rounded-lg bg-indigo-400 placeholder-indigo-200 text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <FaSearch className="absolute right-3 top-2.5 text-indigo-200"/>
              </form>
            </div>

            <ul className="space-y-4 p-4">
              {employees.map((emp, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedEmployee(emp)}
                  className={` p-4 rounded-3xl shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                    selectedEmployee?.employeeName === emp.employeeName
                      ? "bg-indigo-200"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <IoPersonCircleOutline
                        className="text-indigo-600"
                        size={20}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{emp.employeeName}</p>
                      <p className="text-sm text-gray-500">{emp.department}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ----------------- chat section -------------- */}

          <div className="w-full h-full">
            <div className="p-4 bg-indigo-600 text-white flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <IoPersonCircleOutline
                    className="text-indigo-600"
                    size={20}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {selectedEmployee?.employeeName || "..."}
                  </h3>
                  <p className="text-xs text-indigo-100 capitalize">
                    {selectedEmployee?.department || "..."} • Active now
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full hover:bg-indigo-700 transition">
                  <FaPhone />
                </button>
                <button className="p-2 rounded-full hover:bg-indigo-700 transition">
                  <FaVideo />
                </button>
                <button className="p-2 rounded-full hover:bg-indigo-700 transition">
                  <FaEllipsisV />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-gray-100 h-130 space-y-2">
              {filteredMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-sm p-3 rounded-lg text-white ${
                    msg.from === "Manager"
                      ? "bg-indigo-600 self-end ml-auto"
                      : "bg-gray-400"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-right mt-1 opacity-70">
                    {msg.time}
                  </p>
                </div>
              ))}
            </div>

            {/* Message Input */}

            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hidden lg:block transition">
                  <FaSmile />
                </button>
                <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hidden lg:block transition">
                  <FaPaperclip />
                </button>
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
