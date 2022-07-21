import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./Slice/cartSlice";
import { productSlice } from "./Slice/productSlice";
import { userSlice } from "./Slice/userSlice";


const store = configureStore({
    reducer:{
        product: productSlice.reducer,
        cart: cartSlice.reducer,
        user:userSlice.reducer
    }
})

export default store