import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from "react";
import { Typography, Row, Col, Table, Spin, Alert, Modal, Form, InputNumber, Select, Button, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import HeaderWithAction from "../components/HeaderWithAction";
import PageLayout from "../components/PageLayout";
import { getSalesOrder } from "../actions/salesService";

const SalesOrderPage = ({ order_id }) => {
    const dispatch = useDispatch();
    const {
        order, items, loading, error,
    } = useSelector((state) => state.currentSalesOrder);
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
                <Form.Item key="pickingWave">
                    <Row type="flex" justify="space-between">
                        <Col span={10}>
                            {form.getFieldDecorator("pickingWave", {})(
                                <Select placeholder="Select picking wave">
                                    <Select.Option value="1">Picking wave 1</Select.Option>
                                    <Select.Option value="2">Picking wave 2</Select.Option>
                                    <Select.Option value="3">Picking wave 3</Select.Option>
                                </Select>)}
                        </Col>
                        <Col span={2} className="text-align-center">
                            <Typography.Text type="secondary" ><i>or</i></Typography.Text>
                        </Col>
                        <Col span={10} className="text-align-right">
                            <Button type="primary">Create new picking wave</Button>
                        </Col>
                    </Row>

                </Form.Item>
                <Divider />
                { formItems(form.getFieldDecorator) }
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
        // dispatch(createGoodsReceipt(order, form.getFieldsValue()));
        setVisibleModal(false);
    };

    const addToPickingWave = () => {
        setVisibleModal(true);
        setSelectedItemsQuantities(selectedItems.map((key) => ({
            item: key,
            quantity: items.not_shipped.find((e) => e.salesItem === key).quantity,
        })));
    };

    // const hasSelectedPickingWave = () => {
    //     if (formRef.current) {
    //         const { current: { form } } = formRef;
    //         console.log(form.getFieldValue("pickingWave"));
    //         return !!form.getFieldValue("pickingWave");
    //     } else {
    //         return false;
    //     }
    // };

    // useEffect with empty dependencies array functions simillarly to componentDidMount
    useEffect(() => {
        // Can't request info from api before the login is ready
        if (!access_token) {
            return;
        }

        dispatch(getSalesOrder(order_id));
    }, [access_token, dispatch, order_id]);

    return (
        <PageLayout title="Sales Order">
            {error && <Alert message={(error && error.message) || "Error!"} type="error" />}
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
                    <HeaderWithAction
                        title={`Not Received (${items.not_shipped.length})`}
                        btnLabel="Add to picking wave"
                        btnSubtitle={selectedItems.length > 0 ? `${selectedItems.length} lines selected` : ""}
                        btnDisabled={selectedItems.length === 0}
                        btnLoading={false}
                        onClick={addToPickingWave}
                    />
                    <br />
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
                        ]} rowKey="salesItem"
                        rowSelection={{ selectedItems, onChange: selectItem }}
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
                        ]} rowKey="salesItem"
                    />
                    <Modal
                        centered
                        title="Add to picking wave"
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

SalesOrderPage.propTypes = {
    order_id: PropTypes.string.isRequired,
};

export default SalesOrderPage;
