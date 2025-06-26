import React from "react";
import { BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";
import { FaTable, FaTasks } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { toggleSidebar } from "../../features/sidebar/sidebarSlice";
import { logoutUser } from "../../features/auth/authSlice";
import { BsFillPersonPlusFill } from "react-icons/bs";

const AdminAside = () => {

    // ---------- dispatch and selector ---------- 

    const dispatch = useDispatch();
    const open = useSelector(state => state.sidebar.open)

    // --------- handle logout ----------

     const handleLogout = () => {
        dispatch(logoutUser())
        navigate('/') 
      }

  // ------------ path and element ---------------

  const menuData = [
    {
      path: "/DashBoard",
      icon: <MdDashboard />,
      name: "DashBoard",
    },
    {
      path: "/Form",
      icon: <BsFillPersonPlusFill />,
      name: "Form",
    },
    {
      path: "/Tasks",
      icon: <FaTasks />,
      name: "Tasks",
    },
    {
      path: "/Chat",
      icon: <IoMdChatbubbles />,
      name: "Chats",
    },
    {
      path: "/EmpDataTable",
      icon: <FaTable />,
      name: "Table",
    },
  ];

  return (
    <>
      <aside
        className={`bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl relative duration-300 ${
          !open ? "w-72 p-10 sm:h-full lg:h-full" : "w-15 py-14 px-4 sm:h-0 lg:h-full"
        } `}
      >
        <div className="container">
          <div className="menu-title mb-10">
            <h2 className={`text-xl font-semibold ${open && "hidden"}`}>
              Menu
            </h2>

            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 absolute top-0 right-0 me-3 mt-3 text-2xl"
            >
              {!open ? <BiMenuAltRight /> : <BiMenuAltLeft />}
            </button>
          </div>

          <ul className="text-white font-semibold divide-y">
            {menuData.map((val, idx) => {
              const { path, icon, name } = val;

              return (
                <Link to={path}>
                  <li
                    className="aside-item flex items-center space-x-5 my-5 hover:text-gray-200 text-lg"
                    key={idx}
                  >
                    <p className="text-2xl">{icon}</p>
                    <p className={open && "hidden"}>{name}</p>
                  </li>
                </Link>
              );
            })}

            <Link to={"/"} className="absolute bottom-0" onClick={handleLogout}>
              <li className="aside-item flex items-center space-x-5 my-5 hover:text-gray-200 text-lg">
                <p className="text-2xl">
                  <TbLogout2 />
                </p>
                <p className={open && "hidden"}>Logout</p>
              </li>
            </Link>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminAside;
