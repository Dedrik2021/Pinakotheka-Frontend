import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';

import userSlice from './slices/userSlice';
import paintingSlice from './slices/paintingSlice';

const saveUserOnlyFilter = createFilter('user', ['user']);
const savePaintingOnlyFilter = createFilter('painting', ['painting']);

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user', 'painting'],
	transforms: [saveUserOnlyFilter, savePaintingOnlyFilter],
};

const rootReducer = combineReducers({
	user: userSlice,
	painting: paintingSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	devTools: true,
});

export const persistor = persistStore(store);
