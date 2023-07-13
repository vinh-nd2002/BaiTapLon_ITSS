import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    errorMessage: "",
    isShowModal: false,
    modalChildren: null,
  },
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal;
      state.modalChildren = action.payload.modalChildren;
    },
  },
});

export const { showModal } = appSlice.actions;

export default appSlice.reducer;
