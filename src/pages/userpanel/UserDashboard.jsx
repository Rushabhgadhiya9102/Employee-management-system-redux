import React, { useEffect, useState } from "react";
import UserHeader from "../../components/Header/UserHeader";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { IoPersonCircleOutline } from "react-icons/io5";
import {
  FaEye,
  FaPaperclip,
  FaPaperPlane,
  FaPhone,
  FaVideo,
} from "react-icons/fa6";
import { FaEllipsisV, FaSmile } from "react-icons/fa";
import { openSalaryModal } from "../../features/modal/salaryModalSlice";
import SalaryModal from "../../components/Modal/SalaryModal";
import { addMessage } from "../../features/chats/chatSlice";
import { markTaskAsDone } from "../../features/tasks/tasksSlice";

const UserDashboard = () => {
  const location = useLocation();
  const { selectedEmail } = location.state || {};
  const [greetings, setGreetings] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const { tasks } = useSelector((state) => state.tasks);
  const { employees } = useSelector((state) => state.employees);
  const salarySlips = useSelector((state) => state.salarySlips.salaryArr);
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    const employee = employees.find((emp) => emp.email === selectedEmail);
    setSelectedEmployee(employee);
  }, [selectedEmail, employees]);

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

  const filterTasks = tasks.filter(
    (task) => task.empTasks === selectedEmployee?.employeeName
  );

  const filteredSalarySlips = salarySlips.filter(
    (slip) => slip.employeesSalarySlip === selectedEmployee?.employeeName
  );

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    const options = { year: "numeric", month: "long", day: "numeric" };

    if (hours < 12) {
      setGreetings("Good Morning");
    } else if (hours >= 12 && hours < 18) {
      setGreetings("Good Afternoon");
    } else {
      setGreetings("Good Evening");
    }

    setCurrentDate(date.toLocaleDateString(undefined, options));
    setCurrentDay(date.toLocaleString("en-US", { weekday: "long" }));
  }, []);

  const handleTaskDone = (taskId) => {
    dispatch(markTaskAsDone(taskId));
  };

  return (
    <>
      <article className="bg-[#f5f5fa] h-full w-full rounded-2xl p-6 overflow-y-auto scrollbar-none">
        <UserHeader />

        <div className="userDashboard-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* ------------ greeting user ------------ */}

            <div className="col-span-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h2 className="text-4xl font-bold text-white">
                {greetings} {selectedEmployee?.employeeName || "User"}
              </h2>
              <p className="text-xl text-white/90 mt-2">{currentDay}</p>
              <p className="text-lg text-white/80">{currentDate}</p>
            </div>

            {/* ------------ tasks list ------------ */}

            <div className="task-item lg:col-span-1 bg-white rounded-3xl shadow-lg hover:shadow-xl p-5 max-h-full overflow-y-auto my-6">
              <h3 className="text-2xl font-bold mb-3 text-indigo-600">
                Task List
              </h3>
              {tasks.length === 0 ? (
                <p className="text-gray-500">No tasks assigned yet.</p>
              ) : (
                <ul className="space-y-4">
                  {filterTasks.map((task, index) => (
                    <li
                      key={index}
                      className={`p-4 rounded-3xl flex justify-between items-center group hover:bg-indigo-50 shadow-lg hover:shadow-xl transition-colors ${
                        task.isDone ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {task.empTasks}
                        </p>
                        <p className="text-sm text-gray-500">
                          Title: {task.taskTitle} <br /> Description:{" "}
                          {task.taskDescription}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-2">
                          Due Date: {task.taskDate}
                        </p>
                        <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleTaskDone(task.id)}
                            className="text-green-500 hover:text-white hover:bg-green-600 px-2 py-1 border rounded-xl cursor-pointer"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ------------ salary slip ------------ */}

            <div className="salary-slip bg-white rounded-3xl space-y-3 shadow-lg hover:shadow-xl lg:col-span-1 p-5 my-6">
              <h3 className="text-2xl font-bold mb-3 text-indigo-600">
                Salary Slip
              </h3>
              {filteredSalarySlips.length > 0 ? (
                filteredSalarySlips.map((slip) => (
                  <div
                    key={slip.id}
                    className="bg-gray-50 p-4 rounded-xl flex justify-between items-center group hover:bg-indigo-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{slip.employeesSalarySlip}</p>
                      <p className="text-sm text-gray-500">
                        {slip.month} {slip.year}
                      </p>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          const selected = employees.find(
                            (emp) =>
                              emp.employeeName === slip.employeesSalarySlip
                          );
                          dispatch(openSalaryModal(selected));
                        }}
                        className="p-1.5 text-indigo-500 hover:bg-indigo-50 rounded-lg"
                      >
                        <FaEye />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No salary slips available.</p>
              )}
            </div>

            {/* ------------ chat section ------------ */}

            <div className="w-full h-full col-span-2 shadow-lg hover:shadow-xl rounded-3xl overflow-hidden">
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

              {/* -------------- Message Input -------------- */}

              <div className="border-t border-gray-200 p-4 bg-white">
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition">
                    <FaSmile />
                  </button>
                  <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition">
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

          <SalaryModal />
        </div>
      </article>
    </>
  );
};

export default UserDashboard;
