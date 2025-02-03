import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachers } from "./operations.js";

const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null,
  lastVisible: null,
  filters: {
    languages: "French",
    levels: "A1 Beginner",
    price_per_hour: "10",
  },
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState: INITIAL_STATE,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.lastVisible = action.payload.lastVisible;

        if (state.items.length === 0) {
          state.items = action.payload.teachers;
        } else {
          const newTeachers = action.payload.teachers.filter(
            (teacher) => !state.items.some((item) => item.id === teacher.id)
          );
          state.items = [...state.items, ...newTeachers];
        }
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters } = teachersSlice.actions;
export const teachersReducer = teachersSlice.reducer;
