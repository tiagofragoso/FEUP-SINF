import React, { useEffect } from "react";
import { Typography, Row, Col, Table, Spin, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import PageLayout from "../components/PageLayout";
import { getPurchaseOrder } from "../actions/purchasesService";

const PurchaseOrderPage = ({ order_id }) => {
    const dispatch = useDispatch();
    const {
        order, items, loading, error,
    } = useSelector((state) => state.currentPurchaseOrder);
    const {
        access_token,
    } = useSelector((state) => state.login);

    // useEffect with empty dependencies array functions simillarly to componentDidMount
    useEffect(() => {
        // Can't request info from api before the login is ready
        if (!access_token) {
            return;
        }

        dispatch(getPurchaseOrder(order_id));
    }, [access_token, dispatch, order_id]);

    return (
        <PageLayout title="Purchase Order">
            {error && <Alert message={(error && error.message) || "Error!"} type="error" />}
            <Spin spinning={!access_token || loading} size="large" tip="Loading Sales Order...">
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        <Typography.Text
                            copyable={order_id}
                            strong
                        >
                            {order_id}
                        </Typography.Text>
                    </Col>
                    <Col>
                        {order && <Typography.Text>{order.documentDate}</Typography.Text>}
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        {order && <Typography.Text>{order.buyerCustomerParty}</Typography.Text>}
                    </Col>
                    <Col>
                        {order && <Typography.Text>{order.buyerCustomerPartyName}</Typography.Text>}
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        {order && <Typography.Text>{order.unloadingPoint}</Typography.Text>}
                    </Col>
                    <Col>
                        {order && <Typography.Text>{order.unloadingPointAddress}</Typography.Text>}
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        {order && <Typography.Text>{order.emailTo}</Typography.Text>}
                    </Col>
                    <Col>
                        {order && <Typography.Text>{order.unloadingPostalZone}</Typography.Text>}
                    </Col>
                </Row>

                {items &&
                <>
                    <br/>
                    <Typography.Title level={4}>Not Received ({items.not_received.length})</Typography.Title>
                    <Table
                        dataSource={items.not_received} columns={[
                            {
                                title: "",
                                dataIndex: "image_stuff",
                                key: "image_stuff",
                                // render: img,
                            },
                            {
                                title: "Item",
                                dataIndex: "purchasesItem",
                                key: "purchasesItem",
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
                        ]} rowKey="purchasesItem"
                    />

                    <br/>
                    <Typography.Title level={4}>Received ({items.received.length})</Typography.Title>
                    <Table
                        dataSource={items.received} columns={[
                            {
                                title: "",
                                dataIndex: "image_stuff",
                                key: "image_stuff",
                                // render: img,
                            },
                            {
                                title: "Item",
                                dataIndex: "purchasesItem",
                                key: "purchasesItem",
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
                        ]} rowKey="purchasesItem"
                    />
                </>
                }

            </Spin>
        </PageLayout>
    );
};

PurchaseOrderPage.propTypes = {
    order_id: PropTypes.string.isRequired,
};

export default PurchaseOrderPage;
