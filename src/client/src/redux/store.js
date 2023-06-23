import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./slices/rootSlice";

export default configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
