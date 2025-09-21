/**
 * @file store.js
 * @description Configures and exports the main Redux store for the ArgentBank application.
 */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../service/authSlice";

/**
 * The main Redux store for the application.
 * @type {import('@reduxjs/toolkit').EnhancedStore}
 */
export const store = configureStore({
  reducer: {
    /**
     * User authentication slice
     */
    auth: authReducer,
  },
});
