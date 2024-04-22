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

const initialSlice = {
  token: localStorage.getItem("jwt") || null, // Get the JWT from local storage
  expirationTime: localStorage.getItem("expirationTime") || null, // Track token expiration time
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialSlice,
  reducers: {
    setCredentials: (state, action) => {
      const { token, userId } = action.payload; // Expecting a token and possibly additional info
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30-day expiration

      // Store the token and expiration time in Redux state and local storage
      state.token = token;
      state.expirationTime = expirationTime;

      localStorage.setItem("jwt", token); // Store the JWT token
      localStorage.setItem("expirationTime", expirationTime); // Store the expiration time
    },

    logout: (state) => {
      state.token = null;
      state.expirationTime = null;

      localStorage.removeItem("jwt"); // Clear the JWT token
      localStorage.removeItem("expirationTime"); // Clear the expiration time
    },

    checkTokenValidity: (state) => {
      const now = new Date().getTime();
      if (state.expirationTime && now > state.expirationTime) {
        // If token is expired, clear the state and local storage
        state.token = null;
        state.expirationTime = null;

        localStorage.removeItem("jwt");
        localStorage.removeItem("expirationTime");
      }
    },
  },
});

export const { setCredentials, logout, checkTokenValidity } = authSlice.actions;
export default authSlice.reducer;
