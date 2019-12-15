import React, { useState, useCallback, useRef, forwardRef, useImperativeHandle, useMemo } from "react";
import { Typography, Row, Col, Table, Spin, Alert, Modal, Form, InputNumber, Select } from "antd";
import PropTypes from "prop-types";

import PageLayout from "../components/PageLayout";
import HeaderWithAction from "../components/HeaderWithAction";
import useMoveItemsBetweenWarehouses from "../hooks/useMoveItemsBetweenWarehouses";
import useWarehouseItems from "../hooks/useWarehouseItems";
import useWarehouses from "../hooks/useWarehouses";

const WarehousePage = ({ warehouse_key }) => {
    const {
        warehouse: {
            data: warehouse_data,
            loading: warehouse_loading,
        },
        items: {
            data: items_data,
            loading: items_loading,
        },
        error,
    } = useWarehouseItems(warehouse_key);

    const [warehouses] = useWarehouses();
    const selectableWarehouses = useMemo(
        () => warehouses && warehouses.filter((warehouse) => warehouse.warehouseKey !== warehouse_key),
        [warehouse_key, warehouses]
    );

    const [moveItemsLoading, moveItemsError, moveItems] = useMoveItemsBetweenWarehouses();

    const [selectedItems, selectItem] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    // Necessary because the table selections only return the row keys (item ids)
    const [modalItems, setModalItems] = useState([]);
    const openModal = useCallback(
        () => {
            setModalOpen(true);
            // For each selected id, fetch the associated item
            setModalItems(selectedItems.map((item_id) => items_data.find((item) => item.itemKey === item_id)));
        },
        [items_data, selectedItems],
    );

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

    const formItems = (getFieldDecorator) => (
        <>
            {modalItems.map((item) => (
                <Form.Item required key={item.itemKey} label={item.itemKey} labelCol={{ span: 12 }} labelAlign="left">
                    {getFieldDecorator(item.itemKey, {
                        // initialValue: 1,
                    })(<InputNumber required min={1} max={item.quantity} />)}
                </Form.Item>
            ))}
            <Form.Item required label={"Target Warehouse"} labelCol={{ span: 12 }} labelAlign="left">
                {getFieldDecorator("targetWarehouse", {
                    initialValue: undefined,
                })(
                    <Select
                        showSearch
                        placeholder="Select target warehouse"
                        optionFilterProp="children"
                    >
                        {selectableWarehouses.map((warehouse) => (
                            <Select.Option
                                key={warehouse.warehouseKey}
                                value={warehouse.warehouseKey}
                            >
                                {warehouse.description}
                            </Select.Option>
                        ))}
                    </Select>)}
            </Form.Item>
        </>
    );

    const handleSubmit = useCallback(
        () => {
            const { current: { form } } = formRef;
            const { targetWarehouse, ...rawItems } = form.getFieldsValue();

            if (!rawItems || !targetWarehouse) {
                return;
            }

            // Since rawItems are {id: quantity} and we need to convert them into {id: id, quantity: quantity}
            const items = Object.entries(rawItems).map(([id, quantity]) => ({ id, quantity }));

            moveItems(warehouse_key, targetWarehouse, items);
            // Clearing the item selections
            selectItem([]);
            setModalOpen(false);
        },
        [moveItems, warehouse_key],
    );

    return (
        <PageLayout title="Warehouse">
            {error && <Alert message={(error && error.message) || "Error loading warehouse items!"} type="error" />}
            {moveItemsError && moveItemsError.map((err) => (
                <Alert
                    key={err.message + err.memberNames.join("")}
                    message={`Error in ${err.memberNames.join(", ")}: ${err.message}`}
                    type="error"
                />
            ))}
            <Spin spinning={warehouse_loading} size="large" tip="Loading Warehouse Details...">
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        {warehouse_data &&
                        <Typography.Text
                            copyable={warehouse_data.id}
                            strong
                        >
                            {warehouse_data.id}
                        </Typography.Text>}
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        <Typography.Text>{warehouse_key}</Typography.Text>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        {warehouse_data && <Typography.Text>{warehouse_data.description}</Typography.Text>}
                    </Col>
                </Row>

                <br/>

                <Spin spinning={items_loading} size="large" tip="Loading Warehouse Items...">
                    <HeaderWithAction
                        title="Warehouse Items"
                        btnLabel="Move Items"
                        btnSubtitle={selectedItems.length > 0 ? `${selectedItems.length} lines selected` : ""}
                        btnDisabled={selectedItems.length === 0}
                        btnLoading={moveItemsLoading}
                        onClick={openModal}
                    />
                    <Table
                        dataSource={items_data} columns={[
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
                        rowSelection={{ selectedRowKeys: selectedItems, onChange: selectItem }}
                    />
                    <Modal
                        centered
                        title="Move Items to Warehouse"
                        visible={isModalOpen}
                        onOk={handleSubmit}
                        onCancel={() => setModalOpen(false)}
                        okText="Submit"
                    >
                        <WrappedForm
                            wrappedComponentRef={formRef}
                        />
                    </Modal>
                </Spin>
            </Spin>
        </PageLayout>
    );
};

WarehousePage.propTypes = {
    warehouse_key: PropTypes.string.isRequired,
};

export default WarehousePage;
