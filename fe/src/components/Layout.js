import React from "react";
import { any, string } from "prop-types";

import Navbar from "./Navbar";

const Layout = ({ children, ...props }) => (
    <>
        <Navbar currentPath={props["*"]} />
        <div className="main">
            { children }
        </div>
    </>
)
    ;

Layout.propTypes = {
    children: any.isRequired,
    "*": string.isRequired,
};

export default Layout;
