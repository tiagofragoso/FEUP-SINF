import React, { useEffect } from "react";
import { Router } from "@reach/router";
import { useDispatch } from "react-redux";

import { login } from "./actions/loginService";
import { checkStoredSession } from "./actions/localUserService";

import Layout from "./components/Layout";
import SalesOrdersPage from "./pages/SalesOrdersPage";
import SalesOrderPage from "./pages/SalesOrderPage";
import PurchaseOrdersPage from "./pages/PurchaseOrdersPage";
import PurchaseOrderPage from "./pages/PurchaseOrderPage";
import WarehousesPage from "./pages/WarehousesPage";
import PickingWavesPage from "./pages/PickingWavesPage";
import PickingWavePage from "./pages/PickingWavePage";
import WarehousePage from "./pages/WarehousePage";
import SigninPage from "./pages/SigninPage";
import Homepage from "./pages/Homepage";
import RequiresAuth from "./components/RequiresAuth";

const AppRouter = () => {
    const dispatch = useDispatch();
    // Login on every application load
    useEffect(() => {
        dispatch(login());
        dispatch(checkStoredSession());
    });

    return (
        <Router>
            <Layout path="/">
                <Homepage path="/" />
                {/* Set Sales page as index for now */}
                <RequiresAuth as={SalesOrdersPage} path="sales" />
                <RequiresAuth as={SalesOrderPage} path="sales/:order_id" />
                <RequiresAuth as={PurchaseOrdersPage} path="purchases" />
                <RequiresAuth as={PurchaseOrderPage} path="purchases/:order_id" />
                <RequiresAuth as={WarehousesPage} path="warehouse-zones" />
                <RequiresAuth as={WarehousePage} path="warehouse-zones/:warehouse_key" />
                <RequiresAuth as={PickingWavesPage} path="picking-waves" />
                <RequiresAuth as={PickingWavePage} path="picking-waves/:id" />
                <SigninPage path="sign-in" />
            </Layout>
            {/* btw missing 404 page */}
        </Router>
    );
};

export default AppRouter;
