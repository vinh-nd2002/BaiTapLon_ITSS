import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
  },
  reducers: {
    loginReducer: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.current = action.payload.userData;
    },
  },
});

export const { loginReducer } = userSlice.actions;

export default userSlice.reducer;
