import React from "react";
import ReactDOM from "react-dom";
import rootReducer from "./modules";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./components/App";
import "./styles.css";

const store = createStore(rootReducer);
console.log(rootReducer);
console.log(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
