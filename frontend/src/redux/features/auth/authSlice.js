// import { createSlice } from "@reduxjs/toolkit";

// const initialSlice = {
//   userInfo: localStorage.getItem("userInfo")
//     ? JSON.parse(localStorage.getItem("userInfo"))
//     : null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState: initialSlice,
//   reducers: {
//     setCredentials: (state, action) => {
//       state.userInfo = action.payload;
//       localStorage.setItem("userInfo", JSON.stringify(action.payload));

//       const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
//       localStorage.setItem("expirationTime", expirationTime);
//     },

//     logout: (state) => {
//       state.userInfo = null;
//       localStorage.clear();
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// Initial state with the token stored in local storage, if available
const initialState = {
  token: localStorage.getItem("authToken") || null, // JWT token storage
  expirationTime: localStorage.getItem("tokenExpirationTime") || null, // Token expiration time
};

// Create a slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // Expecting payload with token and optional additional info
      const { token } = action.payload;

      state.token = token; // Store the token in Redux state
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30-day expiration

      // Store the token and its expiration time in local storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("tokenExpirationTime", expirationTime);
      state.expirationTime = expirationTime;
    },

    logout: (state) => {
      // Clear token and related data
      state.token = null;
      state.expirationTime = null;

      // Clear local storage
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenExpirationTime");
    },

    checkTokenValidity: (state) => {
      const now = new Date().getTime();
      if (state.expirationTime && now > state.expirationTime) {
        // If token has expired, clear it from state and local storage
        state.token = null;
        state.expirationTime = null;

        localStorage.removeItem("authToken");
        localStorage.removeItem("tokenExpirationTime");
      }
    },
  },
});

export const { setCredentials, logout, checkTokenValidity } = authSlice.actions;
export default authSlice.reducer;
