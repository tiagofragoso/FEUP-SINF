import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from "react";
import { Typography, Row, Col, Table, Spin, Alert, Modal, Form, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import PageLayout from "../components/PageLayout";
import { getPurchaseOrder } from "../actions/purchasesService";
import { createGoodsReceipt } from "../actions/goodsReceiptService";
import HeaderWithAction from "../components/HeaderWithAction";
import formatDate from "../utils/formatDate";

const PurchaseOrderPage = ({ order_id }) => {
    const dispatch = useDispatch();
    const {
        order, items, loading, error,
    } = useSelector((state) => state.currentPurchaseOrder);
    const {
        loading: goodsReceiptLoading, error: goodsReceiptError,
    } = useSelector((state) => state.goodsReceipt);
    const {
        access_token,
    } = useSelector((state) => state.login);

    const [selectedItems, selectItem] = useState([]);

    const [visibleModal, setVisibleModal] = useState(false);

    const [selectedItemQuantities, setSelectedItemsQuantities] = useState([]);

    const formRef = useRef(null);

    // eslint-disable-next-line react/display-name
    const formEl = forwardRef(({ form }, ref) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useImperativeHandle(ref, () => ({ form }));
        return (
            <Form>
                {formItems(form.getFieldDecorator)}
            </Form>
        );
    });

    const WrappedForm = Form.create()(formEl);

    const formItems = (getFieldDecorator) => selectedItemQuantities.map((iq) => (
        <Form.Item key={iq.item} label={iq.item} labelCol={{ span: 12 }} labelAlign="left">
            {getFieldDecorator(iq.item, {
                initialValue: iq.quantity,
            })(<InputNumber min={1} max={iq.quantity} />)}
        </Form.Item>
    ));

    const handleSubmit = () => {
        const { current: { form } } = formRef;
        dispatch(createGoodsReceipt(order, form.getFieldsValue()));
        setVisibleModal(false);
    };

    const generateGoodsReceipt = () => {
        setVisibleModal(true);
        setSelectedItemsQuantities(selectedItems.map((key) => ({
            item: key,
            quantity: items.not_received.find((e) => e.purchasesItem === key).quantity,
        })));
    };

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
            {(error || goodsReceiptError) &&
                <Alert
                    message={(error && error.message) || (goodsReceiptError && goodsReceiptError.message) || "Error!"}
                    type="error"
                    showIcon
                />
            }
            <Spin spinning={!access_token || loading} size="large" tip="Loading Sales Order...">
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        { order && (
                            <Typography.Title
                                copyable={order.naturalKey}
                                level={4}
                                strong
                            >
                                {order.naturalKey}
                            </Typography.Title>) }
                    </Col>
                    <Col>
                        {order && <Typography.Text>{formatDate(order.documentDate)}</Typography.Text>}
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" align="middle">
                    <Col span={12}>
                        {order && <Typography.Text>{order.sellerSupplierPartyName}</Typography.Text>}
                    </Col>
                    <Col>
                        {order && <Typography.Text>{order.buyerCustomerPartyName}</Typography.Text>}
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        {order && <Typography.Text>{order.emailTo}</Typography.Text>}
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        {order && <Typography.Text>{order.loadingPointAddress}</Typography.Text>}
                    </Col>
                </Row>

                {items &&
                <>
                    <br/>
                    <HeaderWithAction
                        title={`Not Received (${items.not_received.length})`}
                        btnLabel="Generate Goods Receipt"
                        btnSubtitle={selectedItems.length > 0 ? `${selectedItems.length} lines selected` : ""}
                        btnDisabled={selectedItems.length === 0}
                        btnLoading={goodsReceiptLoading}
                        onClick={generateGoodsReceipt}
                    />
                    <br/>
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
                        ]} rowKey="purchasesItem"
                        rowSelection={{ selectedItems, onChange: selectItem }}
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
                        ]} rowKey="purchasesItem"
                    />
                    <Modal
                        centered
                        title="Generate Goods Receipt"
                        visible={visibleModal}
                        onOk={handleSubmit}
                        onCancel={() => setVisibleModal(false)}
                        okText="Submit"
                    >
                        <WrappedForm
                            wrappedComponentRef={formRef}
                        />
                    </Modal>
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
