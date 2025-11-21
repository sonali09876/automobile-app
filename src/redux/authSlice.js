// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async login action
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ email });
      }, 2000);
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = "Invalid Login";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
