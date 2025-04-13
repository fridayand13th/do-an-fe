import { TNavigatorInitialState } from "@@types/stores/navigator";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@stores/store";

const initialState: Partial<TNavigatorInitialState> = {
  category: "",
  path: "",
};

export const navigatorSelector = (state: RootState) => state.navigator;

export const popupSlice = createSlice({
  name: "navigator",
  initialState,
  reducers: {
    storeNavigator: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { storeNavigator } = popupSlice.actions;

export default popupSlice.reducer;
