import { TLoaderInitialState } from '@@types/stores/loader';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@stores/store';

const initialState: Partial<TLoaderInitialState> = {
  isLoading: false,
  text: '',
};

export const loaderSelector = (state: RootState) => state.loader;

export const popupSlice = createSlice({
  name: 'environment',
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state = {
        ...action.payload,
      };
      return state;
    },
  },
});

export const { setLoader } = popupSlice.actions;

export default popupSlice.reducer;
