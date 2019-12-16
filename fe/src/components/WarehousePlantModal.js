import React, { useState } from "react";
import { Modal, Button, Typography } from "antd";
import WarehousePlant from "./WarehousePlant";

const WarehousePlantModal = () => {
    const [isVisible, setVisible] = useState(false);

    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)}>
                    Show Warehouse Plant
            </Button>
            <Modal
                title={<Typography.Title level={2}>Warehouse Plant</Typography.Title>}
                visible={isVisible}
                onCancel={() => setVisible(false)}
                width={980}
                footer={[
                    <Button key="back" type="primary" onClick={() => setVisible(false)}>
                        Close
                    </Button>,
                ]}
            >
                <WarehousePlant />
            </Modal>
        </>
    );
};

export default WarehousePlantModal;
