import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = { email: null, token: null, id: null };

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
