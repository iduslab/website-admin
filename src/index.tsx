import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route } from "react-router-dom";

import "./styles/index.css";
import "rsuite/dist/styles/rsuite-default.css";

import App from "./components/App";
import Home from "./pages/Home";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Home} />
      </App>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
