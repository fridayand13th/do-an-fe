import { TPopupInitialState, TPopupList } from '@@types/stores/popup';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@stores/store';

const initialState: TPopupInitialState<TPopupList>[] = [];

export const popupSelector = (state: RootState) => state.popup;

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openPopup: (state, action) => {
      const { type, props, Component, popupOptions } = action.payload;
      return state.concat({
        type,
        props,
        isOpen: true,
        Component,
        popupOptions,
      });
    },
    closePopup: (state, action) => {
      const _openPopups = [...state];
      _openPopups.pop();
      state = _openPopups;
      return state;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;

export default popupSlice.reducer;
