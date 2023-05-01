import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isDialogOpen: 0,
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    
  },
});
export const {} = appSlice.actions;
export default appSlice.reducer;
