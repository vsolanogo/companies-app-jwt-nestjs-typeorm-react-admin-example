import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "./components/App";
import { GlobalComponent } from "./components/GlobalComponent";
import { store } from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <GlobalComponent />
    <App />
  </Provider>,
  document.getElementById("root")
);
