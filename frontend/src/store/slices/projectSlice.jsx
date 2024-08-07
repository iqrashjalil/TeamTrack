import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../serverUrl";

const initialState = {
  loading: false,
  error: null,
  projects: [],
  userProjects: [],
};

//* Create Project

export const createProject = createAsyncThunk(
  "project/createProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${serverUrl}/api/project/createproject`,
        projectData,
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

//* Get All Projects

export const getAllProjects = createAsyncThunk(
  "project/getAllProjects",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };

      const { data } = await axios.get(
        `${serverUrl}/api/project/getallprojects`,
        config
      );

      return data.All_Projects;
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

//* Get Single Project

export const getSingleProject = createAsyncThunk(
  "project/getSingleProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };

      const { data } = await axios.get(
        `${serverUrl}/api/project/getproject/${projectId}`,
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

//* Update Project Details
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, updatedFormData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.put(
        `${serverUrl}/api/project/updateproject/${id}`,
        updatedFormData,
        config
      );

      return response.data;
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

//* Delete Project

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.delete(
        `${serverUrl}/api/project/deleteproject/${projectId}`,
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

export const getUserProjects = createAsyncThunk(
  "project/getUserProjects",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${serverUrl}/api/project/getuserprojects`,
        config
      );
      return data.projects;
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

//* Remove Team Member From Project

export const removeMemberFromproject = createAsyncThunk(
  "project/removeMemberFromProject",
  async ({ projectId, teamMemberId }, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.delete(
        `${serverUrl}/api/project/removememberfromproject/${projectId}/${teamMemberId}`,
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

//* Remove Team Member From Project

export const addMember = createAsyncThunk(
  "project/addMember",
  async ({ projectId, teamMemberId, memberData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${serverUrl}/api/project/addmember/${projectId}/${teamMemberId}`,
        memberData,
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

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearSuccess(state) {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //* Create Project Cases
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Get All Project Cases
      .addCase(getAllProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Get Single Project Cases
      .addCase(getSingleProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projectDetails = action.payload.projectDetails;
      })
      .addCase(getSingleProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Update Project Cases
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Delete Project Cases
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      //* Get User Projects Cases
      .addCase(getUserProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.userProjects = action.payload;
      })
      .addCase(getUserProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      //* Remove Team Member From Project Cases
      .addCase(removeMemberFromproject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeMemberFromproject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(removeMemberFromproject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      //* Add Team Member In Project Cases
      .addCase(addMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(addMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearSuccess } = projectSlice.actions;

export default projectSlice.reducer;
