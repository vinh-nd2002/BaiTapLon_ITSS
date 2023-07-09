import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./userAction";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: localStorage.getItem("current") || null,
    accessToken: null,
    isLoading: false,
    errorMessage: null,
  },
  reducers: {
    loginReducer: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.accessToken = action.payload.accessToken;
    },

    logout: (state, action) => {
      state.isLoggedIn = false;
      state.current = null;
      state.accessToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("cart");
      localStorage.removeItem("current");
    },
  },
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(actions.getCurrent.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.current = action.payload.data;
      localStorage.setItem("current", action.payload.data);
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.current = null;
      state.errorMessage = action.payload.message;
    });
  },
});

export const { loginReducer, logout } = userSlice.actions;

export default userSlice.reducer;
