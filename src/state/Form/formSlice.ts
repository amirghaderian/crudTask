import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface expandedState {
  value: boolean;
}
const initialState: expandedState = {
  value: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    expandedState: (state) => {
      state.value = true;
    },
  },
});

export const { expandedState } = formSlice.actions;
export default formSlice.reducer;
