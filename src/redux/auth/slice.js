import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("user"));

const INITIAL_USER_STATE = {
  email: savedUser?.email || null,
  token: savedUser?.token || null,
  id: savedUser?.id || null,
  likes: savedUser?.likes || [],
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_USER_STATE,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: state.email,
          token: state.token,
          id: state.id,
          likes: state.likes,
        })
      );
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.likes = [];
      localStorage.removeItem("user");
    },
    toggleLike(state, action) {
      if (!state.token) {
        return;
      }
      const id = action.payload;
      const isLike = state.likes.includes(id);
      if (isLike) {
        state.likes = state.likes.filter((likeId) => likeId !== id);
      } else {
        state.likes.push(id);
      }
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: state.email,
          token: state.token,
          id: state.id,
          likes: state.likes,
        })
      );
    },
  },
});

export const { setUser, removeUser, toggleLike } = userSlice.actions;
export const userReducer = userSlice.reducer;
