import { configureStore } from "@reduxjs/toolkit";
import bookCollectionReducer from "./slices/bookCollectionSlice";
import { bookApi } from "./slices/bookApiSlice";

export const store = configureStore({
  reducer: {
    bookCollection: bookCollectionReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
