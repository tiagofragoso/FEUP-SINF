import React, { useEffect } from "react";
import { Typography, Row, Col, Table, Spin, Alert, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { getSalesOrder } from "../actions/salesService";

const SalesOrderPage = ({ order_id }) => {
    const dispatch = useDispatch();
    const {
        order, items, loading, error,
    } = useSelector((state) => state.currentSalesOrder);
    const {
        access_token,
    } = useSelector((state) => state.login);

    // If the sales order was not yet loaded or is not the correct one, load it
    useEffect(() => {
        // Can't request info from api before the login is ready
        if (!access_token) {
            return;
        }

        if (loading || error) {
            return;
        }

        if (order && order.id === order_id) {
            return;
        }

        dispatch(getSalesOrder(order_id));
    }, [access_token, dispatch, error, loading, order, order_id]);


    return (
        <>
            {error && <Alert message="Error!" type="error" />}
            <Spin spinning={!access_token || loading} size="large" tip="Loading Sales Order...">
                <Typography.Title>Order details</Typography.Title>
                <Row>
                    <Col span={12}>
                        <Typography.Title level={4}>{order_id}</Typography.Title>
                    </Col>
                    <Col span={12}>
                        {order && <Typography.Text>{order.documentDate}</Typography.Text>}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        {order && <Typography.Text>{order.buyerCustomerParty}</Typography.Text>}
                    </Col>
                    <Col span={12}>
                        {order && <Typography.Text>{order.buyerCustomerPartyName}</Typography.Text>}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        {order && <Typography.Text>{order.unloadingPoint}</Typography.Text>}
                    </Col>
                    <Col span={12}>
                        {order && <Typography.Text>{order.unloadingPointAddress}</Typography.Text>}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        {order && <Typography.Text>{order.emailTo}</Typography.Text>}
                    </Col>
                    <Col span={12}>
                        {order && <Typography.Text>{order.unloadingPostalZone}</Typography.Text>}
                    </Col>
                </Row>

                {items &&
                <>
                    <Typography.Title level={4}>Picked (x)</Typography.Title>
                    <Table
                        dataSource={items.picked} columns={[
                            {
                                title: "",
                                dataIndex: "image_stuff",
                                key: "image_stuff",
                                // render: img,
                            },
                            {
                                title: "Item",
                                dataIndex: "salesItem",
                                key: "salesItem",
                            },
                            {
                                title: "Quantity",
                                dataIndex: "quantity",
                                key: "quantity",
                            },
                            {
                                title: "Total",
                                dataIndex: "lineExtensionAmount.amount",
                                key: "lineExtensionAmount.amount",
                            },
                        ]} rowKey="salesItem"
                    />
                    <Typography.Title level={4}>Awaiting picking (x)</Typography.Title>
                    <Typography.Title level={4}>Awaiting restocking (x)</Typography.Title>
                    <Typography.Title level={4}>Shipped (x)</Typography.Title>
                </>
                }

            </Spin>
        </>
    );
};

export default SalesOrderPage;
