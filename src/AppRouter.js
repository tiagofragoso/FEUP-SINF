import React, { useEffect } from "react";
import { Router } from "@reach/router";
import { useDispatch } from "react-redux";

import Homepage from "./pages/Homepage";
import Examplepage from "./pages/Examplepage";
import SalesOrdersPage from "./pages/SalesOrdersPage";
import SalesOrderPage from "./pages/SalesOrderPage";
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
            <SalesOrdersPage path="sales" />
            <SalesOrderPage path="sales/:order_id" />
            {/* btw missing 404 page */}
        </Router>
    );
};

export default AppRouter;
