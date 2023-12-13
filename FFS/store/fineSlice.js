import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fines: [],
    fine: {},
};

export const fineSlice = createSlice({
    name: 'fine',
    initialState,
    reducers: {
        setFines: (state, { payload }) => {
            console.log('setFines');
            state.fines = payload;
        },
        setFine: (state, { payload }) => {
            console.log('setFine');
            state.fine = payload;
        },
        resetFine: (state) => {
            console.log('resetFine');
            state.fine = {};
        },
    },
});

export const fineReducer = fineSlice.reducer;

export const { setFines, setFine, resetFine } = fineSlice.actions;