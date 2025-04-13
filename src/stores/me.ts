import { TMeInitialState } from "@@types/stores/me";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@stores/store";

const initialState: Partial<TMeInitialState> = {
  id: undefined,
  firstName: undefined,
  lastName: undefined,
  hobby: undefined,
  point: undefined,
  email: undefined,
  contactNumber: undefined,
  zipCode: undefined,
  address: undefined,
  avtUrl: undefined,
  createdAt: undefined,
};

export const meSelector = (state: RootState) => state.me;

export const popupSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    storeMeInfo: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { storeMeInfo } = popupSlice.actions;

export default popupSlice.reducer;
