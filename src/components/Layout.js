import React from "react";

import { PageHeader } from "antd";

import Navbar from "./Navbar";

const Layout = ({ children }) => (
    <Navbar />
    <div className="main">
        <PageHeader title={title} />
        { children }
    </div>
);

export default Layout;
