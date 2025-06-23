import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import sidebarReducer from "../features/sidebar/sidebarSlice";
import employeeReducer from "../features/employees/employeeSlice";
import modalReducer from "../features/modal/modalSlice";
import taskReducer from "../features/tasks/tasksSlice";
import chatReducer from "../features/chats/chatSlice";
import salarySlipReducer from "../features/salary-slip/salarySlice";

const store = configureStore({
  reducer: {
    login: authReducer,
    sidebar: sidebarReducer,
    employees: employeeReducer,
    modal: modalReducer,
    tasks: taskReducer,
    chat: chatReducer,
    salarySlip: salarySlipReducer,
  },
});

export default store;
