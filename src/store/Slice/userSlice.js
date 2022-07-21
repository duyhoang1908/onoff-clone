import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfor:{}
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfor = action.payload;
    },
  },
});
