import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    setProductList: (state, action) => {
      state = action.payload
      console.log(state)
    }
  },
  extraReducers: {
    
  }
});