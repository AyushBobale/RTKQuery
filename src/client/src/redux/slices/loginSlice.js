import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../constants/config";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  endpoints: (builder) => ({
    userData: builder.query({
      query: () => "/auth/user_data",
      providesTags: ["user", "login"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["user", "login"],
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["user", "login"],
    }),
  }),
});

export const { useUserDataQuery, useLoginMutation, useRegisterMutation } =
  loginApi;
