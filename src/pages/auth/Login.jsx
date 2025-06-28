import React, { useEffect, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  // --------------- use states -----------------

  const [role, setRole] = useState("admin");
  const [selectedEmail, setSelectedEmail] = useState({});
  const { isLoggedIn } = useSelector((state) => state.login);
  const employees = useSelector((state) => state.employees.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ----------------- useEffect ----------------

  useEffect(() => {
    if (isLoggedIn) {
      if (role === "admin") {
        navigate("/DashBoard");
      } else {
        navigate("/UserDashboard", { state: { selectedEmail } });
      }
    }
  }, [isLoggedIn, role, selectedEmail, navigate]);

  // --------------- handle change -----------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...selectedEmail, [name]: value };
    setSelectedEmail(newData);
  };

  // -------------- handle login ----------------

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ role, email: selectedEmail }));
    toast.success("Logging in Successfully");
    console.log(selectedEmail);
  };

  return (
    <>
      <section className="login-form bg-cover bg-no-repeat w-full h-full">
        <div className="flex justify-center items-center w-full h-screen">
          <form
            method="post"
            className="text-center rounded-2xl bg-[#0000005f] backdrop-blur-2xl w-80 sm:w-80 md:w-100 lg:w-120 p-5"
            onSubmit={handleLogin}
          >
            <div className="mb-3 text-white">
              <IoPersonCircleOutline className="mx-auto" size={50} />
              <h2 className="text-lg">
                Welcome {role === "admin" ? "Admin" : "Employee"}
              </h2>
            </div>

            {role === "admin" ? (
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  name="loginEmail"
                  onChange={handleChange}
                  value={selectedEmail.loginEmail || ""}
                  className="bg-white border w-full py-1 px-3 rounded"
                />
              </div>
            ) : (
              <div className="mb-3">
                <select
                  name="employeeEmail"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => setSelectedEmail(e.target.value)}
                >
                  <option value="" selected>
                    Select Employee Email
                  </option>
                  {employees.map((emp, i) => (
                    <option key={i} value={emp.email}>
                      {emp.email}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                name="loginPassword"
                onChange={handleChange}
                value={selectedEmail.loginPassword || ""}
                className="bg-white border w-full py-1 px-3 rounded"
              />
            </div>

            <div className="mb-3 flex space-x-2 justify-center text-white">
              <label className="me-2 font-semibold">You are: </label>
              <div>
                <input
                  type="radio"
                  id="role1"
                  value="admin"
                  name="role"
                  checked={role === "admin"}
                  onChange={(e) => setRole(e.target.value)}
                  className="me-1"
                />
                <label htmlFor="role1">Admin</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="role2"
                  value="employee"
                  name="role"
                  checked={role === "employee"}
                  onChange={(e) => setRole(e.target.value)}
                  className="me-1"
                />
                <label htmlFor="role2">Employee</label>
              </div>
            </div>

            <button className="bg-blue-500 hover:bg-blue-400 text-white duration-300 w-50 mx-auto py-1 rounded mb-5 flex justify-center items-center gap-x-2 cursor-pointer">
              Login <BiLogIn size={20} />
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
