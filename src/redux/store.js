import {configureStore} from '@reduxjs/toolkit';

import settingsReducer from './stateSlices/settingsSlice';

export default configureStore({
	reducer: {
		settingsSlice: settingsReducer,
	},
});