import React from "react";
import { any, string } from "prop-types";
import { Typography, Row, Col } from "antd";

export const PageLayout = ({ title, children }) => (
    <Row
        justify="center"
        type="flex"
    >
        <Col span={16}>
            <Row gutter={[0, 8]}>
                <Col span={24}>
                    <Typography.Title level={2}>{title}</Typography.Title>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {children}
                </Col>
            </Row>
        </Col>
    </Row>
);

PageLayout.propTypes = {
    title: string.isRequired,
    children: any.isRequired,
};

export default PageLayout;
