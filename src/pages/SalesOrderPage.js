import React, { useEffect } from "react";
import { Typography, Row, Col, Table, Spin, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

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
            {error && <Alert message={(error && error.message) || "Error!"} type="error" />}
            <Spin spinning={!access_token || loading} size="large" tip="Loading Sales Order...">
                <Typography.Title>Order details</Typography.Title>
                <Row type="flex" justify="space-between">
                    <Col span={8}>
                        <Typography.Title level={4}>{order_id}</Typography.Title>
                    </Col>
                    <Col span={8}>
                        {order && <Typography.Text>{order.documentDate}</Typography.Text>}
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span={8}>
                        {order && <Typography.Text>{order.buyerCustomerParty}</Typography.Text>}
                    </Col>
                    <Col span={8}>
                        {order && <Typography.Text>{order.buyerCustomerPartyName}</Typography.Text>}
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span={8}>
                        {order && <Typography.Text>{order.unloadingPoint}</Typography.Text>}
                    </Col>
                    <Col span={8}>
                        {order && <Typography.Text>{order.unloadingPointAddress}</Typography.Text>}
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span={8}>
                        {order && <Typography.Text>{order.emailTo}</Typography.Text>}
                    </Col>
                    <Col span={8}>
                        {order && <Typography.Text>{order.unloadingPostalZone}</Typography.Text>}
                    </Col>
                </Row>

                {items &&
                <>
                    <br/>
                    <Typography.Title level={4}>Not Shipped ({items.not_shipped.length})</Typography.Title>
                    <Table
                        dataSource={items.not_shipped} columns={[
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
                                title: "Description",
                                dataIndex: "description",
                                key: "description",
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

                    <br/>
                    <Typography.Title level={4}>Shipped ({items.shipped.length})</Typography.Title>
                    <Table
                        dataSource={items.shipped} columns={[
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
                                title: "Description",
                                dataIndex: "description",
                                key: "description",
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
                </>
                }

            </Spin>
        </>
    );
};

SalesOrderPage.propTypes = {
    order_id: PropTypes.string.isRequired,
};

export default SalesOrderPage;
