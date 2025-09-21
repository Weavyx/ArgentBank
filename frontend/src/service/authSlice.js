/**
 * @file authSlice.js
 * @description Redux slice for authentication and user profile management in ArgentBank.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./authService";

/**
 * Async thunk for logging in a user.
 * Dispatches authService.login and returns token and user profile.
 * @async
 * @param {{ email: string, password: string, rememberMe?: boolean }} payload - User credentials
 * @returns {Promise<{token: string, user: Object}>}
 */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password);
      // response = { token, user }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk for fetching user profile information.
 * Uses the token from state or sessionStorage.
 * @async
 * @returns {Promise<Object>} User profile object
 */
export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token || sessionStorage.getItem("token");
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await authService.fetchUserProfile(token);
      return response; // { firstName, lastName, email, etc. }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk for updating user profile (first name, last name).
 * Uses the token from state or sessionStorage.
 * @async
 * @param {{ firstName: string, lastName: string }} payload - New user names
 * @returns {Promise<Object>} Updated user profile object
 */
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ firstName, lastName }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token || sessionStorage.getItem("token");
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await authService.updateUserProfile(
        token,
        firstName,
        lastName
      );
      return response; // { firstName, lastName, email, etc. }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Initial state for authentication slice.
 * @type {{
 *   token: string|null,
 *   user: { firstName: string|null, lastName: string|null },
 *   isAuthenticated: boolean,
 *   loading: boolean,
 *   error: string|null
 * }}
 */
const initialState = {
  token: null,
  user: {
    firstName: null,
    lastName: null,
  },
  isAuthenticated: false,
  loading: false,
  error: null,
};

/**
 * Redux slice for authentication and user profile management.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = {
        firstName: null,
        lastName: null,
      };
      state.isAuthenticated = false;
      state.error = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
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
        state.token = action.payload.token;
        state.user = action.payload.user; // contains firstname, lastname, email
        state.isAuthenticated = true;
        if (action.meta.arg.rememberMe) {
          sessionStorage.setItem("token", action.payload.token);
          sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Updates user information
        // Update sessionStorage if token is present
        if (state.token) {
          sessionStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        // If 401/403 error, clear sessionStorage (expired token)
        if (action.payload === "Cannot fetch profile") {
          state.token = null;
          state.user = { firstName: null, lastName: null };
          state.isAuthenticated = false;
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
        }
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Updates user information
        if (state.token) {
          sessionStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

/**
 * Action to log out the user and clear authentication state.
 */
export const { logout } = authSlice.actions;
export default authSlice.reducer;
