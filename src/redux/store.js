import {configureStore} from '@reduxjs/toolkit';

import settingsReducer from './stateSlices/settingsSlice';
import scoreReducer from './stateSlices/scoreSlice';

export default configureStore({
	reducer: {
		settingsSlice: settingsReducer,
		scoreSlice: scoreReducer,
	},
});