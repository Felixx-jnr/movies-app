import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: (builder).mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),

<<<<<<< Updated upstream
    logout: builder.mutation({
      query: () => ({
=======

    logout: builder.mutation({
      query: ()=>({
>>>>>>> Stashed changes
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

<<<<<<< Updated upstream
export const {useLoginMutation, useRegisterMutation, useLogoutMutation} = userApiSlice;
=======
export const {useLoginMutation, useRegisterMutation, useLogoutMutation }
 = userApiSlice;
>>>>>>> Stashed changes

