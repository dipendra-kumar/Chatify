import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChatProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </ChatProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
