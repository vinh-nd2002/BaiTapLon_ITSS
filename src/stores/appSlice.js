import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isLoading: false,
    categories: null,
    errorMessage: "",
  },
  reducers: {},
  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(actions.getCategories.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      // console.log(actions);
      state.isLoading = false;
      state.categories = action.payload.data;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(actions.getCategories.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});

export const { getCategories } = appSlice.actions;

export default appSlice.reducer;
