import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    serverStatus: builder.query({
      query: () => `/`,
    }),
  }),
});

export const { useServerStatusQuery } = baseApi;
