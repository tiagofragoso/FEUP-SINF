import React, { useState } from "react";
import { Link } from "@reach/router";
import { Menu, Icon } from "antd";
import { any, string } from "prop-types";

import logo from "../assets/logo.png";

const Navbar = () => {
    const [selectedKey, selectKey] = useState(["sales"]);

    const SelectableLink = ({ to, itemKey, children }) => (
        <Link
            to={to}
            getProps={({ isCurrent }) => {
                if (isCurrent && itemKey !== selectedKey[0]) {
                    selectKey([itemKey]);
                }
            }}
        >
            {children}
        </Link>
    );

    SelectableLink.propTypes = {
        to: string.isRequired,
        itemKey: string.isRequired,
        children: any,
    };

    return (
        <Menu
            mode="horizontal"
            selectedKeys={selectedKey}
        >
            <Menu.Item key="logo">
                <img alt="logo" src={logo} height="30px" />
            </Menu.Item>
            <Menu.Item key="sales">
                <SelectableLink
                    to="/sales"
                    itemKey="sales"
                >
                    <Icon type="red-envelope" />
                    Sales
                </SelectableLink>
            </Menu.Item>
            <Menu.Item key="purchases">
                <SelectableLink
                    to="/purchases"
                    itemKey="purchases"
                >
                    <Icon type="container" />
                    Purchases
                </SelectableLink>
            </Menu.Item>
            <Menu.Item key="Warehouses">
                <SelectableLink
                    to="/warehouses"
                    itemKey="warehouses"
                >
                    <Icon type="appstore" />
                    Warehouses
                </SelectableLink>
            </Menu.Item>
            <Menu.Item key="picking">
                <SelectableLink
                    to="/picking"
                    itemKey="picking"
                >
                    <Icon type="solution" />
                    Picking waves
                </SelectableLink>
            </Menu.Item>
        </Menu>
    );
};


export default Navbar;
