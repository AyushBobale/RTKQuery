import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./slices/rootSlice";
import { loginApi } from "./slices/loginSlice";

export default configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(loginApi.middleware),
});
