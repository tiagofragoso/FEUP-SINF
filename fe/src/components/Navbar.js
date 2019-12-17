import React from "react";
import { Link } from "@reach/router";
import { Menu, Icon, Avatar } from "antd";
import { string } from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import logo from "../assets/logo.png";
import { clearLocalUser } from "../actions/localUserService";

const Navbar = ({ currentPath }) => {
    const [, basePath] = currentPath.match(/^([^/]*)\/?.*$/);
    const dispatch = useDispatch();
    const {
        user,
    } = useSelector((state) => state.localUser);

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
            <Menu.SubMenu
                style={{ float: "right" }}
                key="user-area"
                title={
                    <>
                        {user ?
                            <span>
                                {user.name}
                                <Avatar style={{ marginLeft: "1em" }}>
                                    {getNameInitials(user.name)}
                                </Avatar>
                            </span>
                            :
                            <Link to="/sign-in">
                                Sign In
                            </Link>
                        }
                    </>
                }
            >
                {user &&
                    <Menu.Item key="logout" onClick={() => dispatch(clearLocalUser())}>
                        Logout
                    </Menu.Item>}
            </Menu.SubMenu>
        </Menu>
    );
};

// See https://stackoverflow.com/a/33076482/5437511
const getNameInitials = (name) => {
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
};

Navbar.propTypes = {
    currentPath: string.isRequired,
};


export default Navbar;
