
import React, { useEffect } from "react";
import { Table, Spin, Alert, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@reach/router";

import { getPickingWaves } from "../actions/pickingWavesService";
import PageLayout from "../components/PageLayout";
import { formatDate } from "../utils/formatDate";

const { TabPane } = Tabs;

const nameWithIdLink = (name, { id }) => <Link to={id.toString()}>{name}</Link>;

const pwaveProgress = (progress) => progress ? `${progress}` : "-";

const table_columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: nameWithIdLink,
    },
    {
        title: "Due Date",
        dataIndex: "due_date",
        key: "due_date",
        render: formatDate,
    },
    {
        title: "Progress",
        dataIndex: "progress",
        key: "progress",
        render: pwaveProgress,
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
                {(pickingWaves && pickingWaves.active && pickingWaves.active.length === 0 &&
                    pickingWaves.finished && pickingWaves.finished.length === 0) ?
                    "There are no existent picking waves at the moment" :
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
                }
            </Spin>
        </PageLayout>
    );
};

export default PickingWavesPage;
