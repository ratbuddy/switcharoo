import { createSlice } from '@reduxjs/toolkit';

interface SwitchDataState {
  data: any[];
  loading: boolean;
  error: null | string;
}

const initialState: SwitchDataState = {
  data: [],
  loading: false,
  error: null,
};

export const switchDataSlice = createSlice({
  name: 'switchData',
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataError } = switchDataSlice.actions;

export default switchDataSlice.reducer;
