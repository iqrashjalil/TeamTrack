import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const register = createAsyncThunk(
  "user/register",
  async (registerData, { rejectWithValue }) => {
    try {
    } catch (error) {}
  }
);
