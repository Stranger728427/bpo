import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { persistReducer } from 'redux-persist';
import { persistStore } from 'redux-persist';
import { useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/es/storage/session';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['UserAuth'],
};

const reducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: import.meta.env.DEV,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
