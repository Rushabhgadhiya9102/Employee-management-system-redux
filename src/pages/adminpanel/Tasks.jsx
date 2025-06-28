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

const Tasks = () => {
  const [taskData, setTaskData] = useState({});
  const { tasks, editTaskObj } = useSelector((state) => state.tasks);
  const { employees } = useSelector((state) => state.employees);
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
      <section className="flex md:gap-x-3 lg:gap-x-6 w-full h-full">
        <AdminAside />

        <div className="Dashboard-content bg-[#f5f5fa] rounded-3xl w-full h-full p-2 md:p-3 lg:p-6">
          {/* ----------------- task assign section ---------------- */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 md:gap-x-3 lg:gap-x-6 mb-2 md:mb-3 lg:mb-6 h-full">
            {/* ----------------- task assign form ---------------- */}

            <div className="task-item md:col-span-2 lg:col-span-1 bg-white rounded-3xl shadow-md p-5">
              <h2 className="text-2xl font-bold mb-4 text-indigo-600">
                Task Assign
              </h2>
              <form
                method="post"
                className="space-y-4"
                onSubmit={handleTaskSubmit}
              >
                {/* ----------------- task name ---------------- */}

                <div className="mb-4">
                  <select
                    id="empTasks"
                    name="empTasks"
                    value={taskData.empTasks || ""}
                    onChange={handleTaskChange}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option disabled selected>
                      Select Employee
                    </option>
                    {employees.map((val, index) => (
                      <option key={index} value={val.employeeName}>
                        {val.employeeName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ----------------- task title ---------------- */}

                <div>
                  <input
                    type="text"
                    name="taskTitle"
                    placeholder="Task Title"
                    onChange={handleTaskChange}
                    value={taskData.taskTitle || ""}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* ----------------- task description ---------------- */}

                <div>
                  <textarea
                    name="taskDescription"
                    placeholder="Task Description"
                    onChange={handleTaskChange}
                    value={taskData.taskDescription || ""}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    rows="4"
                  />
                </div>

                {/* ----------------- task date ---------------- */}

                <div>
                  <input
                    type="date"
                    name="taskDate"
                    onChange={handleTaskChange}
                    value={taskData.taskDate || ""}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <button className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer py-2 px-5 rounded-lg text-white font-semibold transition duration-200">
                  Assign Task
                </button>
              </form>
            </div>

            {/* ----------------- task list ---------------- */}

            <div className="task-item col-span-2 lg:col-span-2 bg-white rounded-3xl shadow-md p-5 max-h-full overflow-y-auto">
              <h3 className="text-2xl font-bold mb-3 text-indigo-600">
                Task List
              </h3>
              {tasks.length === 0 ? (
                <p className="text-gray-500">No tasks assigned yet.</p>
              ) : (
                <ul className="space-y-4">
                  {tasks.map((task, index) => (
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
                        <div className="flex justify-end space-x-1 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleTaskDelete(task.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <FaTrash />
                          </button>
                          <button
                            onClick={() => handleTaskUpdate(task.id)}
                            className="p-1.5 text-indigo-500 hover:bg-indigo-50 rounded-lg"
                          >
                            <HiMiniPencilSquare />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tasks;
