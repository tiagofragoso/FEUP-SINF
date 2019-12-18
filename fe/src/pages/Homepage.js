import React from "react";
import logo from "../assets/logo.png";
import { Row, Col } from "antd";

const Homepage = () => (
    <Row
        style={{ marginTop: "5em" }}
        justify="center"
        type="flex"
    >
        <Col md={12} lg={10} xl={6}>
            <Row>
                <img alt="logo" src={logo} height="255px" />
            </Row>
            <Row>
                <div style={{ fontSize: "1.4em", paddingTop: "2.5em" }}>
                    <p>
                        SINFony is a logistics management company that specializes in musical instruments. It ensures top quality storage conditions for all of its items and very fast shipping of every order.
                    </p>
                    <p >
                        Come and join us in giving the world some music!
                    </p>
                </div>
            </Row>
        </Col>
    </Row>
);

export default Homepage;
