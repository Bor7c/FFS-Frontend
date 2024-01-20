import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface FiltersState {
  startDate: string,
  endDate: string,
  status: any,
  userName: string,
  title: string;
}

const initialState: FiltersState = {
  startDate: "",
  endDate: "",
  status: "",
  userName: "",
  title: ""
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<FiltersState>) {
      state.startDate = action.payload.startDate
      state.endDate = action.payload.endDate
      state.status = action.payload.status
      state.userName = action.payload.userName
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
  }
});

export const { setFilters, setTitle } = filtersSlice.actions;

export default filtersSlice.reducer;
