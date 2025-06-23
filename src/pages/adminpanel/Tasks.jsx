import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { HiMiniPencilSquare } from "react-icons/hi2";
import {
  addTask,
  deleteTask,
  editTask,
  updateTask,
} from "../../features/tasks/tasksSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import AdminAside from "../../components/Aside/AdminAside";
import { IoPersonCircleOutline } from "react-icons/io5";

const Tasks = () => {
  const [taskData, setTaskData] = useState({});
  const { tasks, editTaskObj } = useSelector((state) => state.tasks);
  const {employees} = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  // ------------ edit data ------------------

  useEffect(() => {
    setTaskData({ ...editTaskObj });
  }, [editTaskObj]);

  // --------------- task change ----------------

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  // --------------- task submit ----------------

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (taskData.id) {
      dispatch(updateTask(taskData));
      toast.success("Update Task");
    } else {
      dispatch(addTask({ ...taskData, id: Date.now() }));
      toast.success("Task Assign");
    }

    setTaskData({});
  };

  //   ------------------ delete task ----------------

  const handleTaskDelete = (id) => {
    dispatch(deleteTask(id));
    toast.error("Task Delete");
  };

  //   ----------------- edit task ----------------

  const handleTaskUpdate = (id) => {
    dispatch(editTask(id));
    console.log(tasks);
  };

  return (
    <>
      <section className="flex gap-x-3 w-full h-full">
        <AdminAside />

        <div className="Dashboard-content bg-white rounded-2xl w-full h-full p-5">
          {/* ----------------- task assign section ---------------- */}

          <div className="bg-slate-100 p-5 h-full rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="task-item md:col-span-2 lg:col-span-1">
                <div className="title mb-5">
                  <h2 className="text-2xl font-bold">Task Assign</h2>
                </div>
                <form
                  method="post"
                  className="space-y-3"
                  onSubmit={handleTaskSubmit}
                >
                  {/* ----------- employee select dropdown ----------- */}

                  <div className="mb-3">
                    <select
                      id="empTasks"
                      name="empTasks"
                      value={taskData.empTasks || ""}
                      onChange={handleTaskChange}
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

                  {/* -------------- task title ----------------- */}

                  <div className="task-title">
                    <input
                      type="text"
                      name="taskTitle"
                      placeholder="Task Title"
                      onChange={handleTaskChange}
                      value={taskData.taskTitle || ""}
                      className="w-full bg-white border-gray-300 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* -------------- task description ----------------- */}

                  <div className="task-description">
                    <textarea
                      type="text"
                      name="taskDescription"
                      placeholder="Task Description"
                      onChange={handleTaskChange}
                      value={taskData.taskDescription || ""}
                      className="w-full bg-white border-gray-300 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* -------------- task date ----------------- */}

                  <div className="task-date">
                    <input
                      type="date"
                      name="taskDate"
                      onChange={handleTaskChange}
                      value={taskData.taskDate || ""}
                      className="w-full bg-white border-gray-300 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <button className="bg-blue-600 hover:bg-blue-500 cursor-pointer py-1 px-5 rounded text-white">
                    Assign
                  </button>
                </form>
              </div>

              {/* --------------- task list ----------------- */}

              <div className="task-item col-span-2 h-full overflow-y-scroll">
                <h3 className="text-2xl font-bold mb-3">Task List</h3>
                {tasks.length === 0 ? (
                  <p className="text-gray-500">No tasks assigned yet.</p>
                ) : (
                  <ul className="space-y-3 overflow-auto h-full px-4">
                    {tasks.map((task, index) => (
                      <li
                        className="py-2 px-4 rounded-xl bg-white shadow flex hover:scale-102 cursor-pointer duration-300"
                        key={index}
                      >
                        <IoPersonCircleOutline
                          className=" me-3 text-gray-500"
                          size={30}
                        />
                        <div>
                          <div className="flex">
                            <h3 className="text-lg font-semibold mb-3">
                              {task.empTasks}
                            </h3>
                          </div>
                          <p className="font-semibold text-gray-500 text-sm capitalize ">
                            Title : {task.taskTitle}
                          </p>
                          <p className="font-semibold text-sm text-gray-500 capitalize">
                            Description : {task.taskDescription}
                          </p>
                        </div>
                        <div className="ms-auto text-right">
                          <p className="font-semibold text-gray-500 capitalize text-sm">
                            Due Date: {task.taskDate}
                          </p>
                          <button
                            onClick={() => handleTaskDelete(task.id)}
                            className="bg-red-500 text-white p-2 rounded mt-3 font-bold"
                          >
                            <FaTrash />
                          </button>
                          <button
                            onClick={() => handleTaskUpdate(task.id)}
                            className="bg-yellow-500 text-white p-2 rounded ms-2 font-bold"
                          >
                            <HiMiniPencilSquare />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tasks;
