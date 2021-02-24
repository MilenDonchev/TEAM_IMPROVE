import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import userReducer from './user/userSlice';
import errorReducer from './error/errorSlice';

const reducer = combineReducers({
  user: userReducer,
  error: errorReducer
});

export const createStore = () => {
  return configureStore({ reducer });
};