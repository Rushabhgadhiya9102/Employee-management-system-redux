import React, { useEffect, useState } from "react";
import AdminAside from "../../components/Aside/AdminAside";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import Modal from "../../components/Modal/Modal";
import { openModal } from "../../features/modal/modalSlice";


const DashBaord = () => {
  // --------------- use state ------------------

  const [greetings, setGreetings] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [ranking, setRanking] = useState([]);
  const [salaryData, setSalaryData] = useState({});
  const employees = useSelector((state) => state.employees.employees);
  // const {salarySlips} = useSelector(
  //   (state) => state.salarySlips
  // );
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

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

  // ------------------ handle salary slip change -----------------

  const handleSalarySlipChange = (e) =>{
    const {name, value} = e.target
    setSalaryData({ ...salaryData, [name]: value })
  }

  return (
    <>
      <div className="flex gap-x-3 w-full h-full">
        <AdminAside />

        <div className="Dashboard-content bg-white rounded-2xl w-full h-full p-5 overflow-y-scroll scrollbar-none">
          <Header />

          {/* -------------- greeting section -------------- */}

          <div className="grid grid-cols-1 mb-3">
            <div className="dashboard-item">
              <div className="bg-blue-600 text-white h-full p-5 rounded-xl">
                <h2 className="text-3xl font-bold">{greetings} Rushabh</h2>
                <p className="text-2xl mt-3 font-bold">{currentDay}</p>
                <p className="text-2xl font-bold">{currentDate}</p>
              </div>
            </div>
          </div>

          {/* -------------- total sales section -------------- */}

          {/* -------------- total employees section -------------- */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            <div className="h-30">
              <div className="bg-sky-500 text-white h-full p-5 rounded-2xl">
                <p className="font-bold text-2xl">
                  Total Employees <br /> {employees.length}
                </p>
              </div>
            </div>
            <div className=" h-30">
              <div className="bg-yellow-500 text-white h-full p-5 rounded-2xl">
                <p className="font-bold text-2xl">
                  Total Tasks <br /> {tasks.length}
                </p>
              </div>
            </div>
            <div className="h-30">
              <div className="bg-green-600 text-white h-full p-5 rounded-2xl">
                <p className="font-bold text-2xl">
                  Tasks completed <br /> {employees.length}
                </p>
              </div>
            </div>
            <div className=" h-30">
              <div className="bg-red-500 text-white h-full p-5 rounded-2xl">
                <p className="font-bold text-2xl">
                  Tasks Pending <br /> {employees.length}
                </p>
              </div>
            </div>
          </div>

          {/* ------------------ salary slip generator ------------------ */}

          {/* <div className="salary-slip p-5 bg-slate-100 rounded-2xl mb-3">
            <div className="title mb-3">
              <h2 className="text-2xl font-bold">Generate Salary Slip</h2>
            </div>
            <form method="post">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                <div className="select-employee">
                  <select
                    id="empSalarySlip"
                    name="empSalarySlip"
                    value={salaryData.empSalarySlip || ""}
                    onChange={handleSalarySlipChange}
                    className="w-full bg-white border-gray-300 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option disabled selected>
                      Select Department
                    </option>
                    {employees.map((val, index) => (
                      <option key={index} value={val.employeeName}>
                        {val.employeeName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="select-months">
                  <input
                    type="month"
                    name="salaryMonth"
                    onChange={handleSalarySlipChange}
                    value={salaryData.salaryMonth}
                    className="w-full bg-white border-gray-300 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <button onClick={} className="bg-blue-600 hover:bg-blue-500 py-1 px-3 rounded text-white mt-3 cursor-pointer">Generate Slip</button>
            </form>

            <div className="salary-list">
              { salarySlips ? (
                <div className="p-4 bg-white shadow rounded-lg">
                  <h3 className="font-semibold text-lg">Salary Slip Preview</h3>
                  <p> Employee: {selectedEmployee}</p>
                  <p> Month: {selectedMonth}</p>
                </div>
              ) : (
                <p className="text-gray-500 mt-3">
                  Please select employee and month to view salary slip.
                </p>
              )}
            </div>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
            {/* ----------------- ranking performance section ----------------- */}

            <div className="bg-slate-100 p-5 rounded-2xl h-full">
              <div className="title">
                <h2 className="text-2xl font-bold mb-3">
                  Employee Performance
                </h2>
              </div>
              <div role="list" className="space-y-3">
                {ranking.map((val, index) => {
                  const { ranking, employeeName, department } = val;

                  return (
                    <div
                      className="py-2 px-4 rounded-xl bg-white shadow flex items-center hover:scale-102 cursor-pointer duration-300"
                      key={index}
                    >
                      <IoPersonCircleOutline
                        className=" me-3 text-gray-500"
                        size={30}
                      />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {employeeName}
                        </h3>
                        <small className="font-semibold capitalize text-gray-500">
                          {department}
                        </small>
                      </div>
                      <p className="text-blue-500 ms-auto font-bold">
                        Rank : {ranking}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ---------------- employees details section ---------------- */}

            <div className=" bg-slate-100 rounded-2xl p-5 h-full space-y-3">
              <div className="title">
                <h2 className="text-2xl font-bold mb-3">Employees Details</h2>
              </div>
              {employees.map((val, index) => (
                <div
                  className="py-2 px-4 rounded-xl bg-white shadow flex items-center hover:scale-102 cursor-pointer duration-300"
                  key={index}
                >
                  <IoPersonCircleOutline
                    className=" me-3 text-gray-500"
                    size={30}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {val.employeeName}
                    </h3>
                    <small className="font-semibold capitalize text-gray-500">
                      {val.department}
                    </small>
                  </div>

                  <button
                    className="p-2 bg-blue-600 rounded text-white ms-auto cursor-pointer"
                    onClick={() => dispatch(openModal(val))}
                  >
                    <FaEye />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ----------------- employee details modal ---------------- */}

          <Modal />
        </div>
      </div>
    </>
  );
};

export default DashBaord;
