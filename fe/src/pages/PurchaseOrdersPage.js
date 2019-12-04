import React, { useEffect } from "react";
import { Table, Spin, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@reach/router";

import PageLayout from "../components/PageLayout";
import { getPurchaseOrders } from "../actions/purchasesService";
import OrderStatusLabel from "../components/OrderStatusLabel";


const IdWithLink = (id) => <Link to={id}>{id}</Link>;

const table_columns = [
    {
        title: "Date",
        dataIndex: "documentDate",
        key: "documentDate",
    },
    {
        title: "Order ID",
        dataIndex: "id",
        key: "id",
        render: IdWithLink,
    },
    {
        title: "Supplier",
        dataIndex: "sellerSupplierPartyName",
        key: "sellerSupplierPartyName",
    },
    {
        title: "Total (€)",
        dataIndex: "payableAmount.amount",
        key: "payableAmount.amount",
    },
    {
        title: "Status",
        key: "status",
        render: OrderStatusLabel,
    },
];

const PurchaseOrdersPage = () => {
    const dispatch = useDispatch();
    const {
        purchase_orders, loading, error,
    } = useSelector((state) => state.purchases);
    const {
        access_token,
    } = useSelector((state) => state.login);

    // If no sales orders have been loaded, then load them
    useEffect(() => {
        // Can't request info from api before the login is ready
        if (!access_token) {
            return;
        }

        if (!purchase_orders && !loading && !error) {
            dispatch(getPurchaseOrders());
        }
    }, [access_token, dispatch, error, loading, purchase_orders]);


    return (
        <PageLayout title="Purchase Orders">
            {error && <Alert message={(error && error.message) || "Error!"} type="error" />}
            <Spin spinning={!access_token || loading} size="large" tip="Loading Purchase Orders...">
                <Table dataSource={purchase_orders} columns={table_columns} rowKey="id" />
            </Spin>
        </PageLayout>
    );
};

export default PurchaseOrdersPage;
