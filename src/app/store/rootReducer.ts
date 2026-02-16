import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
// Empty reducer placeholder - add feature reducers as you build them
const placeholderReducer = (state = {}) => state;

export const rootReducer = combineReducers({
  _placeholder: placeholderReducer,
  auth: authReducer,
});
