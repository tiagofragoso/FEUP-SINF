import React, { useState } from "react";
import { Link } from "@reach/router";
import { Menu, Icon } from "antd";
import logo from "../assets/logo.png";

const Navbar = () => {
    const [selectedKey, selectKey] = useState(["sales"]);

    const SelectableLink = ({ to, key, children }) => (
        <Link
            to={to}
            getProps={({ isCurrent }) => isCurrent && selectKey([key])}
        >
            {children}
        </Link>);

    return (
        <Menu
            mode="horizontal"
            selectedKeys={selectedKey}
        >

            <Menu.Item key="logo">
                <img src={logo} height="30px" />
            </Menu.Item>
            <Menu.Item key="sales">
                <SelectableLink
                    to="/sales"
                    key="sales"
                >
                    <Icon type="red-envelope" />
                    Sales
                </SelectableLink>
            </Menu.Item>
            <Menu.Item key="purchases">
                <Link
                    to="/purchases"

                >
                    <Icon type="container" />
                Purchases
                </Link>
            </Menu.Item>
            <Menu.Item key="replenishment">
                <Icon type="appstore" />
                Replenishment
            </Menu.Item>
            <Menu.Item key="picking">
                <Icon type="solution" />
                Picking waves
            </Menu.Item>
        </Menu>
    );
};

export default Navbar;
