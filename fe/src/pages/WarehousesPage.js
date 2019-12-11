
import React, { useEffect } from "react";
import { Table, Spin, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@reach/router";

import { getWarehouses } from "../actions/warehousesService";
import PageLayout from "../components/PageLayout";

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
    const dispatch = useDispatch();
    const {
        warehouses, loading, error,
    } = useSelector((state) => state.warehouses);
    const {
        access_token,
    } = useSelector((state) => state.login);

    // If no sales orders have been loaded, then load them
    useEffect(() => {
        // Can't request info from api before the login is ready
        if (!access_token) {
            return;
        }

        if (!warehouses && !loading && !error) {
            dispatch(getWarehouses());
        }
    }, [access_token, dispatch, error, loading, warehouses]);


    return (
        <PageLayout title="Warehouse Zones">
            {error && <Alert message={(error && error.message) || "Error!"} type="error" />}
            <Spin spinning={!access_token || loading} size="large" tip="Loading Warehouses...">
                <Table dataSource={warehouses} columns={table_columns} rowKey="id" />
            </Spin>
        </PageLayout>
    );
};

export default WarehousesPage;
