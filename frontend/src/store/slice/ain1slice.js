import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getAuthToken: "",
  getUserData: {},
};

const Ain1Slice = createSlice({
  name: "getAin1Slice",
  initialState,
  reducers: {
    getAuthHook: (state, action) => {
      state.getAuthToken = action.payload;
    },
    getUserHook: (state, action) => {
      state.getUserData = action.payload;
    },
    logoutHook: () => initialState,
  },
});

export const { getAuthHook, getUserHook, logoutHook } = Ain1Slice.actions;

export default Ain1Slice.reducer;
