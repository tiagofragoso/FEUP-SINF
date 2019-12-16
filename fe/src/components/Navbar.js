import React from "react";
import { Link } from "@reach/router";
import { Menu, Icon } from "antd";
import { string } from "prop-types";

import logo from "../assets/logo.png";
import UserArea from "./UserArea";

const Navbar = ({ currentPath }) => {
    const [, basePath] = currentPath.match(/^([^/]*)\/?.*$/);

    return (
        <Menu
            mode="horizontal"
            selectedKeys={basePath}
        >
            <Menu.Item key="logo">
                <Link
                    to="/"
                >
                    <img alt="logo" src={logo} height="30px" />
                </Link>
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
            <Menu.Item key="warehouse-zones">
                <Link
                    to="/warehouse-zones"
                >
                    <Icon type="appstore" />
                    Warehouse Zones
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
            <Menu.Item>
                <UserArea />
            </Menu.Item>
        </Menu>
    );
};

Navbar.propTypes = {
    currentPath: string.isRequired,
};


export default Navbar;
