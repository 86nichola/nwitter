import React from "react";
import ReactDOM from "react-dom";
import rootReducer from "./modules";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import App from "./components/App";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";
import "./styles.css";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);
console.log(rootReducer);
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
