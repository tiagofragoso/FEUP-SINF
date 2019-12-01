import React, { useEffect } from "react";
import { Router } from "@reach/router";
import { useDispatch } from "react-redux";

import Layout from "./components/Layout";
import SalesOrdersPage from "./pages/SalesOrdersPage";
import SalesOrderPage from "./pages/SalesOrderPage";
import { login } from "./actions/loginService";
import WarehousesPage from "./pages/WarehousesPage";

const AppRouter = () => {
    const dispatch = useDispatch();
    // Login on every application load
    useEffect(() => {
        dispatch(login());
    });

    return (
        <Router>
            <Layout path="/">
                <SalesOrdersPage path="/" />
                {/* Set Sales page as index for now */}
                <SalesOrdersPage path="sales" />
                <SalesOrderPage path="sales/:order_id" />
                <WarehousesPage path="warehouses" />
            </Layout>
            {/* btw missing 404 page */}
        </Router>
    );
};

export default AppRouter;
