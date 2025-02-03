import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachersAll } from "./operation.js";

const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null,
};

const teachersAllSlice = createSlice({
  name: "teachersAll",
  initialState: INITIAL_STATE,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachersAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeachersAll.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchTeachersAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const teachersAllReducer = teachersAllSlice.reducer;
