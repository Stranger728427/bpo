import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import storage from 'redux-persist/es/storage/session';
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	persistStore,
} from 'redux-persist';
import { rootReducer } from './rootReducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['UserAuth'],
};

const reducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	devTools: import.meta.env.DEV,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
