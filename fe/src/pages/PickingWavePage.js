
import React, { useEffect } from "react";
import { Table, Spin, Alert, Typography, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@reach/router";

import { getPickingWave, pickItemFromPickingWave, finishCurrentPickingWave } from "../actions/pickingWavesService";
import PageLayout from "../components/PageLayout";
import WarehousePlantModal from "../components/WarehousePlantModal";
import useItemWarehousesPath from "../hooks/useItemWarehousesPath";
import useMoveItemsBetweenWarehouses from "../hooks/useMoveItemsBetweenWarehouses";
import { formatDate } from "../utils/formatDate";

const salesOrderWithLink = (sales_order_id) => (
    <Link to={`/sales/${sales_order_id}`}>{sales_order_id}</Link>
);

const warehouseZoneWithLink = (warehouse_zone_key) => (
    <Link to={`/warehouse-zones/${warehouse_zone_key}`}>{warehouse_zone_key}</Link>
);

const PickingWavePage = ({ id }) => {
    const dispatch = useDispatch();
    const {
        picked_items, not_picked_items, loading, error, info, pickItemStatus, finishPickingWaveStatus,
    } = useSelector((state) => state.currentPickingWave);

    useEffect(() => {
        dispatch(getPickingWave(id));
    }, [dispatch, id]);

    const [,, moveItems] = useMoveItemsBetweenWarehouses();

    const {
        loading: pathLoading,
        path,
        zones,
    } = useItemWarehousesPath(not_picked_items);

    const {
        loading: pickedItemsZonesLoading,
        zones: pickedItemsZones,
    } = useItemWarehousesPath(picked_items, false);

    const pickItemButton = (_, item) => (
        <Button disabled={!zones || !zones[item.item_key]} onClick={() => dispatch(pickItemFromPickingWave(item.picking_wave_id, item.id))}>
            Pick
        </Button>
    );

    const finishPickingWave = async () => {
        const items_to_move_by_zone = {};

        for (const { item_key, quantity } of picked_items) {
            const warehouse_zone = pickedItemsZones[item_key];

            if (!warehouse_zone) {
                continue;
            }

            if (!items_to_move_by_zone[warehouse_zone]) {
                items_to_move_by_zone[warehouse_zone] = [];
            }

            items_to_move_by_zone[warehouse_zone].push({
                id: item_key,
                quantity,
            });
        }

        await Promise.all(Object.entries(items_to_move_by_zone).map(([warehouse_zone, items]) => (
            moveItems(warehouse_zone, "EXIT", items)
        )));
        dispatch(finishCurrentPickingWave(id));
    };

    const isFinishingPWaveAllowed = () => {
        if (!not_picked_items || !pickedItemsZones) {
            return false;
        }

        return (not_picked_items.length === 0) && (!Object.values(pickedItemsZones).includes(null));
    };

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
            title: "Warehouse",
            dataIndex: "item_key",
            key: "warehouse",
            render: (item_key) => zones && ((zones[item_key] && warehouseZoneWithLink(zones[item_key])) || "N/A"),
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
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

    const finished_table_columns = [...not_picked_items_table_columns.slice(0, 2), ...not_picked_items_table_columns.slice(3, 5)];

    const picked_items_table_columns = not_picked_items_table_columns.slice(0, 5);
    picked_items_table_columns[2] = {
        title: "Warehouse",
        dataIndex: "item_key",
        key: "warehouse",
        render: (item_key) => pickedItemsZones && ((pickedItemsZones[item_key] && warehouseZoneWithLink(pickedItemsZones[item_key])) || "N/A"),
    };

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
                    <WarehousePlantModal path={path} loading={pathLoading} />
                    <Button
                        type="primary"
                        loading={loading || pickedItemsZonesLoading}
                        disabled={!isFinishingPWaveAllowed()}
                        onClick={finishPickingWave}
                        style={{ marginLeft: "1em", marginRight: "1em" }}
                    >
                        Finish Picking Wave
                    </Button>
                    {info.progress &&
                        <span style={{ fontSize: "1.15em" }}>
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


            {info &&
                <div style={{ marginBottom: "1.5em", fontSize: "1.15em" }}>
                    <strong>Due Date:</strong> {formatDate(info.due_date)}
                </div>
            }

            {not_picked_items && not_picked_items.length > 0 &&
                <>
                    <Typography.Title level={4}>{"Items to Pick"}</Typography.Title>
                    <Spin spinning={loading} size="large" tip="Loading Items to Pick...">
                        <Table dataSource={not_picked_items} columns={not_picked_items_table_columns} rowKey="id" />
                    </Spin>
                </>
            }

            {picked_items && picked_items.length > 0 &&
                <>
                    <Typography.Title level={4}>{"Picked Items"}</Typography.Title>
                    <Spin spinning={loading} size="large" tip="Loading picked Items...">
                        <Table dataSource={picked_items} columns={(info && !info.is_done) ? picked_items_table_columns : finished_table_columns} rowKey="item_key" />
                    </Spin>
                </>
            }
        </PageLayout>
    );
};

export default PickingWavePage;
