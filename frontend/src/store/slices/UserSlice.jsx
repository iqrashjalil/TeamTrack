import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../serverUrl";

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  success: false,
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

export const loadUser = createAsyncThunk(
  "user/loaduser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/auth/getuser`, {
        withCredentials: true,
      });

      localStorage.setItem("user", JSON.stringify(data));
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

//* Get All Users

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  try {
    const { data } = await axios.get(`${serverUrl}/api/auth/getusers`, {
      withCredentials: true,
    });
    return data.All_Users;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      "An unknown error occurred";
    return rejectWithValue(message);
  }
});

//* Get Single User

export const getSingleUser = createAsyncThunk(
  "user/getSingleUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/auth/getprofile/${userId}`,
        { withCredentials: true }
      );
      return data.profile;
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

//* Update Profile

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      // Log userData before making the request
      console.log("userData to be sent:", userData);

      const { data } = await axios.put(
        `${serverUrl}/api/auth/updateuser/${id}`,
        userData,
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

//* Delete User
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${serverUrl}/api/auth/deleteuser/${userId}`,
        { withCredentials: true }
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

//* Get Unassigned Team Members

export const getUnAssignedTeamMembers = createAsyncThunk(
  "user/getUnAssignedTeamMembers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/auth/getunassignedteammembers`,
        { withCredentials: true }
      );
      return data.team_members;
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

//* Remove Team member

export const removeTeamMember = createAsyncThunk(
  "user/removeTeamMember",
  async ({ userId, teamMemberId }, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.delete(
        `${serverUrl}/api/auth/removeteammember/${userId}/${teamMemberId}`,
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
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetSuccess(state) {
      state.success = false;
    },
  },
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
        state.isAuthenticated = false;
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
      })
      //* Get All Users Cases
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allusers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Get Single User Cases
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Update Profile Cases
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Delete Profile Cases
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Get UnAssigned Team Members Cases
      .addCase(getUnAssignedTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUnAssignedTeamMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.unAssignedMembers = action.payload;
      })
      .addCase(getUnAssignedTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Remove Team Members Cases
      .addCase(removeTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(removeTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess } = userSlice.actions;

export default userSlice.reducer;
