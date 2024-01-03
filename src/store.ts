import { configureStore } from "@reduxjs/toolkit";
import bookCollectionReducer from "./slices/bookCollectionSlice";

export const store = configureStore({
  reducer: {
    bookCollection: bookCollectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
