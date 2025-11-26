import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const loginUser = (credentials) => (dispatch) => {
  dispatch(loginStart());
  // Simulate login API call with hardcoded validation
  return new Promise((resolve) => {
    setTimeout(() => {
      if (credentials.email === 'admin@gmail.com' && credentials.password === 'Car@123') {
        dispatch(loginSuccess({ email: credentials.email, name: 'Admin User' }));
        resolve(true);
      } else {
        dispatch(loginFailure('Invalid credentials'));
        resolve(false);
      }
    }, 1000);
  });
};

export default authSlice.reducer;
