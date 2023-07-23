import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import GlobalStyle from "./assets/style/GlobalStyle";
import Toast from "./components/common/Toast";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
    <Toast />
  </React.StrictMode>
);
