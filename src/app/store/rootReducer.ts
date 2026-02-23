import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './Slice/userSlice';
// Empty reducer placeholder - add feature reducers as you build them
const placeholderReducer = (state = {}) => state;

export const rootReducer = combineReducers({
  _placeholder: placeholderReducer,
   UserAuth: userSlice.reducer,
});
