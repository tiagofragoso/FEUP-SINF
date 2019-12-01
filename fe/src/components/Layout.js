import React from "react";
import { any } from "prop-types";

import Navbar from "./Navbar";

const Layout = ({ children }) => (
    <>
        <Navbar />
        <div className="main">
            { children }
        </div>
    </>
);

Layout.propTypes = {
    children: any.isRequired,
};

export default Layout;
