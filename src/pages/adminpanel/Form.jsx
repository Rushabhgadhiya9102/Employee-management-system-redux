import React, { useEffect, useState } from "react";
import AdminAside from "../../components/Aside/AdminAside";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../../features/employees/employeeSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Form = () => {
  // ------------- States -------------

  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { editData } = useSelector((state) => state.employees);

  // ------------- use effect -----------------

  useEffect(() => {
    setEmployee({ ...editData });
  }, [editData]);

  // ------------ handle change ---------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...employee, [name]: value };
    setEmployee(newData);
  };

  // ------------ handle submit ---------------

  const handleSubmit = (e) => {
    e.preventDefault();

    if (employee.id) {
      dispatch(updateUser(employee));
      toast.info("Update Sucessfull");
    } else {
      dispatch(createUser({ ...employee, id: Date.now() }));
      toast.success("Item Add");
    }
    setEmployee({});

    navigate("/EmpDataTable");
    console.log(employee);
  };

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

  return (
    <>
      <section className="flex md:gap-x-3 lg:gap-x-6 w-full h-full">
        <AdminAside />

        <div className="form-content bg-[#f5f5fa] rounded-2xl w-full h-full p-2 md:p-3 lg:p-6 overflow-y-scroll scrollbar-none">
          <Header />

          <div className="form-section">
            <form method="post" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-3 lg:gap-6 mb-2 md:mb-3 lg:mb-6">
                {/* -------------- personal information -------------- */}

                <div className="form-item">
                  <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6 rounded-3xl h-full">
                    <h2 className="text-xl font-semibold mb-4 text-primary border-b pb-2">
                      Personal Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="employeeName"
                          className="block mb-1 text-sm font-medium"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="employeeName"
                          name="employeeName"
                          value={employee.employeeName || ""}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-1 text-sm font-medium"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={employee.email || ""}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="JohnDoe@gmail.com"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="department"
                          className="block mb-1 text-sm font-medium"
                        >
                          Department
                        </label>
                        <select
                          id="department"
                          name="department"
                          value={employee.department || ""}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border-gray-300 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option disabled>Select Department</option>
                          <option value="hr">Human Resources</option>
                          <option value="tech">Technology</option>
                          <option value="finance">Finance</option>
                          <option value="marketing">Marketing</option>
                          <option value="operations">Operations</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ----------- earnings information ----------- */}

                <div className="form-item">
                  <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6 rounded-3xl">
                    <h2 className="text-xl font-semibold mb-4 text-primary border-b pb-2">
                      Earnings
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="salary"
                          className="block mb-1 text-sm font-medium"
                        >
                          Basic Salary
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            ₹
                          </div>
                          <input
                            type="number"
                            min={15000}
                            max={75000}
                            id="salary"
                            name="employeeSalary"
                            value={employee.employeeSalary || ""}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border-gray-300 border rounded-lg px-4 py-2 pl-8 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder={0.0}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="hra"
                            className="block mb-1 text-sm font-medium"
                          >
                            HRA
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                              ₹
                            </div>
                            <input
                              type="number"
                              min={8000}
                              max={15000}
                              id="hra"
                              name="hra"
                              value={employee.hra || ""}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border-gray-300 border rounded-lg px-4 py-2 pl-8 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder={0.0}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="da"
                            className="block mb-1 text-sm font-medium"
                          >
                            DA
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                              ₹
                            </div>
                            <input
                              type="number"
                              min={20000}
                              max={35000}
                              id="da"
                              name="da"
                              value={employee.da || ""}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border-gray-300 border rounded-lg px-4 py-2 pl-8 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder={0.0}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="ta"
                            className="block mb-1 text-sm font-medium"
                          >
                            TA
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                              ₹
                            </div>
                            <input
                              type="number"
                              min={800}
                              max={3200}
                              id="ta"
                              name="ta"
                              value={employee.ta || ""}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border-gray-300 border rounded-lg px-4 py-2 pl-8 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder={0.0}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="bonus"
                            className="block mb-1 text-sm font-medium"
                          >
                            Bonus
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                              ₹
                            </div>
                            <input
                              type="number"
                              min={4000}
                              max={16000}
                              id="bonus"
                              name="bonus"
                              value={employee.bonus || ""}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border-gray-300 border rounded-lg px-4 py-2 pl-8 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder={0.0}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ----------- deductions information ------------ */}

                <div className="form-item">
                  <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6 rounded-3xl">
                    <h2 className="text-xl font-semibold mb-4 text-primary border-b pb-2">
                      Deductions
                    </h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="pf"
                            className="block mb-1 text-sm font-medium"
                          >
                            PF
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                              ₹
                            </div>
                            <input
                              type="number"
                              min={2600}
                              max={3600}
                              id="pf"
                              name="pf"
                              value={employee.pf || ""}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border-gray-300 border rounded-lg px-4 py-2 pl-8 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder={0.0}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="pt"
                            className="block mb-1 text-sm font-medium"
                          >
                            PT
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                              ₹
                            </div>
                            <input
                              type="number"
                              min={200}
                              max={300}
                              id="pt"
                              name="pt"
                              value={employee.pt || ""}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border-gray-300 border rounded-lg px-4 py-2 pl-8 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder={0.0}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="tax"
                            className="block mb-1 text-sm font-medium"
                          >
                            Tax
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                              ₹
                            </div>
                            <input
                              type="number"
                              min={2000}
                              max={8000}
                              id="tax"
                              name="tax"
                              value={employee.tax || ""}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border-gray-300 border rounded-lg px-4 py-2 pl-8 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder={0.0}
                            />
                          </div>
                        </div>
                        <div className="flex items-end">
                          <button
                            id="calculateBtn"
                            className="w-full bg-primary hover:bg-primary/90 font-medium py-2 px-4 rounded-lg transition"
                          >
                            Calculate Net Salary
                          </button>
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Total Earnings:</span>
                          <span id="totalEarnings" className="font-bold">
                            ₹ {totalEarnings.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Total Deductions:</span>
                          <span id="totalDeductions" className="font-bold">
                            ₹{totalDeductions.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-lg">
                            Net Salary:
                          </span>
                          <span
                            id="netSalary"
                            className="font-bold text-xl text-accent"
                          >
                            ₹ {netSalary.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ----------- services timing --------------- */}

                <div className="form-item">
                  <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl h-full p-6">
                    <h2 className="text-xl font-semibold mb-4 primary-color border-b pb-2">
                      Service Timings
                    </h2>
                    <div>
                      <label
                        htmlFor="shiftStart"
                        className="block text-sm font-medium mb-1"
                      >
                        Shift Start Time
                      </label>
                      <input
                        type="time"
                        id="shiftStart"
                        name="shiftStart"
                        onChange={handleChange}
                        value={employee.shiftStart || ""}
                        className="w-full mb-5 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="shiftEnd"
                        className="block text-sm font-medium mb-1"
                      >
                        Shift End Time
                      </label>
                      <input
                        type="time"
                        id="shiftEnd"
                        name="shiftEnd"
                        onChange={handleChange}
                        value={employee.shiftEnd || ""}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* ------------ employee description  ------------ */}

                <div className="form-item md:col-span-2 lg:col-span-2">
                  <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl p-6">
                    <h2 className="text-xl font-semibold mb-4 primary-color border-b pb-2">
                      Employee Description
                    </h2>
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Professional Summary
                      </label>
                      <textarea
                        id="description"
                        rows={5}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Describe the employee's role, skills, and responsibilities..."
                        name="description"
                        onChange={handleChange}
                        value={employee.description || ""}
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="skills"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Key Skills
                      </label>
                      <input
                        type="text"
                        id="skills"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Add skills separated by commas"
                        name="skills"
                        onChange={handleChange}
                        value={employee.skills || ""}
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="notes"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Additional Notes
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Any other relevant information..."
                        name="notes"
                        onChange={handleChange}
                        value={employee.notes || ""}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-2 px-10 mt-5 rounded-lg cursor-pointer">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Form;
