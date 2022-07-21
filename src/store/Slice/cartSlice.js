import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartModal: false,
    price: 0
  },
  reducers: {
    setCart: (state, action) => {
      let check = true;
      state.cart.forEach((item) => {
        if (
          item.code === action.payload.code &&
          item.size === action.payload.size
        ) {
          item.count += action.payload.count;
          check = false;
        }
      });
      if (check) state.cart = [...state.cart, action.payload];
      console.log(state.cart);
    },
    deleteItem: (state, action) => {
      const newCart = state.cart.filter(
        (item) =>
          item.code !== action.payload && item.size !== action.payload.size
      );
      state.cart = [...newCart];
    },
    setCartModal: (state, action) => {
      state.cartModal = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload
    },
    resetCart: (state) => {
      state.cart = []
      state.price = 0
    }
  },
});
