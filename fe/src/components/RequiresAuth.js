import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "@reach/router";
import { element } from "prop-types";

import { LOCALSTORAGE_KEY } from "../reducers/localUserReducer";

const RequiresAuth = ({ as: Component, ...props }) => {
    const {
        user,
    } = useSelector((state) => state.localUser);

    if (!user && !localStorage.getItem(LOCALSTORAGE_KEY)) {
        // navigate("/sign-in");
        return <Redirect to="/sign-in" noThrow />;
    }

    return (
        <Component {...props} />
    );
};

RequiresAuth.propTypes = {
    as: element.isRequired,
};

export default RequiresAuth;
