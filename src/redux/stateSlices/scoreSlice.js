import {createSlice} from '@reduxjs/toolkit';

export const scoreSlice = createSlice({
	name: 'scoreData',
	initialState: {
		value: 0,
	},

	reducers: {
		increaseScore: (state, action) => {
			const {amount} = action.payload;
			state.value = state.value + amount;
		},

		resetScore: (state, _) => {
			state.value = 0;
		},
	}
});

export const {
	increaseScore,
	resetScore,
} = scoreSlice.actions;

export const selectScoreData = state => state.scoreSlice;

export default scoreSlice.reducer;