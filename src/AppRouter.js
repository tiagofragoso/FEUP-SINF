import React, { useEffect } from "react";
import { Router } from "@reach/router";
import { useDispatch } from "react-redux";

import Homepage from "./pages/Homepage";
import Examplepage from "./pages/Examplepage";
import Salespage from "./pages/Salespage";
import { login } from "./actions/loginService";

const AppRouter = () => {
    const dispatch = useDispatch();
    // Login on every application load
    useEffect(() => {
        dispatch(login());
    });

    return (
        <Router>
            <Homepage path="/" />
            <Examplepage path="example" />
            <Salespage path="sales" />
        </Router>
    );
};

export default AppRouter;
