import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { bool, func, string } from "prop-types";

export const HeaderWithAction = ({ title, btnLabel, btnSubtitle, btnLoading, btnDisabled, onClick }) => (
    <Row justify="space-between">
        <Col span={12}>
            <Typography.Title level={4}>{title}</Typography.Title>
        </Col>
        <Col className="text-align-right">
            <Row>
                <Col>
                    <Button type="primary" onClick={onClick} loading={btnLoading} disabled={btnDisabled}>{btnLabel}</Button>
                </Col>
            </Row>
            <Row >
                <Col>
                    <Typography.Text type="secondary">{btnSubtitle}</Typography.Text>
                </Col>
            </Row>
        </Col>
    </Row>
);

HeaderWithAction.propTypes = {
    title: string.isRequired,
    btnLabel: string.isRequired,
    btnSubtitle: string,
    btnLoading: bool,
    btnDisabled: bool,
    onClick: func.isRequired,
};

export default HeaderWithAction;
