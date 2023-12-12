import {configureStore} from "@reduxjs/toolkit";

import authReducer from "./authSlice"
import draftBreachReducer from "./draftBreachSlice";
import fineReducer from "./selectedFineSlice"

export default configureStore({
  reducer: {
    user: authReducer,
    draftBreach: draftBreachReducer,
    selectedFine: fineReducer
  }
});