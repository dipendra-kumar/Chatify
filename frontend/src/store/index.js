import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import appSlice from "../services/appService";
import Ain1Slice from "./slice/ain1slice";
import chatSliceReducer from "./slice/chatSlice";

// sample presisted reducer

const Ain1StateReducer = persistReducer(
  {
    key: "user",
    storage,
  },
  Ain1Slice
);

export const store = configureStore({
  reducer: {
    getAin1Slice: Ain1StateReducer,
    chatSlice: chatSliceReducer,
    [appSlice.reducerPath]: appSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(appSlice.middleware),
});

// for presisted reducers
export const persistor = persistStore(store);
