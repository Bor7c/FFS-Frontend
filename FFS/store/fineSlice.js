import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fines: [],
    fine: {},
    title: "",
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
        setTitle:(state, {payload})=>{
            console.log("changing Title to", payload);
            state.title = payload;
        },
        resetTitle: (state) => {
            console.log('resetTitle');
            state.title = "";
        },
    },
});

export const fineReducer = fineSlice.reducer;

export const { setFines, setFine, resetFine , setTitle , resetTitle} = fineSlice.actions;