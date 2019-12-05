import React, { useEffect } from "react";
import { Typography, Row, Col, Table, Spin, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import PageLayout from "../components/PageLayout";
import { getWarehouseDetails } from "../actions/warehousesService";

const WarehousePage = ({ warehouse_id }) => {
    const dispatch = useDispatch();
    const {
        warehouse, warehouse_loading,
        items, items_loading,
        error,
    } = useSelector((state) => state.currentWarehouse);
    const {
        access_token,
    } = useSelector((state) => state.login);

    // useEffect with empty dependencies array functions simillarly to componentDidMount
    useEffect(() => {
        // Can't request info from api before the login is ready
        if (!access_token) {
            return;
        }

        dispatch(getWarehouseDetails(warehouse_id));
    }, [access_token, dispatch, warehouse_id]);

    const order = null;

    return (
        <PageLayout title="Warehouse">
            {error && <Alert message={(error && error.message) || "Error!"} type="error" />}
            <Spin spinning={!access_token || warehouse_loading} size="large" tip="Loading Warehouse Details...">
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        <Typography.Text
                            copyable={warehouse_id}
                            strong
                        >
                            {warehouse_id}
                        </Typography.Text>
                    </Col>
                    <Col>
                        {order && <Typography.Text>{order.documentDate}</Typography.Text>}
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        {warehouse && <Typography.Text>{warehouse.warehouseKey}</Typography.Text>}
                    </Col>
                    <Col>
                        {""}
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        {warehouse && <Typography.Text>{warehouse.description}</Typography.Text>}
                    </Col>
                    <Col>
                        {""}
                    </Col>
                </Row>

                <br/>

                <Spin spinning={!access_token || items_loading} size="large" tip="Loading Warehouse Items...">
                    <Typography.Title level={4}>Warehouse Items</Typography.Title>
                    <Table
                        dataSource={items} columns={[
                            {
                                title: "Item",
                                dataIndex: "itemKey",
                                key: "itemKey",
                            },
                            {
                                title: "Description",
                                dataIndex: "description",
                                key: "description",
                            },
                            {
                                title: "Quantity",
                                dataIndex: "quantity",
                                key: "quantity",
                            },
                        ]} rowKey="itemKey"
                    />
                </Spin>
            </Spin>
        </PageLayout>
    );
};

WarehousePage.propTypes = {
    warehouse_id: PropTypes.string.isRequired,
};

export default WarehousePage;
