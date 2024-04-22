// import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../constants";

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;

//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// export const apiSlice = createApi({
//   baseQuery,
//   endpoints: () => ({}),
// });

import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "same-origin", // Adjust depending on your needs
  prepareHeaders: (headers, { getState }) => {
    // Fetch the token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`); // Add the token to the Authorization header
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api", // Name of the reducer
  baseQuery,
  tagTypes: [], // You can define tag types for data caching
  endpoints: (builder) => ({
    // Define your endpoints here
  }),
});
