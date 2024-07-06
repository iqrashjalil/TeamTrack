import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../serverUrl";

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
};

//* Register Thunk

export const register = createAsyncThunk(
  "user/register",
  async (registerData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${serverUrl}/api/auth/register`,
        registerData,
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

//* Login Thunk

export const login = createAsyncThunk(
  "user/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${serverUrl}/api/auth/login`,
        loginData,
        config
      );
      if (data.success) {
        localStorage.setItem("isAuthenticated", true);
      }
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

//* Load User Thunk

export const loadUser = createAsyncThunk("user/loaduser", async () => {
  try {
    const { data } = await axios.get(`${serverUrl}/api/auth/getuser`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      "An unknown error occurred";
    return rejectWithValue(message);
  }
});

//* Logout Thunk

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const { data } = await axios.post(
      `${serverUrl}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    if (data.success) {
      localStorage.removeItem("isAuthenticated");
    }
    return data;
  } catch (error) {
    const message = "Unable to log out";
    return message;
  }
});

//* Get All Project Managers Thunk

export const getAllProjectManagers = createAsyncThunk(
  "user/getAllProjectManagers",
  async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/auth/getprojectmanagers`,
        {
          withCredentials: true,
        }
      );
      return data.project_managers;
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //* Register Cases
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      //* Login Cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      //* Load User Cases
      .addCase(loadUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      //* Logout Cases
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      //* Get All Project Managers Cases
      .addCase(getAllProjectManagers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProjectManagers.fulfilled, (state, action) => {
        state.loading = false;
        state.projectManagers = action.payload;
      })
      .addCase(getAllProjectManagers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
