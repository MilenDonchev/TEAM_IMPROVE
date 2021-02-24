import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: "error",
  initialState: {
    apiError: ""
  },
  reducers: {
    SET_API_ERROR(state, action) {
      state.apiError = action.payload;
    }
  }
});

export default errorSlice.reducer;

export const setApiError = (errorMessage) => dispatch => {
  dispatch(SET_API_ERROR(errorMessage));
};

export const { SET_API_ERROR } = errorSlice.actions;