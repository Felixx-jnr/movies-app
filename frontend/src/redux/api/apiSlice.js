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
  credentials: "include", // Include credentials like cookies
  prepareHeaders: (headers, { getState }) => {
    // Get the token from Redux state
    const token = getState().auth.token;

    if (token) {
      // If token exists, set Authorization header
      headers.set("Authorization", `Bearer ${token}`);
    }

    // Additional headers if needed
    headers.set("Content-Type", "application/json");

    return headers;
  },
  // Optional: Add error handling
  responseHandler: (response) => {
    if (response.status === 401) {
      // Handle unauthorized responses (e.g., redirect to login)
      console.log("Unauthorized - Redirect to login");
    }
    return response;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    // Example endpoint
    getUserData: builder.query({
      query: () => "/api/v1/users/me", // Example endpoint for fetching user data
    }),
  }),
});
