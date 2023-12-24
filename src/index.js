import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import GlobalStyles from "./components/GlobalStyle/GlobalStyles";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </BrowserRouter>
);
