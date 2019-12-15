
import React, { useEffect } from "react";
import { Table, Spin, Alert, Typography, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@reach/router";

import { getPickingWave, pickItemFromPickingWave, finishCurrentPickingWave } from "../actions/pickingWavesService";
import PageLayout from "../components/PageLayout";

const salesOrderWithLink = (sales_order_id) => (
    <Link to={`/sales/${sales_order_id}`}>{sales_order_id}</Link>
);

const PickingWavePage = ({ id }) => {
    const dispatch = useDispatch();
    const {
        picked_items, not_picked_items, loading, error, info, pickItemStatus, finishPickingWaveStatus
    } = useSelector((state) => state.currentPickingWave);

    useEffect(() => {
        dispatch(getPickingWave(id));
    }, [dispatch, id]);
    
    const pickItemButton = (_, item) => (
        <Button onClick={() => dispatch(pickItemFromPickingWave(item.picking_wave, item.item_key))}>
            Pick
        </Button>
    );

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
            render: pickItemButton,
        },
    ];
    
    const picked_items_table_columns = not_picked_items_table_columns.slice(0, 3);
    
    return (
        <PageLayout title={`Picking Wave ${id} ${info ? `- ${info.name}` : ""}`}>
            {finishPickingWaveStatus && 
                <>
                    <Alert message={(finishPickingWaveStatus && finishPickingWaveStatus.message)} type={finishPickingWaveStatus.status} />
                    <br/>
                </>
            }
            
            {info && !info.is_done &&
                <>
                    <Button 
                        type="primary" 
                        loading={loading} 
                        disabled={not_picked_items ? not_picked_items.length > 0 : true}
                        onClick={() => dispatch(finishCurrentPickingWave(id))}
                        
                    >
                        Finish Picking Wave
                    </Button>
                    {info.progress && 
                        <span style={{marginLeft: "1em", fontSize: "1.2em"}}>
                            {`Progress ${info.progress}`}
                        </span>
                    }
                    <br/><br/>
                </>
            }

            {error && <Alert message={(error && error.message) || "Error!"} type="error" />}
            {pickItemStatus && 
                <>
                    <Alert message={(pickItemStatus && pickItemStatus.message)} type={pickItemStatus.status} />
                    <br/>
                </>
            }
            {not_picked_items && not_picked_items.length > 0 &&
                <>
                    <Typography.Title level={4}>{"Items to Pick"}</Typography.Title>
                    <Spin spinning={loading} size="large" tip="Loading Items to Pick...">
                        <Table dataSource={not_picked_items} columns={not_picked_items_table_columns} rowKey="item_key" />
                    </Spin>
                </>
            }
            
            {picked_items && picked_items.length > 0 &&
                <>
                    <Typography.Title level={4}>{"Picked Items"}</Typography.Title>
                    <Spin spinning={loading} size="large" tip="Loading picked Items...">
                        <Table dataSource={picked_items} columns={picked_items_table_columns} rowKey="item_key" />
                    </Spin>
                </>
            }
        </PageLayout>
    );
};

export default PickingWavePage;
