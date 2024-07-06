import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import projectSlice from "./slices/projectSlice";

const store = configureStore({
  reducer: {
    users: UserSlice,
    projects: projectSlice,
  },
});

export default store;
