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
  "task/createSubTask",
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

const subTaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    resetSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //* Create Task Cases
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
      });
  },
});

export const { resetSuccess } = subTaskSlice.actions;
export default subTaskSlice.reducer;
