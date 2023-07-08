import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    shops: JSON.parse(localStorage.getItem("cart")) || [],
    isLoading: false,
    errorMessage: null,
  },
  reducers: {
    addProductsToCart: (state, action) => {
      const shopsTemp = state.shops;
      const productAdd = action.payload.shop.product;

      const shopIndex = shopsTemp.findIndex(
        (shop) => shop.id === action.payload.shop.id
      );

      if (shopIndex !== -1) {
        if (shopsTemp[shopIndex].products.length === 0) {
          shopsTemp[shopIndex].products.push(productAdd);
        } else {
          const productIndex = shopsTemp[shopIndex].products.findIndex(
            (product) => product.id === productAdd.id
          );
          if (productIndex !== -1) {
            if (
              shopsTemp[shopIndex].products[productIndex].quantity === 0 &&
              productAdd.quantity === -1
            ) {
              // shopsTemp[shopIndex].products.splice(productIndex, 1);
            } else {
              shopsTemp[shopIndex].products[productIndex].quantity +=
                productAdd.quantity;
            }
          } else {
            shopsTemp[shopIndex].products.push(productAdd);
          }
        }
      } else {
        const shop = {
          ...action.payload.shop,
          products: [productAdd],
        };
        state.shops = [...state.shops, shop];
      }
      localStorage.setItem("cart", JSON.stringify(state.shops));
    },
  },
  getTotalItems: (state, action) => {
    return state.shops.reduce((total, shop) => {
      return total + shop.products.length;
    }, 0);
  },
});

export const { addProductsToCart } = cartSlice.actions;

export default cartSlice.reducer;
