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

// Function to check if token is expired
const isTokenExpired = (expirationTime) => {
  return expirationTime && expirationTime < new Date().getTime();
};

// Retrieve initial state from localStorage
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  tokenExpirationTime: localStorage.getItem("expirationTime")
    ? parseInt(localStorage.getItem("expirationTime"))
    : null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload.user;
      state.isAuthenticated = true;

      // Store token and expiration time in localStorage
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("expirationTime", action.payload.expirationTime);
    },

    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
    },

    checkAuthentication: (state) => {
      const token = localStorage.getItem("token");
      const expirationTime = parseInt(localStorage.getItem("expirationTime"));

      // Check if token is expired or not present
      if (!token || isTokenExpired(expirationTime)) {
        state.userInfo = null;
        state.isAuthenticated = false;
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
      } else {
        state.isAuthenticated = true;
      }
    },
  },
});

export const { setCredentials, logout, checkAuthentication } =
  authSlice.actions;
export default authSlice.reducer;
