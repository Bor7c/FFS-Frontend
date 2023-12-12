import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	breach: undefined
};

const draftBreachSlice = createSlice({
	name: 'draftBreach',
	initialState: initialState,
	reducers: {
		updateBreach(state, action) {
			state.breach = action.payload
		}
	}
})

export const {updateBreach} = draftBreachSlice.actions;

export default draftBreachSlice.reducer;