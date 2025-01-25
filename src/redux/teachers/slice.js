// import { createSlice } from "@reduxjs/toolkit";
// import { fetchTeachers } from "./operations.js";

// const INITIAL_STATE = {
//   items: [],
//   loading: false,
//   error: null,
//   lastVisible: null,
// };

// const teachersSlice = createSlice({
//   name: "teachers",
//   initialState: INITIAL_STATE,
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTeachers.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchTeachers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;
//         state.lastVisible = action.payload.lastVisible;

//         if (state.items.length === 0) {
//           state.items = action.payload.teachers;
//         } else {
//           state.items = [...state.items, ...action.payload.teachers];
//         }
//       })

//       .addCase(fetchTeachers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const teachersReducer = teachersSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachers } from "./operations.js";

const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null,
  lastVisible: null,
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.lastVisible = action.payload.lastVisible;

        // Перевіряємо, чи у нас є картки в стані
        if (state.items.length === 0) {
          state.items = action.payload.teachers;
        } else {
          // Перевіряємо, чи нові картки вже не додані до існуючих
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

export const teachersReducer = teachersSlice.reducer;
