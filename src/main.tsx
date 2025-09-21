import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // <-- ایمپورت روتر
import App from "./App.tsx";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {" "}
        {/* <-- کل برنامه داخل روتر قرار گرفت */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
