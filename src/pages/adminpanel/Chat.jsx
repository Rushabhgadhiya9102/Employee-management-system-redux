// src/pages/ChatPage.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../../features/chats/chatSlice";
import AdminAside from "../../components/Aside/AdminAside";
import { IoPersonCircleOutline } from "react-icons/io5";

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
    <section className="flex gap-x-3 w-full h-full">
      <AdminAside />

      <div className="Dashboard-content bg-white rounded-2xl w-full h-full p-5 overflow-y-scroll">
        <div className="grid grid-cols-2 gap-3 h-full">

          {/* ------------ employee list ---------------- */}

          <div className="w-full h-full bg-gray-100 p-4 overflow-y-auto rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Employees</h2>
            <ul className="space-y-3">
              {employees.map((emp, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedEmployee(emp)}
                  className={`py-2 px-4 rounded-xl shadow flex items-center hover:scale-102 cursor-pointer duration-300 ${
                    selectedEmployee?.employeeName === emp.employeeName
                      ? "bg-blue-200"
                      : "bg-white"
                  }`}
                >
                  <IoPersonCircleOutline
                    className=" me-3 text-gray-500"
                    size={30}
                  />

                  <div>
                    <h3 className="text-lg font-semibold">
                      {emp.employeeName}
                    </h3>
                    <small className="font-semibold capitalize text-gray-500">
                      {emp.department}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ----------------- chat section -------------- */}

          <div className="w-full h-full">
            <div className="p-4 bg-blue-600 text-white font-bold rounded-t-xl">
              Chat with {selectedEmployee?.employeeName || "..."}
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-100 h-130 space-y-2">
              {filteredMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-sm p-3 rounded-lg text-white ${
                    msg.from === "Manager"
                      ? "bg-blue-600 self-end ml-auto"
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
            <div className="p-4 flex gap-3 items-center">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-500"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
