import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./Form/formSlice";
export const store = configureStore({
  reducer: {
    expanded: formSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
