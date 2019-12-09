import React, { useEffect } from "react";
import { Table, Spin, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@reach/router";

import PageLayout from "../components/PageLayout";
import { getSalesOrders } from "../actions/salesService";
import OrderStatusLabel from "../components/OrderStatusLabel";


const IdWithLink = (key, record) => <Link to={record.id}>{key}</Link>;

const table_columns = [
    {
        title: "Date",
        dataIndex: "documentDate",
        key: "documentDate",
    },
    {
        title: "Order ID",
        dataIndex: "naturalKey",
        key: "naturalKey",
        render: IdWithLink,
    },
    {
        title: "Entity",
        dataIndex: "buyerCustomerParty",
        key: "buyerCustomerParty",
    },
    {
        title: "Client name",
        dataIndex: "buyerCustomerPartyName",
        key: "buyerCustomerPartyName",
    },
    {
        title: "Status",
        key: "status",
        render: OrderStatusLabel,
    },
];

const SalesOrdersPage = () => {
    const dispatch = useDispatch();
    const {
        sales_orders, loading, error,
    } = useSelector((state) => state.sales);
    const {
        access_token,
    } = useSelector((state) => state.login);

    // If no sales orders have been loaded, then load them
    useEffect(() => {
        // Can't request info from api before the login is ready
        if (!access_token) {
            return;
        }

        if (!sales_orders && !loading && !error) {
            dispatch(getSalesOrders());
        }
    }, [access_token, dispatch, error, loading, sales_orders]);


    return (
        <PageLayout title="Sales Orders">
            {error && <Alert message={(error && error.message) || "Error!"} type="error" />}
            <Spin spinning={!access_token || loading} size="large" tip="Loading Sales Orders...">
                <Table dataSource={sales_orders} columns={table_columns} rowKey="id" />
            </Spin>
        </PageLayout>
    );
};

export default SalesOrdersPage;
