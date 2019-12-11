
import React, { useEffect } from "react";
import { Table, Spin, Alert, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { getPickingWaves } from "../actions/pickingWavesService";
import PageLayout from "../components/PageLayout";

const { TabPane } = Tabs;

const table_columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Due Date",
        dataIndex: "due_date",
        key: "due_date",
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
];

const PickingWavesPage = () => {
    const dispatch = useDispatch();
    const {
        pickingWaves, loading, error,
    } = useSelector((state) => state.pickingWaves);

    useEffect(() => {
        dispatch(getPickingWaves());
    }, [dispatch]);

    return (
        <PageLayout title="Picking Waves">
            {error && <Alert message={(error && error.message) || "Error!"} type="error" />}
            <Spin spinning={loading} size="large" tip="Loading Picking Waves...">
                <Tabs defaultActiveKey="1" animated={false} size="large">
                    <TabPane tab="Active" key="1">
                        <Table dataSource={pickingWaves && pickingWaves.active} columns={table_columns} rowKey="id" />
                    </TabPane>
                    <TabPane tab="Finished" key="2">
                        <Table dataSource={pickingWaves && pickingWaves.finished} columns={table_columns} rowKey="id" />
                    </TabPane>
                </Tabs>
            </Spin>
        </PageLayout>
    );
};

export default PickingWavesPage;
