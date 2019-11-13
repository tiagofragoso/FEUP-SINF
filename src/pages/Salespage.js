import React, { useEffect } from "react";
import { Table, Spin, Alert, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { getSalesOrders } from "../actions/salesService";
import { documentLinesToState, OrderState } from "../utils/jasminParsing";

const Status = (_, { documentLines }) => {
    const state = documentLinesToState(documentLines);

    switch (state) {
        case OrderState.PARTIAL:
            return <Tag color="gold">Partial</Tag>;
        case OrderState.PENDING:
            return <Tag color="purple">Pending</Tag>;
        case OrderState.SENT:
            return <Tag color="green">Sent</Tag>;
        default:
            return <Tag color="red">Other</Tag>;
    }
};

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
        title: "Total",
        dataIndex: "payableAmount.amount",
        key: "payableAmount.amount",
    },
    {
        title: "Status",
        key: "status",
        render: Status,
    },
    {
        title: "Address",
        dataIndex: "unloadingPoint",
        key: "unloadingPoint",
    },
];

const Homepage = () => {
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
            <Spin spinning={loading} size="large" tip="Loading Sales Orders...">
                <Table dataSource={sales_orders} columns={table_columns}/>
            </Spin>
        </>
    );
};

export default Homepage;
