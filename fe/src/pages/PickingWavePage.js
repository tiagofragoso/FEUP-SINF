
import React, { useEffect } from "react";
import { Table, Spin, Alert, Typography, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@reach/router";

import { getPickingWave, pickItemFromPickingWave } from "../actions/pickingWavesService";
import PageLayout from "../components/PageLayout";

const salesOrderWithLink = (sales_order_id) => (
    <Link to={`/sales/${sales_order_id}`}>{sales_order_id}</Link>
);

const PickingWavePage = ({ id }) => {
    const dispatch = useDispatch();
    const {
        picked_items, not_picked_items, loading, error, pickItemStatus,
    } = useSelector((state) => state.currentPickingWave);

    useEffect(() => {
        dispatch(getPickingWave(id));
    }, [dispatch, id]);

    const not_picked_items_table_columns = [
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
        {
            title: "",
            dataIndex: "is_picked",
            key: "is_picked",
            render: () => pickItemElement(id),
        },
    ];
    
    const picked_items_table_columns = not_picked_items_table_columns.slice(0, 3); 

    const pickItem = ({ target }, picking_wave_id) => {
        const item_id = target.parentElement.parentElement.children[0].textContent;
    
        dispatch(pickItemFromPickingWave(picking_wave_id, item_id));
    }
    
    const pickItemElement = (picking_wave_id) => (
        <Button onClick={(event) => pickItem(event, picking_wave_id)}>
            Pick
        </Button>
    );

    return (
        <PageLayout title={`Picking Wave ${id}`}>
            {error && <Alert message={(error && error.message) || "Error!"} type="error" />}
            {pickItemStatus && 
                <div>
                    <Alert message={(pickItemStatus && pickItemStatus.message)} type={pickItemStatus.status} />
                    <br/>
                </div>
            }
            <Typography.Title level={4}>{"Items to Pick"}</Typography.Title>
            <Spin spinning={loading} size="large" tip="Loading Picking Wave...">
                <Table dataSource={not_picked_items} columns={not_picked_items_table_columns} rowKey="item_key" />
            </Spin>
            <br/>
            <Typography.Title level={4}>{"Picked Items"}</Typography.Title>
            <Spin spinning={loading} size="large" tip="Loading Picking Wave...">
                <Table dataSource={picked_items} columns={picked_items_table_columns} rowKey="item_key" />
            </Spin>
        </PageLayout>
    );
};

export default PickingWavePage;
