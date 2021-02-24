import { createSlice } from '@reduxjs/toolkit';

import { axiosProtected } from '../../api/axios';
import Storage from '../../utils/storage';

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "milenski",
    age: 24
  },
  reducers: {
    NAME_CAPITAL(state, action) {
      state.name = "MILENSKI"
    }
  }
});

export const authUser = (userData) => async dispatch => {
  const token = await axiosProtected({ dispatch }).post("/user", userData);
  if (!token) return;
  Storage.SET_TOKEN(token);
};

export default userSlice.reducer;

export const { NAME_CAPITAL } = userSlice.actions;