import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "customer",
  initialState: {
    isLoading: false,
    customers: null,
    errorMessage: "",
  },
  reducers: {
    getAllCustomers: (state, action) => {
      state.customers = action.payload.data;
    },
    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(
        (customer) => +customer.id !== +action.payload.id
      );
    },
  },
});

export const {getAllCustomers, deleteCustomer} = appSlice.actions;

export default appSlice.reducer;
