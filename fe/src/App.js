import React from "react";
import { Provider } from "react-redux";

import AppRouter from "./AppRouter";
import configureStore from "./configureStore";

import "antd/dist/antd.css";
import "./App.css";

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

export default App;
