import { configureStore } from "@reduxjs/toolkit";
import Form from "../components/Form";
export const store = configureStore({
  reducer: {
    expanded: Form,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
