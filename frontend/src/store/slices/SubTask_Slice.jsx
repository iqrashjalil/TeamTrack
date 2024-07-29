import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../serverUrl";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

//* Create Sub-Task

export const createSubTask = createAsyncThunk(
  "subtask/createSubTask",
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${serverUrl}/api/subtask/createsubtask`,
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

//* Subtask Detail

export const getSubtaskDetail = createAsyncThunk(
  "subtask/getSubtaskDetail",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${serverUrl}/api/subtask/getsubtask/${id}`,
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

//* Update Subtask

export const updateSubtask = createAsyncThunk(
  "subtask/updateSubtask",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${serverUrl}/api/subtask/updatesubtask/${id}`,
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

const subTaskSlice = createSlice({
  name: "subtask",
  initialState,
  reducers: {
    resetSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //* Create subtask Cases
      .addCase(createSubTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(createSubTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //*  subtask Detail Cases
      .addCase(getSubtaskDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubtaskDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.subtaskDetail = action.payload.subtask;
      })
      .addCase(getSubtaskDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Update Subtask Cases
      .addCase(updateSubtask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubtask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(updateSubtask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess } = subTaskSlice.actions;
export default subTaskSlice.reducer;
