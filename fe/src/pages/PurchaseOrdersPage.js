import React, { useEffect } from "react";
import { Table, Spin, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@reach/router";

import PageLayout from "../components/PageLayout";
import { getPurchaseOrders } from "../actions/purchasesService";
import OrderStatusLabel, { rowToStatusLabel, OrderStatusLabelTypes } from "../components/OrderStatusLabel";
import { formatDate } from "../utils/formatDate";


const KeyWithLink = (key) => <Link to={key}>{key}</Link>;

const table_columns = [
    {
        title: "Order ID",
        dataIndex: "naturalKey",
        key: "naturalKey",
        render: KeyWithLink,
        defaultSortOrder: "descend",
        sorter: (a, b) => Number(a.naturalKey.match(/\d+$/)[0]) - Number(b.naturalKey.match(/\d+$/)[0]),
        sortDirections: ["descend", "ascend"],
    },
    {
        title: "Date",
        dataIndex: "documentDate",
        key: "documentDate",
        render: formatDate,
    },
    {
        title: "Supplier",
        dataIndex: "sellerSupplierPartyName",
        key: "sellerSupplierPartyName",
    },
    {
        title: "Status",
        key: "status",
        render: OrderStatusLabel,
        filters: Object.values(OrderStatusLabelTypes)
            .filter((type) => type !== OrderStatusLabelTypes.COMPLETE_SALE)
            .map((type) => ({ value: type, text: type[0].toLocaleUpperCase() + type.slice(1).toLocaleLowerCase() }))
            .map(({ value, text }) => ({ value, text: text.replace("_purchase", "") })),

        onFilter: (value, record) => rowToStatusLabel(record) === value,
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

        dispatch(getPurchaseOrders());
    }, [access_token, dispatch]);


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
