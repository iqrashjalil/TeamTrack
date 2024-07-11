import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import projectSlice from "./slices/projectSlice";
import Task_Slice from "./slices/Task_Slice";
import SubTask_Slice from "./slices/SubTask_Slice";

const store = configureStore({
  reducer: {
    users: UserSlice,
    projects: projectSlice,
    tasks: Task_Slice,
    subTasks: SubTask_Slice,
  },
});

export default store;
