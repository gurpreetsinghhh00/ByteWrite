import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    addPosts: (state, action) => {
      state.splice(0, state.length, ...action.payload);
    },
  },
});

export const { addPosts } = postSlice.actions;
export default postSlice.reducer;
