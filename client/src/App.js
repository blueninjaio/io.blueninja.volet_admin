import React from "react";
import "./App.css";
import "./mobile.css";
import AdminPanel from "./screens/index";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <AdminPanel />
    </Provider>
  );
}

export default App;
