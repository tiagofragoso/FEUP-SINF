import React, { useState } from "react";
import { Modal, Button, Typography } from "antd";
import WarehousePlant from "./WarehousePlant";
import { bool, array } from "prop-types";

const WarehousePlantModal = ({ path, loading }) => {
    const [isVisible, setVisible] = useState(false);

    return (
        <>
            <Button type="primary" loading={loading} onClick={() => setVisible(true)}>
                {path ? "Show Wave Path" : "Show Warehouse Plant"}
            </Button>
            <Modal
                title={
                    <Typography.Title level={2}>
                        {path ? "Wave Path" : "Warehouse Plant"}
                    </Typography.Title>
                }
                visible={isVisible}
                onCancel={() => setVisible(false)}
                width={980}
                footer={[
                    <Button key="back" type="primary" onClick={() => setVisible(false)}>
                        Close
                    </Button>,
                ]}
            >
                <WarehousePlant path={path}/>
            </Modal>
        </>
    );
};

WarehousePlantModal.propTypes = {
    path: array,
    loading: bool.isRequired,
};

WarehousePlantModal.defaultProps = {
    loading: false,
};

export default WarehousePlantModal;
