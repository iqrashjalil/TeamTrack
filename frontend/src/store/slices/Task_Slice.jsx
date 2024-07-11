import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../serverUrl";

const initialState = {
  loading: false,
  error: null,
  allTasks: [],
  success: false,
};

//* Fetch Tasks Related to project

export const projectTasks = createAsyncThunk(
  "task/projectTasks",
  async (projectId, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${serverUrl}/api/task/gettasks/${projectId}`,
        config
      );

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        "An unknown error occurred";
      return rejectWithValue(message);
    }
  }
);

//* Create Task

export const createTask = createAsyncThunk(
  "task/createtask",
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${serverUrl}/api/task/createtask`,
        formData,
        config
      );
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        "An unknown error occurred";
      return rejectWithValue(message);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //* Fetch Tasks Cases
      .addCase(projectTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(projectTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.allTasks = action.payload.tasks;
      })
      .addCase(projectTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Create Task Cases
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
