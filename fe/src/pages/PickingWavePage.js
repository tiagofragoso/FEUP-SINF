
import React, { useEffect } from "react";
import { Table, Spin, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@reach/router";

import { getPickingWave } from "../actions/pickingWavesService";
import PageLayout from "../components/PageLayout";

const salesOrderWithLink = (sales_order_id) => (
    <Link to={`/sales/${sales_order_id}`}>{sales_order_id}</Link>
);

const table_columns = [
    {
        title: "Item Key",
        dataIndex: "item_key",
        key: "item_key",
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Sales Order",
        dataIndex: "sales_order",
        key: "sales_order",
        render: salesOrderWithLink,
    },
];

const PickingWavePage = ({ id }) => {
    const dispatch = useDispatch();
    const {
        items, loading, error,
    } = useSelector((state) => state.currentPickingWave);

    useEffect(() => {
        dispatch(getPickingWave(id));
    }, [dispatch, id]);

    return (
        <PageLayout title={`Picking Wave ${id}`}>
            {error && <Alert message={(error && error.message) || "Error!"} type="error" />}
            <Spin spinning={loading} size="large" tip="Loading Picking Wave...">
                <Table dataSource={items} columns={table_columns} rowKey="id" />
            </Spin>
        </PageLayout>
    );
};

export default PickingWavePage;
