import React, { useEffect, useState } from "react";
import AdminAside from "../../components/Aside/AdminAside";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { IoPersonCircleOutline } from "react-icons/io5";
import {
  FaCrown,
  FaEye,
  FaPlus,
  FaTasks,
  FaTrash,
} from "react-icons/fa";
import Modal from "../../components/Modal/Modal";
import { openModal } from "../../features/modal/modalSlice";
import {
  addSalary,
  deleteSalary,
} from "../../features/salary-slip/salarySlice";
import { openSalaryModal } from "../../features/modal/salaryModalSlice";
import SalaryModal from "../../components/Modal/SalaryModal";
import { useNavigate } from "react-router-dom";
import { FaTable } from "react-icons/fa6";

const DashBaord = () => {
  // --------------- use state ------------------

  const [greetings, setGreetings] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [ranking, setRanking] = useState([]);
  const [salary, setSalary] = useState({});
  const employees = useSelector((state) => state.employees.employees);
  const salarySlips = useSelector((state) => state.salarySlips.salaryArr);
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // ----------------- use effect start -----------------------

  // ------------------ employees performance ranking ----------------

  useEffect(() => {
    const rankingInterval = setInterval(() => {
      const employeesWithRanking = employees.map((emp) => ({
        ...emp,
        ranking: Math.floor(Math.random() * 100) + 1,
      }));

      employeesWithRanking.sort((a, b) => b.ranking - a.ranking);

      setRanking(employeesWithRanking);
    }, 5000);

    return () => clearInterval(rankingInterval);
  }, []);

  useEffect(() => {
    // ----------------- get current date and day -----------------

    const date = new Date();
    const hours = date.getHours();
    const options = { year: "numeric", month: "long", day: "numeric" };

    if (hours < 12) {
      setGreetings("Good Morning");
    } else if (hours > 12 && hours < 18) {
      setGreetings("Good Afternoon");
    } else {
      setGreetings("Good Evening");
    }

    setCurrentDate(date.toLocaleDateString(undefined, options));
    setCurrentDay(date.toLocaleString("en-US", { weekday: "long" }));
  }, []);

  // ------------------ use effect end ----------------------

  // ------------------ salary slip data ---------------------

  const months = [
    { month: "january" },
    { month: "february" },
    { month: "march" },
    { month: "april" },
    { month: "may" },
    { month: "june" },
    { month: "july" },
    { month: "august" },
    { month: "september" },
    { month: "october" },
    { month: "november" },
    { month: "december" },
  ];

  // ------------- handle change salary slip data ---------------

  const handleChangeSalary = (e) => {
    const { name, value } = e.target;
    setSalary({ ...salary, [name]: value });
  };

  // ------------ handle submit salary slip data ---------------

  const handleSubmitSalary = (e) => {
    e.preventDefault();
    dispatch(addSalary({ ...salary, id: Date.now() }));
    console.log(salary);
    setSalary({});
  };

  // -------------- handle delete salary slip data ----------------

  const handleDeleteSalary = (id) => {
    dispatch(deleteSalary(id));
  };

  // ------------- handle navigate -----------------

  const handleNavigateToForm = ()=>{
    navigate('/Form')
  }

  const handleNavigateToTable = ()=>{
    navigate('/EmpDataTable')
  }

  const handleNavigateToTasks = ()=>{
    navigate('/Tasks')
  }

  return (
    <>
      <article className="flex gap-x-3 w-full h-full">
        <AdminAside />

        <div className="Dashboard-content bg-[#f5f5fa] w-full h-full p-6 rounded-2xl overflow-y-auto scrollbar-none">
          <Header />

          {/* ------------------ Greeting Card ----------------- */}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-lg col-span-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h2 className="text-4xl font-bold text-white">
                {greetings} Rushabh
              </h2>
              <p className="text-xl text-white/90 mt-2">{currentDay}</p>
              <p className="text-lg text-white/80">{currentDate}</p>
            </div>

            {/* ------------------ Quick Stats ---------------- */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-sm text-gray-500">Employees</p>
                <p className="text-2xl font-bold">{employees.length}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-sm text-gray-500">Tasks</p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-green-500">
                  {tasks.filter((t) => t.isDone).length}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-amber-500">
                  {tasks.filter((t) => !t.isDone).length}
                </p>
              </div>
            </div>
          </div>

          {/* ---------------- Main Bento Grid --------------- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* ------------------- Salary Slip Generator ----------------- */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 col-span-1">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
                Salary Slip Generator
              </h2>
              <form onSubmit={handleSubmitSalary} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Employee
                  </label>
                  <select
                    name="employeesSalarySlip"
                    onChange={handleChangeSalary}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp, i) => (
                      <option key={i} value={emp.employeeName}>
                        {emp.employeeName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Month
                    </label>
                    <select
                      name="month"
                      onChange={handleChangeSalary}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2"
                    >
                      <option value="">Select Month</option>
                      {months.map((m, i) => (
                        <option key={i} value={m.month}>
                          {m.month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      name="year"
                      onChange={handleChangeSalary}
                      placeholder="2023"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  Generate Slip
                </button>
              </form>
            </div>

            {/* ---------------- Salary Slip List ---------------- */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 col-span-1">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                Recent Salary Slips
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {salarySlips.map((slip) => (
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
                    <div className="flex space-x-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDeleteSalary(slip.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <FaTrash />
                      </button>
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
                ))}
              </div>
            </div>

            {/* ----------------- Employee Performance -------------- */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 col-span-1">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Top Performers
              </h2>
              <div className="space-y-4">
                {ranking.slice(0, 5).map((emp, i) => (
                  <div
                    key={i}
                    className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-bold">
                          {emp.ranking}
                        </span>
                      </div>
                      {i === 0 && (
                        <div className="absolute -top-1 -right-1 bg-amber-400 rounded-full w-5 h-5 flex items-center justify-center">
                          <FaCrown className="text-white text-xs" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold">{emp.employeeName}</p>
                      <p className="text-sm text-gray-500">{emp.department}</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 font-bold">
                          {emp.ranking}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---------------- Bottom Row --------------- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* -------------- All Employees List --------------- */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 col-span-2">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Employee Directory
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {employees.map((emp, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-all cursor-pointer"
                    onClick={() => dispatch(openModal(emp))}
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
                        <p className="text-sm text-gray-500">
                          {emp.department}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* -------------------- Quick Actions ------------------- */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button onClick={handleNavigateToForm} className="w-full flex items-center justify-between p-3 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                  <span>Add New Employee</span>
                  <FaPlus />
                </button>
                <button onClick={handleNavigateToTable} className="w-full flex items-center justify-between p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                  <span>Employee DataTable</span>
                  <FaTable />
                </button>
                <button onClick={handleNavigateToTasks} className="w-full flex items-center justify-between p-3 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors">
                  <span>Tasks</span>
                  <FaTasks />
                </button>
              </div>
            </div>
          </div>
          {/* ------------ Modals --------------- */}
          <Modal />
          <SalaryModal />
        </div>
      </article>
    </>
  );
};

export default DashBaord;
