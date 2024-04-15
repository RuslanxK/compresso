import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/rootReducer";
import "./App.scss";
import "./Files.scss"
import "./DropFiles.scss"
import { disableReactDevTools } from '@fvilers/disable-react-devtools';


if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>

        <img id="logo" src="./logo.png" alt="logo" width="150px"/>
        
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
