
import React, { useEffect } from "react";
import { Table, Spin, Alert, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@reach/router";

import { getPickingWaves } from "../actions/pickingWavesService";
import PageLayout from "../components/PageLayout";

const { TabPane } = Tabs;

const IdWithLink = (id) => <Link to={id.toString()}>{id}</Link>

const table_columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        render: IdWithLink,
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
                        {pickingWaves && pickingWaves.active && pickingWaves.active.length > 0 ?
                            <Table dataSource={pickingWaves && pickingWaves.active} columns={table_columns} rowKey="id" /> :
                            <p>There are no Active picking waves at the moment.</p>
                        }
                    </TabPane>
                    <TabPane tab="Finished" key="2">
                        {pickingWaves && pickingWaves.finished && pickingWaves.finished.length > 0 ?
                            <Table dataSource={pickingWaves && pickingWaves.finished} columns={table_columns} rowKey="id" /> :
                            <p>There are no Finished picking waves at the moment.</p>
                        }
                    </TabPane>
                </Tabs>
            </Spin>
        </PageLayout>
    );
};

export default PickingWavesPage;
