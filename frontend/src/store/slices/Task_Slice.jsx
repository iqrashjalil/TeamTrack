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

//* Get Task Details

export const getTaskDetail = createAsyncThunk(
  "task/getTaskDetail",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };

      const { data } = await axios.get(
        `${serverUrl}/api/task/gettask/${id}`,
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

//* Update Task

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.put(
        `${serverUrl}/api/task/updatetask/${id}`,
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
  reducers: {
    resetSuccess(state) {
      state.success = false;
    },
  },
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
      })
      //* Get Task Details Cases
      .addCase(getTaskDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.taskDetail = action.payload.Task;
      })
      .addCase(getTaskDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Update Task Cases
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess } = taskSlice.actions;
export default taskSlice.reducer;
