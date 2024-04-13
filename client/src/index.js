import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/rootReducer";


const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>

        <img src="./logo.png" alt="logo" width="150px" style={{position: "absolute", right: "35px", top: "20px"}}/>
        
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
