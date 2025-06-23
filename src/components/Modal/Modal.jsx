import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../features/modal/modalSlice";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaCircleXmark, FaMoneyBillWave, FaUmbrellaBeach } from "react-icons/fa6";
import { AiOutlineLineChart } from "react-icons/ai";
import { HiBuildingOffice2, HiMiniCalendarDateRange } from "react-icons/hi2";
import { IoMdClock } from "react-icons/io";
import { MdBadge, MdSunny } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { editUser } from "../../features/employees/employeeSlice";
import { useNavigate } from "react-router-dom";

const Modal = () => {

  // --------------- State and Dispatch ---------------

  const { isOpen, employee } = useSelector((state) => state.modal) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate()

  if (!isOpen || !employee) return null;

  // ------------ total earnings ---------------

  const totalEarnings =
    (parseFloat(employee.employeeSalary) || 0) +
    (parseFloat(employee.hra) || 0) +
    (parseFloat(employee.da) || 0) +
    (parseFloat(employee.ta) || 0) +
    (parseFloat(employee.bonus) || 0);

  // ------------ total deductions ---------------

  const totalDeductions =
    (parseFloat(employee.tax) || 0) +
    (parseFloat(employee.pf) || 0) +
    (parseFloat(employee.pt) || 0);

  // ------------ net salary ---------------

  const netSalary = totalEarnings - totalDeductions;

  // ------------- edit employee data -------------

   const handleEdit = (id) => {
      dispatch(editUser(id))
      dispatch(closeModal())
      console.log(id);
      
      navigate('/Form')
    }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-[#8080808c] bg-opacity-40 flex justify-center items-center">
        <div className="bg-white rounded-2xl p-6 w-full max-w-7xl max-h-170 overflow-y-scroll shadow-lg relative">
          {/* ---------------------- employee details ------------------ */}

          <div className="bg-slate-100 p-6 rounded-xl">
            {/* ----------------- haeder -------------------- */}

            <div className="flex items-center justify-between py-3 border-b mb-3">
              <h2 className="text-xl font-semibold text-primary">
                Employee Details
              </h2>

              <button
                onClick={() => dispatch(closeModal())}
                className="font-bold text-gray-500 hover:text-gray-700"
              >
                <FaCircleXmark size={30} />
              </button>
            </div>

            <div className="">
              {/* ------------- personal information ------------*/}

              <div className="profile-header bg-blue-500 text-white p-6 rounded-2xl">
                <div className="container mx-auto">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="w-32 h-32 rounded-full bg-white shadow-lg overflow-hidden border-4 border-white mb-4 md:mb-0 md:mr-6">
                      <IoPersonCircleOutline className=" me-3 text-gray-300 w-full h-full" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h1 className="text-3xl font-bold">
                        {employee.employeeName}
                      </h1>
                      <p className="text-blue-100 text-lg">
                        Senior Software Engineer
                      </p>
                      <div className="flex flex-wrap justify-center md:justify-start mt-2">
                        <div className="flex items-center mr-4 mb-2">
                          <HiBuildingOffice2 />
                          <span className="capitalize ml-2">
                            {employee.department} Department
                          </span>
                        </div>
                        <div className="flex items-center mr-4 mb-2">
                          <MdBadge />
                          <span className="ml-2">EMP ID : {employee.id}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          <i className="fas fa-calendar-alt mr-2" />
                          <span>Joined: 15 Jan 2020</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition" onClick={() => handleEdit(employee.id)}>
                        <i className="fas fa-edit mr-2" /> Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ----------------  --------------- */}
              <div className="container mx-auto mt-3">
                {/* -------------------- new grid section -------------------- */}

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
                  <div className="space-y-3">
                    {/* ---------- performance stats card ---------- */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h2 className="text-xl flex items-center font-bold text-gray-800 mb-4">
                        <AiOutlineLineChart className="text-blue-500 mr-2" size={25} />
                        Performance Metrics
                      </h2>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="stat-card bg-green-50 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-600 mb-1">
                            Performance Rating
                          </p>
                          <p className="text-3xl font-bold text-green-600">
                            4.8
                          </p>
                          <p className="text-xs text-gray-500">out of 5.0</p>
                        </div>
                        <div className="stat-card bg-blue-50 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-600 mb-1">
                            Projects Completed
                          </p>
                          <p className="text-3xl font-bold text-blue-600">24</p>
                          <p className="text-xs text-gray-500">
                            in last 2 years
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Productivity</span>
                          <span>92%</span>
                        </div>
                        <div className="progress-bar bg-gray-200 h-2 overflow-hidden rounded-full">
                          <div
                            className="progress-fill bg-emerald-500 h-full"
                            style={{ width: "92%" }}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Quality</span>
                          <span>89%</span>
                        </div>
                        <div className="progress-bar bg-gray-200 h-2 overflow-hidden rounded-full">
                          <div
                            className="progress-fill bg-emerald-500 h-full"
                            style={{ width: "89%" }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Teamwork</span>
                          <span>95%</span>
                        </div>
                        <div className="progress-bar bg-gray-200 h-2 overflow-hidden rounded-full">
                          <div
                            className="progress-fill bg-emerald-500 h-full"
                            style={{ width: "95%" }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* ---------------- Time Off Card ---------------- */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h2 className="text-xl flex items-center font-bold text-gray-800 mb-4">
                        <HiMiniCalendarDateRange className="mr-2 text-blue-500" size={25} />
                        Time Off Balance
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <p className="text-sm text-gray-600 mb-1">
                            Vacation Days
                          </p>
                          <p className="text-2xl font-bold text-blue-600">12</p>
                          <p className="text-xs text-gray-500">
                            out of 15 days
                          </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                          <p className="text-sm text-gray-600 mb-1">
                            Sick Days
                          </p>
                          <p className="text-2xl font-bold text-green-600">3</p>
                          out of 5 days
                          <p />
                        </div>
                      </div>
                    </div>

                    {/* --------------- working hours card ----------------- */}
                    <div className="bg-white shadow-sm p-6 rounded-2xl">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Work Schedule
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <IoMdClock size={20} className="mr-2" />
                          <span>Monday to Friday</span>
                        </div>
                        <div className="flex items-center mb-2">
                          <MdSunny className="mr-2" size={20} />
                          <span>
                            Shift: {employee.shiftStart} AM -{" "}
                            {employee.shiftEnd} PM
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FaUmbrellaBeach className="mr-2" size={20} />
                          <span>Vacation: 15 days/year</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ----------------- Compensation Card ----------------- */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold flex items-center text-gray-800 mb-4">
                      <FaMoneyBillWave className="text-blue-500 mr-2" />
                      Compensation
                    </h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Basic Salary</p>
                          <p className="font-medium">
                            ${employee.employeeSalary}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">Monthly</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Annual Salary</p>
                          <p className="font-medium">
                            ${employee.employeeSalary * 12}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">Yearly</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">HRA</p>
                          <p className="font-medium">${employee.hra}</p>
                        </div>
                        <span className="text-sm text-gray-500">Monthly</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">DA</p>
                          <p className="font-medium">${employee.da}</p>
                        </div>
                        <span className="text-sm text-gray-500">Monthly</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">TA</p>
                          <p className="font-medium">${employee.ta}</p>
                        </div>
                        <span className="text-sm text-gray-500">Monthly</span>
                      </div>

                      <h2 className="text-xl font-bold flex items-center text-gray-800 mb-4">
                        <FaMoneyBillWave className="text-blue-500 mr-2" />
                        Deductions
                      </h2>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">PF</p>
                          <p className="font-medium">${employee.pf}</p>
                        </div>
                        <span className="text-sm text-gray-500">Monthly</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">pt</p>
                          <p className="font-medium">${employee.pt}</p>
                        </div>
                        <span className="text-sm text-gray-500">Monthly</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Tax</p>
                          <p className="font-medium">${employee.tax}</p>
                        </div>
                        <span className="text-sm text-gray-500">Monthly</span>
                      </div>

                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Bonus</span>
                          <span className="font-medium">${employee.bonus}</span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">
                            Total Earnings
                          </span>
                          <span className="font-medium">${totalEarnings}</span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">
                            Total Deductions
                          </span>
                          <span className="font-medium">
                            ${totalDeductions}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Total Net Wroth
                          </span>
                          <span className="font-bold">${netSalary}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* --------------- Skills & Qualifications Card ----------------- */}
                  <div className="bg-white rounded-xl shadow-sm p-6 col-span-1 md:col-span-2 lg:col-span-2">
                    <h2 className="text-xl font-bold flex items-center text-gray-800 mb-4">
                      <FaTools className="text-blue-500 mr-2" size={20} />
                      Skills &amp; Qualifications
                    </h2>
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-700 mb-4">
                        Technical Key Skills
                      </h3>
                      <div class="flex flex-wrap gap-2">
                        <span class="skill-tag px-3 py-1 rounded-full text-sm font-medium">
                          JavaScript
                        </span>
                        <span class="skill-tag px-3 py-1 rounded-full text-sm font-medium">
                          React
                        </span>
                        <span class="skill-tag px-3 py-1 rounded-full text-sm font-medium">
                          Node.js
                        </span>
                        <span class="skill-tag px-3 py-1 rounded-full text-sm font-medium">
                          TypeScript
                        </span>
                        <span class="skill-tag px-3 py-1 rounded-full text-sm font-medium">
                          AWS
                        </span>
                        <span class="skill-tag px-3 py-1 rounded-full text-sm font-medium">
                          Docker
                        </span>
                        <span class="skill-tag px-3 py-1 rounded-full text-sm font-medium">
                          GraphQL
                        </span>
                        <span class="skill-tag px-3 py-1 rounded-full text-sm font-medium">
                          MongoDB
                        </span>
                      </div>
                    </div>
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-700 mb-3">
                        Soft Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          Leadership
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          Teamwork
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          Problem Solving
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          Communication
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-700 mb-1">
                        Key Skills
                      </h3>
                      <p className="text-sm">{employee.skills}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-700 mb-1">
                        Professional Summary
                      </h3>
                      <p className="text-sm">{employee.description}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-700 mb-1">
                        Additional Notes
                      </h3>
                      <p className="text-sm">{employee.notes}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3"></h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
