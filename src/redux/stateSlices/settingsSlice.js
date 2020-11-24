import {createSlice} from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
	name: 'settingsData',
	initialState: {
		vibration: {
			name: 'vibration',
			isActive: true,
		},
		sound: {
			name: 'sound',
			isActive: false,
		},
	},

	reducers: {
		toggleVibration: (state, _) => {
			state.vibration.isActive = !state.vibration.isActive;
		},

		toggleSound: (state, _) => {
			state.sound.isActive = !state.sound.isActive;
		},
	}
});

export const {
	toggleVibration,
	toggleSound,
} = settingsSlice.actions;

export const selectSettingsData = state => state.settingsSlice;

export default settingsSlice.reducer;