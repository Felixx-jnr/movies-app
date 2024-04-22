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

// Load user information and expiration time from localStorage, if available
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  tokenExpirationTime: localStorage.getItem("expirationTime")
    ? parseInt(localStorage.getItem("expirationTime"), 10)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { userInfo, token } = action.payload;

      state.userInfo = userInfo;
      state.tokenExpirationTime =
        new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days

      // Store user info and token expiration in localStorage
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("token", token); // Store JWT separately
      localStorage.setItem(
        "expirationTime",
        state.tokenExpirationTime.toString()
      );
    },

    logout: (state) => {
      state.userInfo = null;
      state.tokenExpirationTime = null;

      // Clear relevant localStorage data
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
