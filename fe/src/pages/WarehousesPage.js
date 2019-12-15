
import React from "react";
import { Table, Spin, Alert } from "antd";
import { Link } from "@reach/router";

import PageLayout from "../components/PageLayout";
import useWarehouses from "../hooks/useWarehouses";

const KeyWithLink = (warehouseKey) => <Link to={warehouseKey}>{warehouseKey}</Link>;

const table_columns = [
    {
        title: "Key",
        dataIndex: "warehouseKey",
        key: "warehouseKey",
        render: KeyWithLink,
    },
    {
        title: "Name",
        dataIndex: "description",
        key: "description",
    },
];

const WarehousesPage = () => {
    const [warehouses, loading, error] = useWarehouses();

    return (
        <PageLayout title="Warehouse Zones">
            {error && <Alert message={(error && error.message) || "Error!"} type="error" />}
            <Spin spinning={loading} size="large" tip="Loading Warehouses...">
                <Table dataSource={warehouses} columns={table_columns} rowKey="id" />
            </Spin>
        </PageLayout>
    );
};

export default WarehousesPage;
