import { createSlice } from "@reduxjs/toolkit";
import { TNavbarInitialState } from "@@types/stores/navbar";
import { RootState } from "@stores/store";

const initialState: Partial<TNavbarInitialState> = {
  isSidebarOpen: false,
};

export const navbarSelector = (state: RootState) => state.navbar;

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar } = navbarSlice.actions;

export default navbarSlice.reducer;
