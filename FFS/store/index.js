import { configureStore } from '@reduxjs/toolkit';
import { fineReducer } from './fineSlice';

export const store = configureStore({ reducer: { fine: fineReducer } });