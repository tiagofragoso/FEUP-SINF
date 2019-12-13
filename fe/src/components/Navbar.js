import React from "react";
import { Link } from "@reach/router";
import { Menu, Icon } from "antd";
import { string } from "prop-types";

import logo from "../assets/logo.png";

const Navbar = ({ currentPath }) => {
    const [, basePath] = currentPath.match(/^([^/]*)\/?.*$/);

    return (
        <Menu
            mode="horizontal"
            selectedKeys={basePath}
        >
            <Menu.Item key="logo">
                <img alt="logo" src={logo} height="30px" />
            </Menu.Item>
            <Menu.Item key="sales">
                <Link
                    to="/sales"
                >
                    <Icon type="red-envelope" />
                    Sales
                </Link>
            </Menu.Item>
            <Menu.Item key="purchases">
                <Link
                    to="/purchases"
                >
                    <Icon type="container" />
                    Purchases
                </Link>
            </Menu.Item>
            <Menu.Item key="warehouses">
                <Link
                    to="/warehouses"
                >
                    <Icon type="appstore" />
                    Warehouses
                </Link>
            </Menu.Item>
            <Menu.Item key="picking-waves">
                <Link
                    to="/picking-waves"
                >
                    <Icon type="solution" />
                    Picking waves
                </Link>
            </Menu.Item>
        </Menu>
    );
};

Navbar.propTypes = {
    currentPath: string.isRequired,
};


export default Navbar;
