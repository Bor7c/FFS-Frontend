import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    fine: undefined,
};

const selectedFineSlice = createSlice({
    name: 'selectedFine',
    initialState: initialState,
    reducers: {
        updateFine(state, action) {
            state.fine = action.payload
        }
    }
})

export const {updateFine} = selectedFineSlice.actions;

export default selectedFineSlice.reducer;