import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import "./index.css";
import store from "./services/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
function update() {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

store.subscribe(update);

update();
