import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice"
import draftBreachReducer from "./draftBreachSlice";
import fineReducer from "./selectedFineSlice"
import filtersReducer from "./FiltersSlice"; // Убедитесь, что путь верен

export default configureStore({
  reducer: {
    user: authReducer,
    draftBreach: draftBreachReducer,
    selectedFine: fineReducer,
    filters: filtersReducer // Используйте ключ, соответствующий экспорту, т.е. 'filtersReducer'
  }
});