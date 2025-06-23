import React, { useEffect, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/authSLice";

const Login = () => {

    const [role, setRole] = useState('admin')
    const {isLoggedIn} = useSelector(state => state.login)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ------------- use effect -----------------

    useEffect(()=>{

      if(isLoggedIn){

        if(role === 'admin'){
          navigate('/DashBoard')

        }else{
          navigate('/UserDashboard')

        }
      }
    },[isLoggedIn, role, navigate])

    const handleLogin = (e) => {

      e.preventDefault()
      dispatch(loginUser({role}))
      toast.success('Logging in Successfully')

    }

  return (
    <>
      <section className="login-form bg-cover bg-no-repeat w-full h-full">
        <div className="flex justify-center items-center w-full h-screen">
          <form
            method="post"
            className="text-center rounded-2xl bg-[#0000005f] backdrop-blur-2xl w-80 sm:w-80 md:w-100 lg:w-120 p-5"
            onSubmit={handleLogin}
          >
            {/* --------- TITLE ------------ */}

            <div className="mb-3 text-white">
              <IoPersonCircleOutline className="mx-auto" size={50} />
              <h2 className="text-lg">Welcome Admin</h2>
            </div>

            {/* ----------- EMAIL ------------ */}

            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                name="loginEmail"
                className="bg-white border w-full py-1 px-3 rounded"
              />
            </div>

            {/* ------------ PASSWORD ---------- */}
            
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                name="loginPassword"
                className="bg-white border w-full py-1 px-3 rounded"
              />
            </div>

            {/* ------------ BUTTONS ------------ */}

            <div className="mb-3 flex space-x-2 justify-center text-white">
              <label className="me-2 font-semibold">You are: </label>

              <div>
                <input
                  type="radio"
                  id="role1"
                  value="admin"
                  name="role"
                  checked = {role === "admin"}
                  onChange={(e) => setRole(e.target.value)}
                  className="me-1"
                />
                <label htmlFor="role" className="">
                  Admin
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="role2"
                  value="employee"
                  name="role"
                  checked = {role === "employee"}
                  onChange={(e) => setRole(e.target.value)}
                  className="me-1"
                />
                <label htmlFor="role">Employee</label>
              </div>
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-400 text-white duration-300 w-50 mx-auto py-1 rounded mb-5 flex justify-center items-center gap-x-2 cursor-pointer"
            >
              Login <BiLogIn size={20} />
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
