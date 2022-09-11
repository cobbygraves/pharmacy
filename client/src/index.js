import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { snackBarReducer, modalReducer } from "./store/reducers/Reducers";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const rootReducer = combineReducers({
  snackBar: snackBarReducer,
  modal: modalReducer,
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>{" "}
  </BrowserRouter>,
  document.getElementById("root")
);
