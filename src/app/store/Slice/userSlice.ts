import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAuth } from '../types';
import { PURGE } from 'redux-persist';

const initialState: UserAuth = {
	name: '',
	email: '',
	roles: [],
	userId: '',
	username: '',
	traits:[],
};

export const userSlice = createSlice({
	name: 'UserAuth',
	initialState: {
		value: initialState,
	},
	reducers: {
		updateUserAuth: (state: any, action: PayloadAction<Partial<UserAuth>>) => {
			state.value = { ...state.value, ...action.payload };
		},
		login: (state: any, action: PayloadAction<UserAuth>) => {
			state.value = {
				...action.payload,
			};
		},
		logout: (state: any) => {
			state.value = initialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(PURGE, (state) => {
			state.value = initialState;
		});
	},
});

export const { updateUserAuth, login, logout } = userSlice.actions;
export const UserAuthSelector = (state: any): UserAuth => state.UserAuth?.value;
