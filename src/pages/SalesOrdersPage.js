import React, { useEffect } from "react";
import { Table, Spin, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@reach/router";

import { getSalesOrders } from "../actions/salesService";
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
        title: "Total (€)",
        dataIndex: "payableAmount.amount",
        key: "payableAmount.amount",
    },
    {
        title: "Status",
        key: "status",
        render: OrderStatusLabel,
    },
    {
        title: "Address",
        dataIndex: "unloadingPoint",
        key: "unloadingPoint",
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
        <>
            {error && <Alert message="Error!" type="error" />}
            <Spin spinning={!access_token || loading} size="large" tip="Loading Sales Orders...">
                <Table dataSource={sales_orders} columns={table_columns} rowKey="id" />
            </Spin>
        </>
    );
};

export default SalesOrdersPage;
