import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getChatData: "",
    getSelectedChatData: []
};


const chatSlice = createSlice({
    name: "chatSlice",
    initialState,
    reducers: {
        getChatData: (state, action) => {
            state.getChatData = action.payload;
        },
        getSelectedChatData: (state, action) => {
            state.getSelectedChatData = action.payload;
        },
    },
});

export const { getChatData, getSelectedChatData } = chatSlice.actions;
export default chatSlice.reducer;
